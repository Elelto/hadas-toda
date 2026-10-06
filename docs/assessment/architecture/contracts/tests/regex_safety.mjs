// Regex safety (ARCHITECTURE §1.5 "ריצה בזמן לינארי", rounds 5-6). Owner: role 6.
// Reference implementation for `npm run intake:check` (role 7 imports lintPattern / timeLinear / timeMask
// from here) and the regex part of tests/run.mjs.
//
// Two modes:
//   'linear' : red-flag patterns (common.regexRule) AND, since round 6, the identifier-masking patterns
//              (ARCHITECTURE §6.1 step 1). Executed at runtime ONLY by the linear-time engine (re2js, an
//              RE2 port: no backtracking, time proportional to the input). Must compile in BOTH re2js and
//              ECMAScript 'u' (portable syntax) and agree on every test phrase. Masking is timed find-all
//              (every match, as the replacement loop runs), not first-match.
//   'v8'     : output-rules on bounded text (summary, fixed texts, 3,000 chars). Executed by V8
//              (backtracking), so the lint and the timing test are the only protection. Masking used to be
//              here; round 6 moved it out (security round 3: a P1-P5-clean masking pattern took 9.5 s in
//              V8 on 200 digits, before the red-flag scan, so no S6).
//
// Pattern rules (both modes unless noted):
//   P1  compiles (linear: re2js AND ECMAScript 'u'; v8: ECMAScript 'u').
//   P2  no backreferences (\1-\9, \k<name>); linear mode: no lookaround either ((?= (?! (?<= (?<!).
//   P3  no nested quantifiers: a repeating quantifier (*, +, {m,n} with n>1 or open) may not apply to a
//       group that contains any quantifier or an alternation '|'. Use a character class instead of a
//       quantified alternation, and a bounded class ([^.!?\n]{0,40}) for "words in between".
//   P4  counted repeats have an upper bound <= 50 ({m,} counts as unbounded and is allowed).
//   P5  v8 mode only: at most one unbounded quantifier (*, +, {m,}) per pattern (adjacent unbounded
//       quantifiers backtrack polynomially, e.g. .*.*x is cubic).
//   P6  timing: under its runtime engine, on every adversarial input, each pattern stays within the
//       per-pattern budget and the whole set within the total budget (BUDGETS below).

import { Worker } from 'node:worker_threads';
import { RE2JS } from 're2js';

// CI budgets. Runtime budgets (ARCHITECTURE §1.5) are larger, for slower function CPUs.
// The masking set has its own budget of the same size (it runs before the scan, not inside its budget).
export const BUDGETS = {
  linear: { perPatternMs: 20, totalMs: 250, runtimePerPatternMs: 50, runtimeTotalMs: 500 },
  v8: { perPatternMs: 5, workerTimeoutMs: 2000 },
};

// Reference masking set (round 6). The production list lives in intake/engine/normalize (role 7) and goes
// through the same timeMask() in intake:check step 13; this set keeps the runner honest until then and stays
// as its regression. The regex only FINDS candidates; classification (ID check digit, phone prefix, Luhn
// for 13-19 digits) is code, linear in the length of the run. Plain space instead of \s: RE2's \s is ASCII,
// ECMAScript's is Unicode, and normalization maps other spaces to U+0020 first.
export const MASK_REFERENCE = {
  patterns: [
    { id: 'number_run', regex: String.raw`\+?\d[\d ().-]{6,}\d` },
    { id: 'email', regex: String.raw`[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z0-9.-]+` },
  ],
  // candidate: the set must find at least one candidate; none: it must find nothing.
  phrases: {
    candidate: ['תעודת זהות 123456782', 'ת.ז. 12345678', 'הטלפון שלי 050-1234567 תודה', 'אפשר גם ב-+972 50 123 4567', '(03) 555-1234 בבית', 'כרטיס 4580 1234 5678 9012', 'המייל dana.cohen@gmail.com תודה'],
    none: ['הוא בן 3 וחצי', 'בשבוע 32 להריון', 'במצב חירום מד"א 101', 'מגיל 18 חודשים, 2-3 מילים', 'נולד ב-2019', 'לפני 6 חודשים ו-12 שבועות'],
  },
  // Security round 3 probe: passes P1-P4 (and P5), yet backtracks polynomially in V8. The CI timing net
  // must catch it under re2js (find-all on the 32,000-digit input), and V8 must be killed on 200 digits.
  probe: String.raw`\d{1,50}[- ]?\d{1,50}[- ]?\d{1,50}[- ]?\d{1,50}x`,
};
// Input sizes: the body cap is 32,768 bytes, so at most ~16,000 Hebrew chars (2 bytes each) but up to
// ~32,000 ASCII chars. v8-mode text is bounded by the envelope (outcome body, 3,000 chars).
const HEB_N = 16000;
const ASCII_N = 32000;
const V8_N = 3000;

