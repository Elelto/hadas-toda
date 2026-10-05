#!/usr/bin/env node
// texts.he.md -> texts.he.json (ARCHITECTURE §1.9), then validate.
// Owner: role 3 (conversation designer). The .md is the only source; never edit the JSON by hand.
//
// Usage (from the repo root or anywhere):
//   node docs/assessment/content/build_texts_json.mjs           # regenerate texts.he.json + validate
//   node docs/assessment/content/build_texts_json.mjs --check   # fail if texts.he.json differs from the .md
//
// Checks: fixed-texts.schema.json (Ajv 2020, strict) · output-rules.json against its schema · every
// 'all'-scope forbidden rule against every fixed text · placeholders declared, never glued to a Hebrew
// letter · variants share the base version · 101 where ARCHITECTURE §1.9 requires it.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const MD = join(HERE, 'texts.he.md');
const OUT = join(HERE, 'texts.he.json');
const RULES = join(HERE, 'output-rules.json');
const CONTRACTS = join(HERE, '..', 'architecture', 'contracts');
const CHECK = process.argv.includes('--check');

// Header of the generated file. Bump `version` and add a changelog line when the .md changes meaningfully.
const HEADER = {
  contract: 'fixed-texts',
  contract_version: '1.0.0',
  version: '0.5.0',
  status: 'draft',
  updated_at: '2026-10-05T21:00:00+03:00',
  approvals: [],
  changelog: [
    { version: '0.1.0', date: '2026-10-04', summary: 'טיוטה 1 של תפקיד 3 (רק ב-texts.he.md).' },
    { version: '0.2.0', date: '2026-10-05', summary: 'סבב 2: יישור ל-UX §7, DRAFT_NOTES §7 (סבב 3), ARCHITECTURE §1.9; 34 שאלות מטרה, 9 הודעות דגל, wtc, FAQ שלם לכל נושא, 101 בנוסחי תקלה. נגזר מ-texts.he.md.' },
    { version: '0.3.0', date: '2026-10-05', summary: 'סבב 3: D-01–D-04, ביקורת משפטית §2, ביקורת אבטחה, UX טיוטה 3, פערי UI, תוכנית מטרות v2 (18 מטרות). נוסחי D-02, redflag.footer, וריאנטי וואטסאפ, ack.*, אימות בקוד. נגזר מ-texts.he.md בעזרת build_texts_json.mjs.' },
    { version: '0.4.0', date: '2026-10-05', summary: 'סבב 4 של הארכיטקט: נוסחי 32KB, בלי מודל, פרטיות באישור לפי מצב המסירה, שורת התוספת של document_request, D-13 (גיל + minor.self.before_text עם ער"ן וסה"ר); error.delete_failed "תוך כ-24 שעות"; יצאו משימוש redflag.cta.er ו-hadas.email.tag.possible_duplicate; שדה active; chat.*, resume.* ו-closed.keep_note בבאנדל.' },
    { version: '0.5.0', date: '2026-10-05', summary: 'תיקון זול לפני שער 1 (אימות משפטי, סבב 2): form.confirmation.privacy.both_pending (מסירה ומחיקה ממתינות), form.confirmation.title.pending ("בדרך", לא "נשלחו"), ו-form.confirmation.privacy.pending@v2 ("תוך כשבוע" במקום "לכל היותר 7 ימים", כי הניקוי השעתי יכול לחרוג בשעה).' },
  ],
};

// Placeholders resolved outside the .md variable table: FAQ facts (faq.json) and engine values (ARCHITECTURE §1.9).
const EXTRA_PLACEHOLDERS = [
  /^price_/, /^clinic_/, /^session_length$/, /^kupot_refunds$/, /^receipts_insurance$/, /^online_info$/,
  /^home_visits$/, /^patient_ages$/, /^therapy_languages$/, /^first_appointment_wait$/, /^cancellation_policy$/,
  /^reports_letters$/, /^summary_warm$/, /^when_to_contact_items$/, /^referral_/,
];

