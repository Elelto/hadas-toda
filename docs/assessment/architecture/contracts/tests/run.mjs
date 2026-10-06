#!/usr/bin/env node
// Contract tests (ARCHITECTURE §16, round 5). Owner: role 6. Run from anywhere:
//   node docs/assessment/architecture/contracts/tests/run.mjs            # all
//   node docs/assessment/architecture/contracts/tests/run.mjs --verbose  # list every case
//
// 1. Compiles all 17 schemas in ONE Ajv 2020 registry, strict: true (every strict rule is an error; the
//    logger also fails the run on any warning).
// 2. Runs every case in cases/*.cases.json. A case is a base document (or a real content file) plus an
//    optional JSON-Patch (add / replace / remove). 'valid' cases must pass. 'invalid' cases must fail,
//    their base must pass on its own (so the patch is the only cause), and at least one Ajv error must
//    contain the case's 'error' string in its schemaPath, instancePath, keyword or "instancePath/keyword" (so a case cannot
//    "pass" by failing for an unrelated reason).
// 3. Runs the regex-safety suite (regex_safety.mjs): the lint's own self-test, the lint over every
//    red-flag pattern in the fixtures and every rule in content/output-rules.json, and adversarial
//    32KB timing under the linear engine with the per-pattern and total budgets of ARCHITECTURE §1.5.
//    Round 6: the masking set (MASK_REFERENCE until intake/engine/normalize exists) in linear mode, engine
//    agreement on every match, find-all timing on identifier-shaped 32KB inputs, and a timing-net
//    self-test with the security round-3 probe (passes the lint; must be caught by the budget).
// Exit code 0 only if everything passes. Dependencies: ajv 8 and re2js, resolved from the repo's
// node_modules (both are transitive today; role 7 adds them as direct devDependencies, §19).

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import { runRegexSuite } from './regex_safety.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTRACTS = resolve(HERE, '..');
const CASES = join(HERE, 'cases');
const VERBOSE = process.argv.includes('--verbose');

const failures = [];
const fail = (msg) => failures.push(msg);

// ---------- 1. compile ----------
const warnings = [];
const ajv = new Ajv2020({
  strict: true,
  allErrors: true,
  logger: { log: () => {}, warn: (...m) => warnings.push(m.join(' ')), error: (...m) => warnings.push(m.join(' ')) },
});
// Same formats as content/build_texts_json.mjs (no ajv-formats dependency).
ajv.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);
ajv.addFormat('date-time', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/);

const schemaFiles = readdirSync(CONTRACTS).filter((f) => f.endsWith('.schema.json')).sort();
for (const f of schemaFiles) ajv.addSchema(JSON.parse(readFileSync(join(CONTRACTS, f), 'utf8')), f);
let compiled = 0;
for (const f of schemaFiles) {
  try {
    ajv.getSchema(f);
    compiled++;
  } catch (e) {
    fail(`compile ${f}: ${e.message}`);
  }
}
for (const w of warnings) fail(`ajv strict warning: ${w}`);
console.log(`schemas: ${compiled}/${schemaFiles.length} compile under Ajv ${ajvVersion()} strict` + (warnings.length ? `, ${warnings.length} warnings` : ', 0 warnings'));

// ---------- 2. cases ----------
// {"$repeat": ["א", 81920]} anywhere in a patch value expands to a long string (boundary cases without
// 160KB fixtures).
const expand = (v) =>
  Array.isArray(v) ? v.map(expand)
  : v && typeof v === 'object' ? (Object.keys(v).length === 1 && '$repeat' in v ? String(v.$repeat[0]).repeat(v.$repeat[1]) : Object.fromEntries(Object.entries(v).map(([k, x]) => [k, expand(x)])))
  : v;
const clone = (o) => expand(JSON.parse(JSON.stringify(o)));
const unesc = (s) => s.replace(/~1/g, '/').replace(/~0/g, '~');
function applyPatch(doc, ops) {
  for (const op of ops) {
    const parts = op.path.split('/').slice(1).map(unesc);
    const last = parts.pop();
    let parent = doc;
    for (const p of parts) {
      if (parent == null || !(p in parent)) throw new Error(`patch path not found: ${op.path}`);
      parent = parent[p];
    }
    if (op.op === 'remove') {
      if (!(last in parent)) throw new Error(`remove: missing ${op.path}`);
      if (Array.isArray(parent)) parent.splice(Number(last), 1);
      else delete parent[last];
    } else if (op.op === 'replace') {
      if (!(last in parent)) throw new Error(`replace: missing ${op.path}`);
      parent[last] = clone(op.value);
    } else if (op.op === 'add') {
      if (Array.isArray(parent)) {
        if (last === '-') parent.push(clone(op.value));
        else parent.splice(Number(last), 0, clone(op.value));
      } else parent[last] = clone(op.value);
    } else throw new Error(`unknown op ${op.op}`);
  }
  return doc;
}
const errText = (e) => `${e.instancePath || '/'} ${e.keyword} ${e.message} (${e.schemaPath})`;