// ---------- lint ----------
export function lintPattern(src, mode) {
  const v = [];
  // P1
  try {
    new RegExp(src, 'u');
  } catch (e) {
    v.push(`P1 not valid ECMAScript (u): ${e.message}`);
  }
  if (mode === 'linear') {
    try {
      RE2JS.compile(src);
    } catch (e) {
      v.push(`P1 not valid in the linear engine: ${e.message}`);
    }
  }
  // tokenizer-based checks
  let i = 0;
  const stack = [{ hasQuant: false, hasAlt: false }];
  let lastAtom = null; // { kind: 'group'|'atom', hasQuant, hasAlt }
  let unbounded = 0;
  const top = () => stack[stack.length - 1];
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\\') {
      const nx = src[i + 1];
      if (/[1-9]/.test(nx) || nx === 'k') v.push(`P2 backreference at ${i}`);
      if (nx === 'p' || nx === 'P' || (nx === 'u' && src[i + 2] === '{')) {
        const end = src.indexOf('}', i);
        i = end < 0 ? src.length : end + 1;
      } else if (nx === 'u') i += 6;
      else if (nx === 'x') i += 4;
      else if (nx === 'c') i += 3;
      else i += 2;
      lastAtom = { kind: 'atom' };
      continue;
    }
    if (ch === '[') {
      i++;
      if (src[i] === '^') i++;
      if (src[i] === ']') i++;
      while (i < src.length && src[i] !== ']') {
        if (src[i] === '\\') {
          const nx = src[i + 1];
          if (nx === 'p' || nx === 'P' || (nx === 'u' && src[i + 2] === '{')) {
            const end = src.indexOf('}', i);
            i = end < 0 ? src.length : end + 1;
            continue;
          }
          i += 2;
          continue;
        }
        i++;
      }
      i++;
      lastAtom = { kind: 'atom' };
      continue;
    }
    if (ch === '(') {
      let look = false;
      if (src.startsWith('(?=', i) || src.startsWith('(?!', i)) { look = true; i += 3; }
      else if (src.startsWith('(?<=', i) || src.startsWith('(?<!', i)) { look = true; i += 4; }
      else if (src.startsWith('(?:', i)) i += 3;
      else if (src.startsWith('(?<', i) || src.startsWith('(?P<', i)) i = src.indexOf('>', i) + 1;
      else i += 1;
      if (look && mode === 'linear') v.push(`P2 lookaround at ${i} (not allowed in linear mode: red-flag and masking patterns)`);
      stack.push({ hasQuant: false, hasAlt: false });
      lastAtom = null;
      continue;
    }
    if (ch === ')') {
      const fr = stack.length > 1 ? stack.pop() : { hasQuant: false, hasAlt: false };
      lastAtom = { kind: 'group', hasQuant: fr.hasQuant, hasAlt: fr.hasAlt };
      if (fr.hasQuant) top().hasQuant = true;
      i++;
      continue;
    }
    if (ch === '|') {
      top().hasAlt = true;
      lastAtom = null;
      i++;
      continue;
    }
    if (ch === '*' || ch === '+' || ch === '?' || (ch === '{' && /^\{\d+(,\d*)?\}/.test(src.slice(i)))) {
      let repeating = ch !== '?';
      let open = ch === '*' || ch === '+';
      let len = 1;
      if (ch === '{') {
        const m = /^\{(\d+)(,(\d*))?\}/.exec(src.slice(i));
        len = m[0].length;
        const hi = m[2] === undefined ? Number(m[1]) : m[3] === '' ? Infinity : Number(m[3]);
        open = hi === Infinity;
        repeating = hi > 1;
        if (!open && hi > 50) v.push(`P4 counted repeat ${m[0]} above 50 at ${i}`);
      }
      if (open) unbounded++;
      if (repeating && lastAtom?.kind === 'group' && (lastAtom.hasQuant || lastAtom.hasAlt))
        v.push(`P3 nested quantifier at ${i}: '${src.slice(i, i + len)}' repeats a group that contains ${lastAtom.hasQuant ? 'a quantifier' : 'an alternation'}`);
      top().hasQuant = true;
      i += len;
      if (src[i] === '?') i++; // lazy suffix
      lastAtom = null;
      continue;
    }
    lastAtom = { kind: 'atom' };
    i++;
  }
  if (mode === 'v8' && unbounded > 1) v.push(`P5 ${unbounded} unbounded quantifiers (max 1 in v8 mode)`);
  return v;
}