// client_bundle (ARCHITECTURE §1.10): UI chrome + the offline safety set.
// Round 4 (fixed-texts schema): every text the client renders without a server response, so chat.* (including
// chat.input.too_long_block), resume.* (S2) and closed.keep_note (S9) join the bundle.
const BUNDLE = [
  /^menu\./, /^a11y\./, /^error\./, /^ui\./, /^dialog\./, /^system\.unavailable$/,
  /^chat\./, /^resume\./, /^closed\.keep_note$/,
  /^fallback\.(title|whatsapp|whatsapp_prefill|phone|contact)$/,   // static S10 (fallback.saved is server-only)
  /^redflag\.(type|doubt|title)\./, /^redflag\.footer$/, /^redflag\.cta\.call/, /^nav\.back_to_site$/,
];

// 101 is mandatory here (ARCHITECTURE §1.9).
const NEEDS_101 = (id) =>
  ['system.unavailable', 'language.unsupported', 'meta.too_long', 'meta.off_topic_end', 'outcome.extraction_gap', 'chat.input.too_long_block', 'system.model_free'].includes(id) ||
  /^media\./.test(id) ||
  /^minor\.self(\.|$)/.test(id) ||
  (/^wa\./.test(id) && !/^wa\.opening\.btn\./.test(id) && id !== 'wa.prefix');