const stats = { files: 0, valid: 0, invalid: 0, passed: 0, failed: 0 };
const perSchema = {};
const caseFiles = readdirSync(CASES).filter((f) => f.endsWith('.cases.json')).sort();
const regexPatterns = []; // red-flag patterns found in fixtures, for the regex suite
const testPhrases = []; // their test_phrases_he, for the engine-agreement check (P1)
for (const cf of caseFiles) {
  const spec = JSON.parse(readFileSync(join(CASES, cf), 'utf8'));
  stats.files++;
  const validate = ajv.getSchema(spec.schema);
  if (!validate) {
    fail(`${cf}: unknown schema ${spec.schema}`);
    continue;
  }
  const baseOk = {};
  const loadBase = (c) => {
    if (c.file) return JSON.parse(readFileSync(resolve(HERE, c.file), 'utf8'));
    if (!spec.bases?.[c.base]) throw new Error(`no base '${c.base}'`);
    return clone(spec.bases[c.base]);
  };
  for (const c of spec.cases) {
    const label = `${cf} › ${c.id}`;
    // the table counts a case under the schema FILE it targets ($defs targets count for their file)
    const row = (perSchema[(c.schema ?? spec.schema).split('#')[0]] ??= { valid: 0, invalid: 0, failed: 0 });
    let ok = false;
    let detail = '';
    try {
      const base = loadBase(c);
      if (spec.schema === 'red-flags.schema.json') collectPatterns(base, regexPatterns, testPhrases);
      const doc = c.patch ? applyPatch(base, c.patch) : base;
      // a case may target a $defs entry, e.g. "common.schema.json#/$defs/regexRule"
      const v = c.schema ? ajv.getSchema(c.schema) : validate;
      if (!v) throw new Error(`unknown schema ${c.schema}`);
      const valid = v(doc);
      const errors = valid ? [] : clone(v.errors);
      if (c.expect === 'valid') {
        ok = valid;
        if (!ok) detail = errors.slice(0, 4).map(errText).join(' | ');
      } else if (c.expect === 'invalid') {
        const key = `${c.schema ?? ''}|${c.file ?? c.base}`;
        if (!(key in baseOk)) baseOk[key] = v(loadBase(c));
        if (!baseOk[key]) detail = `base '${key}' is itself invalid, so this negative proves nothing`;
        else if (valid) detail = 'expected INVALID but the document passed';
        else if (!c.error) detail = "invalid case without an 'error' anchor";
        else if (!errors.some((e) => `${e.schemaPath} ${e.instancePath} ${e.keyword} ${e.instancePath}/${e.keyword}`.includes(c.error)))
          detail = `failed, but not at '${c.error}': ` + errors.slice(0, 4).map(errText).join(' | ');
        else ok = true;
      } else detail = `bad expect '${c.expect}'`;
    } catch (e) {
      detail = `harness error: ${e.message}`;
    }
    stats[c.expect === 'valid' ? 'valid' : 'invalid']++;
    row[c.expect === 'valid' ? 'valid' : 'invalid']++;
    if (ok) stats.passed++;
    else {
      stats.failed++;
      row.failed++;
      fail(`${label}: ${detail}`);
    }
    if (VERBOSE) console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}`);
  }
}
const total = stats.valid + stats.invalid;
console.log(`cases: ${stats.passed}/${total} as expected (${stats.valid} valid, ${stats.invalid} invalid) in ${stats.files} files`);
for (const [s, r] of Object.entries(perSchema).sort(([a], [b]) => a.localeCompare(b))) console.log(`  ${s.padEnd(32)} ${String(r.valid).padStart(3)} valid  ${String(r.invalid).padStart(3)} invalid  ${r.failed ? r.failed + ' FAILED' : 'ok'}`);
const uncovered = schemaFiles.filter((f) => !perSchema[f]);
if (uncovered.length) fail(`schemas without cases: ${uncovered.join(', ')}`);

// ---------- 3. regex safety ----------
const outputRules = JSON.parse(readFileSync(resolve(CONTRACTS, '..', '..', 'content', 'output-rules.json'), 'utf8'));
const rx = await runRegexSuite({ redFlagPatterns: regexPatterns, testPhrases, outputRules: outputRules.forbidden });
for (const line of rx.lines) console.log(line);
for (const f of rx.failures) fail(`regex: ${f}`);

// ---------- summary ----------
if (failures.length) {
  console.log(`\nFAILED (${failures.length}):`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log('\nALL PASS');

function collectPatterns(doc, out, phrases) {
  for (const flag of doc.flags ?? []) {
    phrases.push(...(flag.test_phrases_he?.positive ?? []), ...(flag.test_phrases_he?.negative ?? []));
    for (const r of flag.triggers?.immediate_patterns ?? []) out.push({ flag: flag.id, id: r.id, regex: r.regex });
    for (const r of flag.triggers?.confirm?.patterns ?? []) out.push({ flag: flag.id, id: r.id, regex: r.regex });
  }
}
function ajvVersion() {
  try {
    return JSON.parse(readFileSync(new URL('../package.json', import.meta.resolve('ajv')), 'utf8')).version;
  } catch {
    return '8';
  }
}