// ---------- adversarial inputs ----------
function prng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}
export function adversarialInputs(src, n = { heb: HEB_N, ascii: ASCII_N }) {
  const rep = (unit, len) => unit.repeat(Math.ceil(len / unit.length)).slice(0, len);
  const literal = (src.replace(/\\[pPu]\{[^}]*\}|\\.|\[[^\]]*\]|[(){}|*+?^$.]|\d+,?\d*/g, ' ').match(/[֐-׿ ]+/g) || ['']).join('').replace(/\s+/g, ' ').trim();
  const words = ['ילד', 'שלי', 'מדבר', 'הפסיק', 'פתאום', 'גמגום', 'בבית', 'הגן', 'אמא', 'אבא', 'מילים', 'קשה'];
  const r = prng(42);
  let natural = '';
  while (natural.length < n.heb) natural += words[Math.floor(r() * words.length)] + (r() < 0.1 ? '. ' : ' ');
  const out = {
    aleph_run: rep('א', n.heb) + '!',
    letter_space: rep('א ', n.heb) + '!',
    prefix_letters: rep('והשבכלמ ', n.heb),
    natural_hebrew: natural.slice(0, n.heb),
    spaces: rep(' ', n.ascii) + 'x',
    digits: rep('0', n.ascii) + 'x',
    digits_dashes: rep('05-', n.ascii),
    newlines: rep('א\n', n.heb),
  };
  if (literal.length >= 2) {
    const near = literal.slice(0, -1); // almost matches, then fails: classic backtracking trigger
    out.literal_near_miss = rep(near + ' ', n.heb);
    out.literal_glued = rep(near, n.heb);
  }
  return out;
}

// Masking adds identifier-shaped inputs at the full ASCII size: runs that match thousands of times (the
// replacement loop pays per match) and runs that almost match (separators, '+', '@', '.').
export function maskInputs(src, n = { heb: HEB_N, ascii: ASCII_N }) {
  const rep = (unit, len) => unit.repeat(Math.ceil(len / unit.length)).slice(0, len);
  return {
    ...adversarialInputs(src, n),
    digits_open: rep('0', n.ascii) + '!',
    digit_space: rep('0 ', n.ascii),
    phone_run: rep('050-1234567 ', n.ascii),
    plus_run: rep('+972 ', n.ascii),
    paren_digits: rep('(0', n.ascii),
    id_hebrew: rep('ת.ז 123456782 ', n.heb),
    email_run: rep('a@b.co ', n.ascii),
    at_run: rep('a@', n.ascii),
    dot_run: rep('a.', n.ascii),
    local_part_only: rep('a', n.ascii) + '@',
  };
}