const SUBJECT = { self: 'self', 'child.m': 'child_m', 'child.f': 'child_f', 'child.n': 'child_n', other: 'other' };
const HEADING = /^(#{4,5}) `([a-z0-9_.]+)@v(\d+)`(.*)$/;
const FIELD = /^\*\*(איפה|הערה|מתי|סטטוס):\*\*\s*(.*)$/;

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ---------- parse ----------
function parse(md) {
  const lines = md.split('\n');
  const entries = [];
  const declared = new Set();
  let cur = null;          // current entry
  let lastField = null;    // for continuation lines
  let inText = false;
  let afterBlank = false;
  let sectionStatus = null;
  let inVars = false;

  const close = () => { cur = null; lastField = null; inText = false; };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');

    if (/^### משתנים/.test(line)) inVars = true;
    else if (/^#{2,3} /.test(line) && !/^### משתנים/.test(line)) inVars = false;
    if (inVars) for (const m of line.matchAll(/\{\{([a-z][a-z0-9_]*)\}\}/g)) declared.add(m[1]);

    if (/^## /.test(line)) { sectionStatus = null; close(); continue; }
    if (/^### /.test(line) || /^---\s*$/.test(line)) { close(); continue; }

    const h = line.match(HEADING);
    if (h) {
      const [, , id, ver, rest] = h;
      cur = {
        id, version: Number(ver), legal: rest.includes('⚖️'), clinical: rest.includes('(קליני)'),
        fact: rest.includes('(עובדה)'), text: [], purpose: [], notes: [], status: null, sectionStatus,
      };
      entries.push(cur);
      lastField = null; inText = false; afterBlank = false;
      continue;
    }

    const ss = line.match(/^\*\*סטטוס הסעיף:\*\*\s*(.*)$/);
    if (ss) { sectionStatus = ss[1].trim(); close(); continue; }

    if (!cur) continue;

    if (line === '') { afterBlank = true; lastField = null; if (inText) { inText = false; cur.textDone = true; } continue; }

    if (line.startsWith('>')) {
      if (cur.textDone) { err(`${cur.id}: text lines after a blank line`); continue; }
      cur.text.push(line.replace(/^> ?/, ''));
      inText = true; lastField = null;
      continue;
    }

    const f = line.match(FIELD);
    if (f && !afterBlank && !cur.textDone) {
      const [, label, val] = f;
      if (label === 'איפה') { cur.purpose.push(val); lastField = cur.purpose; }
      else if (label === 'סטטוס') { cur.status = val; lastField = { push: (v) => { cur.status += ' ' + v; } }; }
      else { cur.notes.push(`${label}: ${val}`); lastField = { push: (v) => { cur.notes[cur.notes.length - 1] += ' ' + v; } }; }
      continue;
    }

    if (lastField && !afterBlank) { lastField.push(line.trim()); continue; }
    // anything else after an entry is a team note: ignored by design
  }
  return { entries, declared };
}

// ---------- build ----------
function build({ entries, declared }) {
  const byId = new Map();
  const texts = {};
  const placeholderOk = (p) => declared.has(p) || p === 'subject_ref' || EXTRA_PLACEHOLDERS.some((r) => r.test(p));

  for (const e of entries) {
    if (byId.has(e.id)) err(`duplicate id ${e.id}`);
    byId.set(e.id, e);
    if (!e.text.length) err(`${e.id}: no '>' text`);
  }

  const variantOf = (id) => {
    let m = id.match(/^(.*)\.wa(?:\.(self|child\.[mfn]|other))?$/);
    if (m && byId.has(m[1])) return { base: m[1], key: m[2] ? `whatsapp.${SUBJECT[m[2]]}` : 'whatsapp' };
    m = id.match(/^(.*)\.(self|child\.[mfn]|other)$/);
    if (m && byId.has(m[1])) return { base: m[1], key: SUBJECT[m[2]] };
    return null;
  };

  // base entries first, in file order
  const variants = [];
  for (const e of entries) {
    const v = variantOf(e.id);
    if (v) { variants.push([e, v]); continue; }
    if (!e.purpose.length) err(`${e.id}: missing **איפה:**`);
    const notes = [];
    const status = e.status ?? e.sectionStatus;
    if (status) notes.push(`סטטוס: ${status}`);
    notes.push(...e.notes);
    if (e.clinical) notes.push('קליני: המשמעות דורשת אישור הדס.');
    if (e.fact) notes.push('עובדה: כל הערכים מ-faq.json facts, באישור הדס.');
    texts[e.id] = {
      version: e.version,
      text: e.text.join('\n'),
      purpose_he: e.purpose.join(' '),
      legal_review: e.legal ? 'required' : 'not_required',
      status: 'draft',
      _notes: notes,
    };
  }
  for (const [e, { base, key }] of variants) {
    const b = texts[base];
    if (!b) { err(`${e.id}: base ${base} is itself a variant`); continue; }
    if (e.version !== b.version) err(`${e.id}: variant version v${e.version} != base v${b.version}`);
    if (e.legal !== (b.legal_review === 'required')) warn(`${e.id}: ⚖️ mark differs from base ${base}`);
    b.variants ??= {};
    if (b.variants[key]) err(`${e.id}: duplicate variant ${key}`);
    b.variants[key] = e.text.join('\n');
    for (const n of e.notes) b._notes.push(`וריאנט ${key} — ${n}`);
    if (e.purpose.length) b._notes.push(`וריאנט ${key} — איפה: ${e.purpose.join(' ')}`);
  }

  // finalize: placeholders, notes, bundle; enforce key order
  const out = {};
  for (const [id, t] of Object.entries(texts)) {
    const all = [t.text, ...Object.values(t.variants ?? {})];
    const ph = [];
    for (const s of all) {
      if (/[֐-׿]\{\{/.test(s)) err(`${id}: placeholder glued to a Hebrew letter`);
      for (const m of s.matchAll(/\{\{([^}]*)\}\}/g)) {
        if (!/^[a-z][a-z0-9_]{1,31}$/.test(m[1])) err(`${id}: bad placeholder {{${m[1]}}}`);
        if (!ph.includes(m[1])) ph.push(m[1]);
      }
    }
    for (const p of ph) if (!placeholderOk(p)) warn(`${id}: placeholder {{${p}}} is not in the variables table`);
    if (NEEDS_101(id)) for (const s of all) if (!s.includes('101')) err(`${id}: 101 is mandatory (ARCHITECTURE §1.9)`);
    const notes = t._notes.join(' ');
    const o = { version: t.version, text: t.text };
    if (ph.length) o.placeholders = ph;
    o.purpose_he = t.purpose_he;
    o.legal_review = t.legal_review;
    o.status = t.status;
    if (notes) o.notes = notes;
    if (t.variants) o.variants = t.variants;
    if (BUNDLE.some((r) => r.test(id))) o.client_bundle = true;
    // Round 4: a '**סטטוס:** לא פעיל — <סיבה>' line (or section status) -> active:false; the reason stays in notes
    // (the schema requires notes when active is false). Active texts omit the field (default true).
    if (t._notes.some((n) => n.startsWith('סטטוס: לא פעיל'))) o.active = false;
    out[id] = o;
  }
  return { header: HEADER, locale: 'he', texts: out };
}

// ---------- validate ----------
function ajv() {
  const a = new Ajv2020({ strict: true, allErrors: true });
  a.addFormat('date', /^\d{4}-\d{2}-\d{2}$/);
  a.addFormat('date-time', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/);
  a.addSchema(JSON.parse(readFileSync(join(CONTRACTS, 'common.schema.json'), 'utf8')), 'common.schema.json');
  return a;
}
function validate(a, schemaFile, data, label) {
  const v = a.compile(JSON.parse(readFileSync(join(CONTRACTS, schemaFile), 'utf8')));
  if (!v(data)) for (const e of v.errors) err(`${label} schema: ${e.instancePath} ${e.message}`);
  return v.errors ? 0 : 1;
}

function checkRules(json, rules) {
  const all = rules.forbidden.filter((r) => r.applies_to === 'all').map((r) => ({ ...r, re: new RegExp(r.regex, 'u') }));
  for (const [id, t] of Object.entries(json.texts)) {
    for (const s of [t.text, ...Object.values(t.variants ?? {})]) {
      const plain = s.replace(/\{\{[a-z0-9_]+\}\}/g, '').replace(/\]\([^)]*\)/g, ']');
      for (const r of all) if (r.re.test(plain)) err(`${id}: forbidden '${r.id}' (applies_to=all)`);
    }
    if (/^(goal|q|wrapup|ack)\./.test(id)) {
      for (const s of [t.text, ...Object.values(t.variants ?? {})]) {
        if (s.length > rules.limits.max_chars_turn) warn(`${id}: ${s.length} chars > max_chars_turn ${rules.limits.max_chars_turn}`);
      }
    }
    if (/^goal\..*\.(ask|ask_3w|rephrase|clarify)$/.test(id)) {
      for (const s of [t.text, ...Object.values(t.variants ?? {})]) {
        const q = (s.match(/\?/g) ?? []).length;
        if (q !== 1) warn(`${id}: ${q} question marks (max_questions=1)`);
      }
    }
  }
}

// ---------- main ----------
const parsed = parse(readFileSync(MD, 'utf8'));
const json = build(parsed);
const a = ajv();
validate(a, 'fixed-texts.schema.json', json, 'fixed-texts');
if (existsSync(RULES)) {
  const rules = JSON.parse(readFileSync(RULES, 'utf8'));
  validate(a, 'output-rules.schema.json', rules, 'output-rules');
  for (const r of rules.forbidden) { try { new RegExp(r.regex, 'u'); } catch (e) { err(`output-rules ${r.id}: bad regex`); } }
  checkRules(json, rules);
}
const serialized = JSON.stringify(json, null, 2) + '\n';

const words = (s) => s.replace(/\{\{[a-z0-9_]+\}\}/g, ' ').replace(/\]\([^)]*\)/g, ']').replace(/[-–—•\[\]]/g, ' ').split(/\s+/).filter(Boolean).length;
const d = json.texts['consent.disclaimer'];
const stats = Object.values(json.texts);
console.log(`texts: ${stats.length} · legal_review=required: ${stats.filter((t) => t.legal_review === 'required').length} · inactive: ${stats.filter((t) => t.active === false).length} · client_bundle: ${stats.filter((t) => t.client_bundle).length}`);
if (d) console.log(`consent.disclaimer: ${words(d.text)} fixed words + placeholders ${(d.placeholders ?? []).join(', ')}`);
for (const w of warnings) console.log(`warning: ${w}`);

if (CHECK) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (current !== serialized) err('texts.he.json differs from texts.he.md (run without --check to regenerate)');
} else if (!errors.length) {
  writeFileSync(OUT, serialized, 'utf8');
  console.log(`wrote ${OUT}`);
}
for (const e of errors) console.error(`error: ${e}`);
if (errors.length) { console.error(`${errors.length} error(s)`); process.exit(1); }
console.log(CHECK ? 'check: OK, texts.he.json matches texts.he.md' : 'OK: schema-valid');
