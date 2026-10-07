#!/usr/bin/env node
// consistency_check.mjs: cross-document consistency check for the intake-chat design docs.
// Owner: role 15 (planning critic). Read-only: it never writes to any document.
//
// Compares texts.he.md, texts.he.json, UX_SPEC.md, ARCHITECTURE.md and contracts/*.json on:
//   1. text IDs referenced in UX / ARCH exist in texts.he.json, or are marked proposed / working name / retired
//   2. inactive IDs (active: false) are not described as active; IDs described as inactive really are inactive
//   3. durations: 24 h, 72 h, 7 days, 6 months / 180 days (and stray values: 30 days, 20 h, 48 h, ...)
//   4. the closed processor list (D-07 + D-12 + Cloudflare finding)
//   5. the 101 rules (ARCH §1.9 list vs. build NEEDS_101, exemptions, red-flag guard, "with/without 101" claims)
//
// Run from the repo root:   node docs/assessment/scripts/consistency_check.mjs
// Options:  --verbose  (print every hit, not just the first few per bucket)
// Exit code: 0 if no ERROR rows, 1 otherwise. WARN rows need a human look; they are heuristics.

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VERBOSE = process.argv.includes('--verbose');
const SHOW = VERBOSE ? Infinity : 6;

const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const FILES = {
  texts_md: 'content/texts.he.md',
  ux: 'ux/UX_SPEC.md',
  arch: 'architecture/ARCHITECTURE.md',
  goals: 'GOALS.md',
  decisions: 'DECISIONS.md',
  components: 'ui/COMPONENTS.md',
  voice: 'content/VOICE_AND_TONE.md',
};
const doc = Object.fromEntries(Object.entries(FILES).map(([k, p]) => [k, read(p).split(/\r?\n/)]));
const json = JSON.parse(read('content/texts.he.json'));
const T = json.texts;
const IDS = new Set(Object.keys(T));
const contractsDir = 'architecture/contracts';
const contracts = Object.fromEntries(
  readdirSync(join(ROOT, contractsDir)).filter((f) => f.endsWith('.json')).map((f) => [f, read(`${contractsDir}/${f}`)]),
);
const buildSrc = read('content/build_texts_json.mjs');

let errors = 0, warns = 0;
const out = [];
const say = (s = '') => out.push(s);
const row = (level, msg) => { if (level === 'ERROR') errors++; if (level === 'WARN') warns++; say(`  [${level}] ${msg}`); };
const loc = (k, i) => `${FILES[k]}:${i + 1}`;
const clip = (s, n = 140) => (s.length > n ? s.slice(0, n) + '…' : s).replace(/\s+/g, ' ').trim();