// ---------- timing ----------
export function timeLinear(patterns) {
  const compiled = patterns.map((p) => ({ ...p, re: RE2JS.compile(p.regex) }));
  const results = [];
  const inputKeys = new Set();
  const perInputTotal = {};
  for (const p of compiled) {
    const inputs = adversarialInputs(p.regex);
    let worst = { ms: 0, input: '' };
    for (const [k, text] of Object.entries(inputs)) {
      inputKeys.add(k);
      const t0 = performance.now();
      p.re.matcher(text).find();
      const ms = performance.now() - t0;
      perInputTotal[k] = (perInputTotal[k] ?? 0) + ms;
      if (ms > worst.ms) worst = { ms, input: k };
    }
    results.push({ id: p.id, flag: p.flag, worstMs: worst.ms, worstInput: worst.input });
  }
  const worstTotal = Object.entries(perInputTotal).sort((a, b) => b[1] - a[1])[0] ?? ['-', 0];
  return { results, worstTotal: { input: worstTotal[0], ms: worstTotal[1] } };
}

// Masking timing: find-all, because the replacement loop visits every match (a pattern with tiny matches
// pays the per-match cost 32,000 times; a first-match timing would not see it).
export function timeMask(patterns, n = { heb: HEB_N, ascii: ASCII_N }) {
  const compiled = patterns.map((p) => ({ ...p, re: RE2JS.compile(p.regex) }));
  const results = [];
  const perInputTotal = {};
  let inputCount = 0;
  for (const p of compiled) {
    const inputs = maskInputs(p.regex, n);
    inputCount = Math.max(inputCount, Object.keys(inputs).length);
    let worst = { ms: 0, input: '' };
    for (const [k, text] of Object.entries(inputs)) {
      const t0 = performance.now();
      const m = p.re.matcher(text);
      while (m.find()) m.end();
      const ms = performance.now() - t0;
      perInputTotal[k] = (perInputTotal[k] ?? 0) + ms;
      if (ms > worst.ms) worst = { ms, input: k };
    }
    results.push({ id: p.id, worstMs: worst.ms, worstInput: worst.input });
  }
  const worstTotal = Object.entries(perInputTotal).sort((a, b) => b[1] - a[1])[0] ?? ['-', 0];
  return { results, inputCount, worstTotal: { input: worstTotal[0], ms: worstTotal[1] } };
}

// V8 timing runs in a worker so a catastrophic pattern is terminated instead of hanging CI.
// `inputs` overrides the generated adversarial set (used by the masking probe).
export function timeV8(pattern, n = V8_N, timeoutMs = BUDGETS.v8.workerTimeoutMs, inputsOverride = null) {
  const inputs = inputsOverride ?? adversarialInputs(pattern, { heb: n, ascii: n });
  const code = `
    const { parentPort, workerData } = require('node:worker_threads');
    const re = new RegExp(workerData.pattern, 'u');
    let worst = { ms: 0, input: '' };
    for (const [k, t] of Object.entries(workerData.inputs)) {
      const t0 = performance.now(); re.test(t); const ms = performance.now() - t0;
      if (ms > worst.ms) worst = { ms, input: k };
    }
    parentPort.postMessage(worst);`;
  return new Promise((resolveP) => {
    const w = new Worker(code, { eval: true, workerData: { pattern, inputs } });
    const timer = setTimeout(() => {
      w.terminate();
      resolveP({ timeout: true, ms: timeoutMs });
    }, timeoutMs);
    w.once('message', (m) => {
      clearTimeout(timer);
      w.terminate();
      resolveP(m);
    });
    w.once('error', (e) => {
      clearTimeout(timer);
      resolveP({ error: e.message });
    });
  });
}