// Section tracker: returns the nearest heading above each line (for grouping).
function sections(lines) {
  const sec = []; let cur = '(top)';
  lines.forEach((l, i) => { const m = /^(#{2,4})\s+(.*)$/.exec(l); if (m) cur = m[2].slice(0, 60); sec[i] = cur; });
  return sec;
}
const SEC = Object.fromEntries(Object.keys(doc).map((k) => [k, sections(doc[k])]));

// Markers (Hebrew + English) used by the heuristics.
const PROPOSED = /(הצעה|מוצע|מציע|proposed|שם עבודה|שמות עבודה|working name|לאישור|נוסח חדש|מזהה חדש|\(חדש|חדש\)|חדש\.|\*\*חדש)/i;
const RETIRED = /(יצא(ו)? משימוש|הוסר|בוטל|retired|~~|היסטוריה|הוצא|במקום|מחליף את|נקרא|שם ישן|לשעבר)/i;
const INACTIVE = /(לא פעיל|לא פעילים|active: false|"active": false|inactive|כבוי|כבויה|ענף א|branch A|חלופה|רק אם עורך הדין|אם עו"ד|אם D-13|היסטוריה|~~|לחזרה|נשמר לחזרה|outcome3_enabled|כשתופעל|לקראת הפעלה)/i;
const ACTIVE_CLAIM = /(פעיל(?! ה)|active: true|מוצג תמיד|חובה ב)/;

// ───────────────────────── 1. text IDs referenced in UX / ARCH ─────────────────────────
say('== 1. Text IDs referenced in UX_SPEC / ARCHITECTURE vs texts.he.json ==');
const namespaces = new Set([...IDS].map((id) => id.split('.')[0]));
// Dotted things in backticks that are data fields / files, not text IDs.
const NOT_TEXT = /^(keep\.texts_shown|keep\.accepted|handoff\.status|input\.mask|scan\.status|routing_stops\.|content_versions\.|first_call\.|red_flag\.raised|end\.reason|turns\.intake|session\.|case\.|form\.(status|fields)|outcome\.(kind|id|tier)$|redflag\.(tier|id)$)/;
const FILEISH = /\.(md|json|mjs|js|jsx|ts|toml|html|css|yaml|yml)$/;
function idsInLine(line) {
  const res = [];
  for (const m of line.matchAll(/`([^`]+)`/g)) {
    for (let tok of m[1].split(/[\s,·/]+/)) {
      tok = tok.replace(/[()]/g, '');
      const vm = /^([a-z0-9_.*]+?)(?:@v(\d+))?$/.exec(tok);
      if (!vm) continue;
      const id = vm[1];
      if (!id.includes('.') || id.includes('<') || FILEISH.test(id) || NOT_TEXT.test(id)) continue;
      if (!namespaces.has(id.split('.')[0])) continue;
      res.push({ id: id.replace(/\.$/, ''), ver: vm[2] ? Number(vm[2]) : null });
    }
  }
  return res;
}
function exists(id) {
  if (id.endsWith('.*')) { const p = id.slice(0, -1); return [...IDS].some((x) => x.startsWith(p)); }
  if (IDS.has(id)) return true;
  // '.ask|clarify' style or a prefix that is a family (e.g. `chat.end` → chat.end.*)
  return [...IDS].some((x) => x.startsWith(id + '.'));
}
const missing = { proposed: [], retired: [], unmarked: [] };
const verMismatch = [];
for (const k of ['ux', 'arch']) {
  doc[k].forEach((line, i) => {
    for (const { id, ver } of idsInLine(line)) {
      if (!exists(id)) {
        const bucket = PROPOSED.test(line) ? 'proposed' : RETIRED.test(line) ? 'retired' : 'unmarked';
        missing[bucket].push({ k, i, id, sec: SEC[k][i], line });
      } else if (ver !== null && T[id] && T[id].version > ver && !RETIRED.test(line) && !/(בטיוטה|v\d+ ←|קודם|הישן|היה)/.test(line)) {
        verMismatch.push({ k, i, id, ver, cur: T[id].version, line });
      } else if (ver !== null && T[id] && T[id].version < ver) {
        verMismatch.push({ k, i, id, ver, cur: T[id].version, line, ahead: true });
      }
    }
  });
}
const uniq = (arr) => { const s = new Map(); for (const x of arr) { const key = `${x.k}|${x.id}`; if (!s.has(key)) s.set(key, { ...x, n: 1 }); else s.get(key).n++; } return [...s.values()]; };
for (const [b, arr] of Object.entries(missing)) {
  const u = uniq(arr);
  say(`  ${b}: ${u.length} distinct IDs (${arr.length} mentions)`);
  if (b === 'unmarked') {
    // UX §7.x tables use working names that §7.0 maps; split them out so the real gaps stand out.
    const inSec7 = u.filter((x) => x.k === 'ux' && /^7\./.test(x.sec));
    const rest = u.filter((x) => !(x.k === 'ux' && /^7\./.test(x.sec)));
    say(`    of which UX §7.x working-name tables: ${inSec7.length} (mapped in §7.0 or pending role 3; listed with --verbose)`);
    if (VERBOSE) inSec7.forEach((x) => say(`      ${loc(x.k, x.i)} ${x.id}`));
    rest.slice(0, VERBOSE ? Infinity : 40).forEach((x) => row('WARN', `${x.id} not in texts.he.json, not marked proposed (${loc(x.k, x.i)}, §${x.sec}, ×${x.n}): ${clip(x.line, 110)}`));
    if (!VERBOSE && rest.length > 40) say(`    … ${rest.length - 40} more (--verbose)`);
  } else if (VERBOSE) u.forEach((x) => say(`      ${loc(x.k, x.i)} ${x.id}`));
  else if (b === 'proposed') u.slice(0, SHOW * 2).forEach((x) => say(`      ${x.id} (${loc(x.k, x.i)})`));
}
say(`  version references older than current, not marked as history: ${verMismatch.filter((v) => !v.ahead).length}; ahead of texts.he.json: ${verMismatch.filter((v) => v.ahead).length}`);
for (const v of verMismatch.filter((x) => x.ahead)) row('ERROR', `${v.id}@v${v.ver} referenced but texts.he.json has v${v.cur} (${loc(v.k, v.i)})`);
for (const v of verMismatch.filter((x) => !x.ahead).slice(0, SHOW * 2)) row('WARN', `${v.id}@v${v.ver} referenced, current is v${v.cur} (${loc(v.k, v.i)}): ${clip(v.line, 100)}`);

// ───────────────────────── 2. active / inactive consistency ─────────────────────────
say('');
say('== 2. Active / inactive consistency ==');
const inactive = [...IDS].filter((id) => T[id].active === false);
say(`  texts.he.json: ${IDS.size} texts, ${inactive.length} inactive`);
// 2a. IDs that some doc calls inactive, but JSON has active.
function nearMarker(line, id, re, before = 80, after = 160) {
  let idx = line.indexOf(id);
  while (idx >= 0) {
    const win = line.slice(Math.max(0, idx - before), idx + id.length + after);
    if (re.test(win)) return true;
    idx = line.indexOf(id, idx + 1);
  }
  return false;
}
const STRICT_INACTIVE = /(לא פעיל|active: false|inactive)/;
// The text right after an exact `id` / `id@vN` mention, up to the next backticked token (max 70 chars).
function afterMentions(line, id) {
  const res = []; const re = new RegExp('`' + id.replace(/[.*]/g, (c) => '\\' + c) + '(@v\\d+)?`', 'g');
  for (const m of line.matchAll(re)) {
    let tail = line.slice(m.index + m[0].length, m.index + m[0].length + 70);
    const b = tail.indexOf('`'); if (b >= 0) tail = tail.slice(0, b);
    res.push(tail);
  }
  return res;
}
const calledInactiveButActive = new Map();
for (const k of ['ux', 'arch', 'texts_md']) {
  doc[k].forEach((line, i) => {
    for (const { id } of idsInLine(line)) {
      if (!IDS.has(id) || T[id].active === false) continue;
      if (afterMentions(line, id).some((t) => STRICT_INACTIVE.test(t) && !/(אם |ייתכן|לסמן|האם|\?|הכפתור|בשאלת|ענף א)/.test(t))) {
        if (!calledInactiveButActive.has(id)) calledInactiveButActive.set(id, []);
        calledInactiveButActive.get(id).push(loc(k, i));
      }
    }
  });
}
for (const [id, locs] of calledInactiveButActive) row('ERROR', `${id}: texts.he.json active=true, but described as inactive at ${locs.slice(0, 4).join(', ')}${locs.length > 4 ? ` (+${locs.length - 4})` : ''}`);
// 2b. inactive IDs mentioned without any inactive marker on the line.
const describedActive = [];
for (const k of ['ux', 'arch']) {
  doc[k].forEach((line, i) => {
    for (const { id } of idsInLine(line)) {
      const fam = id.endsWith('.*') ? [...IDS].filter((x) => x.startsWith(id.slice(0, -1))) : [id];
      if (!fam.length || !fam.every((x) => T[x] && T[x].active === false)) continue;
      if (!INACTIVE.test(line) && !RETIRED.test(line)) describedActive.push({ k, i, id, line });
    }
  });
}
say(`  inactive IDs mentioned on a line with no inactive/retired marker: ${describedActive.length}`);
for (const x of describedActive.slice(0, VERBOSE ? Infinity : 15)) row('WARN', `${x.id} (inactive) at ${loc(x.k, x.i)}: ${clip(x.line, 110)}`);
// 2c. the D-13 branch-A family and minor.self.before_text, explicitly.
for (const id of ['goal.self_age_band.ask', 'goal.self_age_band.clarify', 'goal.self_age_band.rephrase', 'q.self_age_band.opt.under_18', 'q.self_age_band.opt.adult', 'minor.self.before_text']) {
  if (!T[id]) { row('ERROR', `${id} missing from texts.he.json`); continue; }
  say(`  ${id}: active=${T[id].active !== false} v${T[id].version}`);
}
const slotCat = contracts['slot-catalog.schema.json'] || '';
say(`  slot-catalog schema mentions self_age_band inactive rule: ${/self_age_band/.test(slotCat) && /inactive_reason/.test(slotCat)}`);

// ───────────────────────── 3. durations ─────────────────────────
say('');
say('== 3. Durations ==');
const DUR = [
  ['24h', /24\s*(שעות|שעה|h\b|hours?)/g],
  ['72h', /72\s*(שעות|h\b|hours?)/g],
  ['7d', /(7|שבעה)\s*(ימים|days?)|כשבוע/g],
  ['6mo', /(6|שישה)\s*(חודשים|חודש|months?)|חצי שנה/g],
  ['180d', /180\s*(יום|ימים|days?)/g],
  ['30d', /30\s*(יום|ימים|days?)/g],
  ['20h', /20\s*(שעות)/g],
  ['48h', /48\s*(שעות|h\b|hours?)|יומיים/g],
  ['24mo', /24\s*(חודשים|months?)/g],
  ['13mo', /13\s*(חודשים|months?)/g],
];
const docsForDur = { ...doc, ...Object.fromEntries(Object.entries(contracts).map(([f, s]) => [`c:${f}`, s.split(/\r?\n/)])) };
const durTable = {};
for (const [k, lines] of Object.entries(docsForDur)) {
  durTable[k] = {};
  for (const [name, re] of DUR) durTable[k][name] = lines.reduce((n, l) => n + (l.match(re) || []).length, 0);
}
const cols = DUR.map(([n]) => n);
say(`  ${'file'.padEnd(36)} ${cols.map((c) => c.padStart(5)).join(' ')}`);
for (const [k, r] of Object.entries(durTable)) {
  if (cols.every((c) => !r[c])) continue;
  say(`  ${(FILES[k] || k).slice(0, 36).padEnd(36)} ${cols.map((c) => String(r[c] || '·').padStart(5)).join(' ')}`);
}
// keep context must use 6 months / 180 days only.
const KEEP_CTX = /(keep|intake-kept|שמירה מרצון|שמירה לשיפור|לשיפור|תישמר|נשמרה|kept)/i;
for (const [k, lines] of Object.entries(docsForDur)) {
  lines.forEach((l, i) => {
    if (!KEEP_CTX.test(l)) return;
    for (const m of l.matchAll(/(\d+)\s*(יום|ימים|days?|חודשים|months?)/g)) {
      const n = Number(m[1]); const unit = m[2];
      const isMonth = /חודש|month/.test(unit);
      const ok = (isMonth && (n === 6 || n === 24 || n === 13)) || (!isMonth && (n === 180 || n === 7 || n === 2));
      if (!ok) row('WARN', `keep-context duration "${m[0]}" at ${(FILES[k] || k)}:${i + 1}: ${clip(l, 100)}`);
    }
  });
}
// 30 days is the retired D-01 design; flag any mention not marked as history.
for (const [k, lines] of Object.entries(docsForDur)) {
  lines.forEach((l, i) => {
    if (/30\s*(יום|ימים|days?)/.test(l) && !RETIRED.test(l) && !/(ספק|provider|ZDR|שומר מידע|למשל|מחירון|Cloud API|תנאים)/.test(l)) row('WARN', `"30 days" not marked as history at ${(FILES[k] || k)}:${i + 1}: ${clip(l, 100)}`);
  });
}
// code constant: purge_at = consented_at + 180 days in kept-conversation; consent-record says 180 days.
for (const f of ['kept-conversation.schema.json', 'consent-record.schema.json']) {
  const s = contracts[f] || '';
  say(`  ${f}: mentions 180 days=${/180 days/.test(s)}, mentions 6 months=${/6 months/.test(s)}`);
}

// ───────────────────────── 4. processor list ─────────────────────────
say('');
say('== 4. Processor list (D-07 + D-12 + Cloudflare; Meta in phase 6) ==');
const PROC = {
  Netlify: /Netlify/, Cloudflare: /Cloudflare/, EmailJS: /EmailJS/, Gmail: /Gmail/, Meta: /Meta|WhatsApp Business|Cloud API/,
  AI: /ai_provider_name|ספק (ה-?AI|המודל|שירות הבינה)|AI provider/, Monitoring: /heartbeat|ניטור/,
  'Google Ads': /Google Ads/, Turnstile: /Turnstile/, Firestore: /Firestore|Firebase/, Sentry: /Sentry/,
};
function sliceSection(lines, startRe, endRe) {
  const s = lines.findIndex((l) => startRe.test(l)); if (s < 0) return [];
  let e = lines.slice(s + 1).findIndex((l) => endRe.test(l)); e = e < 0 ? lines.length : s + 1 + e;
  return lines.slice(s, e);
}
function textBlock(id) {
  const lines = doc.texts_md; const s = lines.findIndex((l) => new RegExp('^#{4,5} `' + id.replace(/\./g, '\\.') + '@v').test(l));
  if (s < 0) return [];
  let e = lines.slice(s + 1).findIndex((l) => /^#{3,5} /.test(l)); e = e < 0 ? lines.length : s + 1 + e;
  return lines.slice(s, e).filter((l) => l.startsWith('>'));
}
const targets = {
  'DECISIONS D-07 row': doc.decisions.filter((l) => /^\| D-07/.test(l)),
  'DECISIONS Cloudflare row': doc.decisions.filter((l) => /^\| ממצא/.test(l)),
  'ARCH §11.2': sliceSection(doc.arch, /^### 11\.2/, /^### 11\.3/),
  'ARCH §0.6 P4 row': doc.arch.filter((l) => /\*\*P4\*\*/.test(l)),
  'texts about.data (shown text)': textBlock('about.data'),
  'texts meta.who_sees (shown text)': textBlock('meta.who_sees'),
  'texts meta.who_sees.wa (shown text)': textBlock('meta.who_sees.wa'),
  'texts form.privacy_note (shown text)': textBlock('form.privacy_note'),
  'texts consent.disclaimer (shown text)': textBlock('consent.disclaimer'),
  'propagation_plan P4': read('consults/propagation_plan.md').split(/\r?\n/).filter((l) => /^\| P4/.test(l)),
};
const pcols = Object.keys(PROC);
say(`  ${'where'.padEnd(38)} ${pcols.map((c) => c.slice(0, 9).padStart(9)).join(' ')}`);
for (const [name, lines] of Object.entries(targets)) {
  const txt = lines.join('\n');
  say(`  ${name.padEnd(38)} ${pcols.map((c) => (PROC[c].test(txt) ? 'x' : '·').padStart(9)).join(' ')}`);
}
// The D-07 row of DECISIONS is the binding list; it predates Cloudflare.
if (!/Cloudflare/.test(targets['DECISIONS D-07 row'].join(''))) row('WARN', 'DECISIONS D-07 row (the binding "closed list") still has no Cloudflare; only the separate "ממצא" row adds it');
if (!/Cloudflare/.test(targets['ARCH §11.2'].join(''))) row('ERROR', 'ARCH §11.2 lacks Cloudflare');

// ───────────────────────── 5. 101 rules ─────────────────────────
say('');
say('== 5. 101 rules ==');
// 5a. parse the build's NEEDS_101 explicit list, exemptions and the red-flag guard.
const exListM = /NEEDS_101 = \(id\) =>[\s\S]*?\[([^\]]+)\]\.includes\(id\)/.exec(buildSrc);
const buildList = exListM ? [...exListM[1].matchAll(/'([^']+)'/g)].map((m) => m[1]) : [];
const exemptM = /NEEDS_101_EXEMPT = \{([\s\S]*?)\};/.exec(buildSrc);
const exempt = exemptM ? [...exemptM[1].matchAll(/'([^']+)':/g)].map((m) => m[1]) : [];
const guardM = /REDFLAG_KEEPS_101 = \[([\s\S]*?)\];/.exec(buildSrc);
const guard = guardM ? [...guardM[1].matchAll(/'([^']+)'/g)].map((m) => m[1]) : [];
say(`  build explicit NEEDS_101: ${buildList.join(', ')}`);
say(`  build regex families: media.*, minor.self*, wa.* (minus buttons, prefix)   exempt: ${exempt.join(', ')}`);
say(`  REDFLAG_KEEPS_101 (${guard.length}): ${guard.join(', ')}`);
// 5b. ARCH §1.9 "101 חובה" list.
const archLine = doc.arch.find((l) => /^\*\*101 חובה\*\*/.test(l)) || '';
const archList = [...archLine.matchAll(/`([a-z0-9_.*\/]+)`/g)].map((m) => m[1]);
say(`  ARCH §1.9 "101 חובה": ${archList.join(', ')}`);
const archOnly = archList.filter((x) => !buildList.includes(x) && !/^(wa|media)\./.test(x) && !/^(wa\.\*|media\.\*)/.test(x));
const buildOnly = buildList.filter((x) => !archList.includes(x));
if (archOnly.length) row('WARN', `in ARCH §1.9 list but not enforced by the build: ${archOnly.join(', ')}`);
if (buildOnly.length) row('WARN', `enforced by the build but not in ARCH §1.9 list: ${buildOnly.join(', ')}`);
// 5c. actual 101 presence for the IDs at stake.
// Only the shown strings count (text + variants), never notes / purpose_he.
const shown = (id) => [T[id].text, ...Object.values(T[id].variants || {}).map((v) => (typeof v === 'string' ? v : v && v.text))].filter((x) => x != null).map(String);
const has101 = (id) => !!T[id] && shown(id).every((s) => s.includes('101'));
const any101 = (id) => !!T[id] && shown(id).some((s) => s.includes('101'));
for (const id of [...exempt, 'reporter.not_parent', 'interim.deleted_note', 'chat.ended', 'chat.delete.done', 'keep.saved_note', 'keep.optin.note', 'consent.emergency', 'chat.disclaimer_line', 'error.delete_failed', 'redflag.type.child_safety', 'redflag.type.distress', 'redflag.after.hotline']) {
  if (!T[id]) { say(`  ${id}: MISSING`); continue; }
  say(`  ${id.padEnd(28)} active=${String(T[id].active !== false).padEnd(5)} 101(all variants)=${has101(id)}  101(any)=${any101(id)}`);
}
for (const id of guard) if (!has101(id)) row('ERROR', `${id} is in REDFLAG_KEEPS_101 but lacks 101 in some variant`);
const flagTypes = [...IDS].filter((id) => /^redflag\.type\./.test(id) && T[id].active !== false);
const flagNo101 = flagTypes.filter((id) => !any101(id));
say(`  active redflag.type.* without 101: ${flagNo101.join(', ') || '—'}`);
for (const id of flagNo101) if (!guard.includes(id)) row('WARN', `${id}: active red-flag text with no 101 and not in REDFLAG_KEEPS_101 (S6 is now the only route to 101 for a minor / non-parent)`);
// 5d. claims "with 101" / "without 101" near an ID, checked against the JSON.
const WITH = /(עם 101|כולל 101|101 חובה|חובה 101|101 וגם|ו-101|with 101)/;
const WITHOUT = /(בלי 101|ללא 101|no 101|without 101|אין 101|לא נושא 101|לא דורש.{0,20}101)/;
const claims = [];
for (const k of ['ux', 'arch', 'texts_md']) {
  doc[k].forEach((line, i) => {
    for (const { id } of idsInLine(line)) {
      if (!T[id]) continue;
      const pos = line.indexOf(id); const win = line.slice(pos, pos + id.length + 70);
      if (WITHOUT.test(win) && any101(id) && !RETIRED.test(win) && !/(v1|בטיוטה 3\.2|היה)/.test(win)) claims.push(['ERROR', `${id} described "without 101" but its text contains 101 (${loc(k, i)}): ${clip(win, 90)}`]);
      else if (WITH.test(win) && !any101(id) && !RETIRED.test(win) && !/(v1|בטיוטה 3\.2|היה|הוסר|הוסרו|יצא|ענף א)/.test(win)) claims.push(['WARN', `${id} described "with 101" but its text has no 101 (${loc(k, i)}): ${clip(win, 90)}`]);
    }
  });
}
say(`  "with/without 101" claims that contradict texts.he.json: ${claims.length}`);
for (const [lv, m] of claims.slice(0, VERBOSE ? Infinity : 15)) row(lv, m);

// 5e. P2 extension: how each doc treats reporter.not_parent today.
say('');
say('  P2 / reporter.not_parent (Eliya ruled on the minor card only; the manager extended it):');
const OPEN = /(פתוח|להכרעת|open|שאלה פתוחה|לא הוכרע|מחכה לאליה|תלוי בהכרעה|לא קובע)/;
for (const k of ['texts_md', 'ux', 'arch', 'decisions', 'goals']) {
  let open = 0, decided = 0; const where = [];
  doc[k].forEach((line, i) => {
    if (!/reporter\.not_parent|non_parent_reporter|S13b/.test(line) || !/101/.test(line)) return;
    if (OPEN.test(line)) open++; else { decided++; where.push(i + 1); }
  });
  say(`    ${FILES[k].padEnd(32)} lines treating it as open: ${String(open).padStart(2)} · as decided "no 101": ${String(decided).padStart(2)}${where.length ? ` (lines ${where.slice(0, 8).join(', ')})` : ''}`);
}
say(`    texts.he.json reporter.not_parent: v${T['reporter.not_parent']?.version}, contains 101: ${any101('reporter.not_parent')}`);

// ───────────────────────── 6. stale gate-1 states ─────────────────────────
say('');
say('== 6. Stale pre-gate-1 states described as current ==');
const STALE = [
  ['D-13 pending', /(ממתין לאליה|ממתינה לאליה|D-13 פתוחה|אם D-13 תאושר)/],
  ['baseline count (D-11)', /(ספירת (ה)?בסיס|מדידת בסיס|מול הבסיס|baseline)/i],
  ['30-day copy after finish (old D-01)', /(השרת 30 יום|30 יום אחרי|עותק 30 יום)/],
  ['improvement_use', /improvement_use/],
  ['"bli shem u-bli telefon" promise', /בלי שם ובלי טלפון|בלי שם, טלפון/],
];
for (const k of ['ux', 'arch', 'texts_md', 'goals', 'components', 'voice']) {
  for (const [name, re] of STALE) {
    const hits = [];
    doc[k].forEach((line, i) => { if (re.test(line) && !/(בוטל|הוכרע|היסטוריה|~~|לא פעיל|\(היסטוריה|לשעבר|נפתח מחדש|הוסר|הוסרו|בטיוטה 3\.2|פוסל|אליה:|הנוסח של אליה|לא נכתב|ולא "בלי|במקום|שינויים|לא "בלי)/.test(line)) hits.push(i + 1); });
    if (hits.length) row('WARN', `${FILES[k]}: "${name}" without a resolved/history marker at lines ${hits.slice(0, 10).join(', ')}${hits.length > 10 ? ` (+${hits.length - 10})` : ''}`);
  }
}

say('');
say(`SUMMARY: ${errors} ERROR, ${warns} WARN  (texts=${IDS.size}, inactive=${inactive.length}, contracts=${Object.keys(contracts).length})`);
console.log(out.join('\n'));
process.exit(errors ? 1 : 0);