// ---------- suite (used by run.mjs) ----------
const SELF_TEST = {
  linear: {
    bad: [String.raw`(א+)+ב`, String.raw`(?:\s*\S+)+$`, String.raw`(?:א|אב)*ג`, String.raw`(ב)\1`, String.raw`(?<!\p{L})לקות`, String.raw`(?=פתאום)פתאום`, String.raw`הפסיק[^.]{0,200}לדבר`, String.raw`(?:\S+\s+){0,3}לדבר`],
    good: [String.raw`חולשה ב(?:יד|רגל)`, String.raw`(?:^|\P{L})צניחת פנים`, String.raw`הפסיק[^.!?\n]{0,40}לדבר`, String.raw`[והשבכלמ]{0,2}לקות`, String.raw`מדבר (?:מעורפל|כבד)`, String.raw`(?:ה)?ילד(?:ה)?`],
  },
  v8: {
    bad: [String.raw`(א+)+ב`, String.raw`.*.*ב`, String.raw`(ב)\1`],
    good: [String.raw`(?<!\p{L})[והשבכלמ]{0,2}לקות(?!\p{L})`, String.raw`\p{Script=Hebrew}/\p{Script=Hebrew}`, 'אין צורך'],
  },
};

export async function runRegexSuite({ redFlagPatterns = [], testPhrases = [], outputRules = [], mask = MASK_REFERENCE }) {
  const lines = [];
  const failures = [];
  // self-test of the lint
  let selfOk = 0;
  let selfN = 0;
  for (const mode of ['linear', 'v8']) {
    for (const p of SELF_TEST[mode].bad) {
      selfN++;
      if (lintPattern(p, mode).length) selfOk++;
      else failures.push(`lint self-test: known-bad ${mode} pattern accepted: ${p}`);
    }
    for (const p of SELF_TEST[mode].good) {
      selfN++;
      const v = lintPattern(p, mode);
      if (!v.length) selfOk++;
      else failures.push(`lint self-test: known-good ${mode} pattern rejected: ${p} (${v.join('; ')})`);
    }
  }
  lines.push(`regex lint self-test: ${selfOk}/${selfN} (known-bad rejected, known-good accepted)`);

  // engine self-test: the classic catastrophic pattern is linear under re2js, and is caught (not hung) in v8 mode
  const cat = String.raw`(א+)+ב`;
  const t0 = performance.now();
  RE2JS.compile(cat).matcher('א'.repeat(HEB_N) + '!').find();
  const linMs = performance.now() - t0;
  const v8cat = await timeV8(cat);
  const v8caught = v8cat.timeout === true || (v8cat.ms ?? 0) > BUDGETS.v8.perPatternMs;
  lines.push(`engine self-test: ${cat} on ${HEB_N} chars: linear engine ${linMs.toFixed(1)} ms; V8 ${v8cat.timeout ? `killed after ${v8cat.ms} ms (timeout)` : `${(v8cat.ms ?? 0).toFixed(1)} ms`}`);
  if (linMs > BUDGETS.linear.perPatternMs) failures.push(`linear engine took ${linMs.toFixed(1)} ms on the catastrophic pattern (budget ${BUDGETS.linear.perPatternMs})`);
  if (!v8caught) failures.push('v8 harness did not catch the catastrophic pattern');

  // red-flag patterns (fixtures; content/red-flags.json when it exists)
  const uniq = [...new Map(redFlagPatterns.map((p) => [p.regex, p])).values()];
  let lintBad = 0;
  for (const p of uniq) {
    const v = lintPattern(p.regex, 'linear');
    if (v.length) {
      lintBad++;
      failures.push(`red-flag pattern ${p.flag}/${p.id} violates: ${v.join('; ')}`);
    }
  }
  lines.push(`red-flag patterns (linear mode): ${uniq.length - lintBad}/${uniq.length} pass lint P1-P4`);
  // P1 engine agreement: the linear engine and ECMAScript give the same answer on every test phrase
  const phrases = [...new Set(testPhrases)];
  let pairs = 0;
  for (const p of uniq) {
    let js, lin;
    try { js = new RegExp(p.regex, 'u'); lin = RE2JS.compile(p.regex); } catch { continue; }
    for (const ph of phrases) {
      pairs++;
      if (js.test(ph) !== lin.matcher(ph).find()) failures.push(`engines disagree: ${p.flag}/${p.id} on "${ph}"`);
    }
  }
  lines.push(`engine agreement (re2js vs ECMAScript u): ${pairs} pattern x phrase pairs checked`);
  const okForTiming = uniq.filter((p) => !lintPattern(p.regex, 'linear').some((x) => x.startsWith('P1')));
  if (okForTiming.length) {
    const t = timeLinear(okForTiming);
    const worst = t.results.sort((a, b) => b.worstMs - a.worstMs)[0];
    for (const r of t.results) if (r.worstMs > BUDGETS.linear.perPatternMs) failures.push(`red-flag pattern ${r.flag}/${r.id}: ${r.worstMs.toFixed(1)} ms on '${r.worstInput}' (per-pattern budget ${BUDGETS.linear.perPatternMs} ms)`);
    if (t.worstTotal.ms > BUDGETS.linear.totalMs) failures.push(`red-flag set: ${t.worstTotal.ms.toFixed(1)} ms on '${t.worstTotal.input}' (total budget ${BUDGETS.linear.totalMs} ms)`);
    lines.push(`red-flag timing (re2js, ${HEB_N} Hebrew / ${ASCII_N} ASCII chars, 8-10 adversarial inputs each): worst single pattern ${worst.worstMs.toFixed(1)} ms (${worst.flag}/${worst.id}, '${worst.worstInput}'); worst whole-set ${t.worstTotal.ms.toFixed(1)} ms ('${t.worstTotal.input}'); budgets ${BUDGETS.linear.perPatternMs}/${BUDGETS.linear.totalMs} ms`);
  }

  // masking (round 6, security round 3): linear mode like the red flags, timed find-all, own budget of the same size
  const mp = mask.patterns;
  let maskLintBad = 0;
  for (const p of mp) {
    const v = lintPattern(p.regex, 'linear');
    if (v.length) {
      maskLintBad++;
      failures.push(`masking pattern ${p.id} violates: ${v.join('; ')}`);
    }
  }
  lines.push(`masking patterns (linear mode, ${mask === MASK_REFERENCE ? 'reference set' : 'engine set'}): ${mp.length - maskLintBad}/${mp.length} pass lint P1-P4`);
  const maskOk = mp.filter((p) => !lintPattern(p.regex, 'linear').some((x) => x.startsWith('P1')));
  const maskPhrases = [...mask.phrases.candidate.map((t) => [t, true]), ...mask.phrases.none.map((t) => [t, false])];
  let mPairs = 0;
  let expOk = 0;
  for (const [ph, want] of maskPhrases) {
    let found = false;
    for (const p of maskOk) {
      mPairs++;
      const js = [...ph.matchAll(new RegExp(p.regex, 'gu'))].map((m) => m[0]);
      const lin = [];
      const m = RE2JS.compile(p.regex).matcher(ph);
      while (m.find()) lin.push(m.group());
      if (JSON.stringify(js) !== JSON.stringify(lin)) failures.push(`masking engines disagree: ${p.id} on "${ph}": ECMAScript ${JSON.stringify(js)} vs re2js ${JSON.stringify(lin)}`);
      if (lin.length) found = true;
    }
    if (found === want) expOk++;
    else failures.push(`masking ${want ? 'found no candidate in' : 'found a candidate in'} "${ph}"`);
  }
  lines.push(`masking engine agreement (every match, re2js vs ECMAScript u): ${mPairs} pattern x phrase pairs; expectations ${expOk}/${maskPhrases.length} (${mask.phrases.candidate.length} candidate, ${mask.phrases.none.length} none)`);
  if (maskOk.length) {
    const t = timeMask(maskOk);
    const worst = [...t.results].sort((a, b) => b.worstMs - a.worstMs)[0];
    for (const r of t.results) if (r.worstMs > BUDGETS.linear.perPatternMs) failures.push(`masking pattern ${r.id}: ${r.worstMs.toFixed(1)} ms on '${r.worstInput}' (per-pattern budget ${BUDGETS.linear.perPatternMs} ms)`);
    if (t.worstTotal.ms > BUDGETS.linear.totalMs) failures.push(`masking set: ${t.worstTotal.ms.toFixed(1)} ms on '${t.worstTotal.input}' (total budget ${BUDGETS.linear.totalMs} ms)`);
    lines.push(`masking timing (re2js find-all, ${HEB_N} Hebrew / ${ASCII_N} ASCII chars, ${t.inputCount} adversarial inputs each): worst single pattern ${worst.worstMs.toFixed(1)} ms (${worst.id}, '${worst.worstInput}'); worst whole-set ${t.worstTotal.ms.toFixed(1)} ms ('${t.worstTotal.input}'); budgets ${BUDGETS.linear.perPatternMs}/${BUDGETS.linear.totalMs} ms`);
  }
  // timing-net self-test: the security probe passes the lint, so only the timing can stop it
  const probeLint = [...lintPattern(mask.probe, 'linear'), ...lintPattern(mask.probe, 'v8')];
  const probeT = timeMask([{ id: 'probe', regex: mask.probe }]).results[0];
  const probeCaught = probeT.worstMs > BUDGETS.linear.perPatternMs;
  const probeV8 = await timeV8(mask.probe, 200, 1000, { digits_open_200: '0'.repeat(200) + '!' });
  lines.push(`masking timing-net self-test (security probe ${mask.probe}): lint ${probeLint.length ? 'rejects it' : 'passes it (P1-P5)'}; re2js ${probeT.worstMs.toFixed(1)} ms on '${probeT.worstInput}' vs budget ${BUDGETS.linear.perPatternMs} ms -> ${probeCaught ? 'caught' : 'NOT caught'}; V8 on 200 digits ${probeV8.timeout ? `killed after ${probeV8.ms} ms (timeout)` : probeV8.error ? `error ${probeV8.error}` : `${probeV8.ms.toFixed(1)} ms`}`);
  if (!probeCaught) failures.push(`masking timing net did not catch the security probe (${probeT.worstMs.toFixed(1)} ms, budget ${BUDGETS.linear.perPatternMs} ms)`);

  // output-rules (real content file)
  let orBad = 0;
  let orWorst = { ms: 0, id: '' };
  for (const r of outputRules) {
    const v = lintPattern(r.regex, 'v8');
    if (v.length) {
      orBad++;
      failures.push(`output-rules ${r.id} violates: ${v.join('; ')}`);
      continue;
    }
    const t = await timeV8(r.regex);
    if (t.timeout || t.error) failures.push(`output-rules ${r.id}: ${t.timeout ? 'timeout' : t.error}`);
    else {
      if (t.ms > orWorst.ms) orWorst = { ms: t.ms, id: r.id, input: t.input };
      if (t.ms > BUDGETS.v8.perPatternMs) failures.push(`output-rules ${r.id}: ${t.ms.toFixed(1)} ms (budget ${BUDGETS.v8.perPatternMs} ms)`);
    }
  }
  lines.push(`output-rules.json (v8 mode, ${V8_N} chars): ${outputRules.length - orBad}/${outputRules.length} pass lint P1-P5; worst ${orWorst.ms.toFixed(2)} ms (${orWorst.id || '-'}${orWorst.input ? `, '${orWorst.input}'` : ''}), budget ${BUDGETS.v8.perPatternMs} ms`);
  return { lines, failures };
}
