import io, json, re, sys

import os
base = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
J = json.load(io.open(base + r'\content\texts.he.json', encoding='utf-8'))['texts']
p = base + r'\ui\mockup.html'
s = io.open(p, encoding='utf-8').read()
print('loaded', len(J), len(s), flush=True)

a = s.index('const T = {')
b = s.index('\n};', a) + 3
block = s[a:b]
print('block', a, b, flush=True)

pat = re.compile(r"'([a-z0-9_.]+)':`([^`]*)`")


def js(t):
    t = t.replace('{{hadas_phone}}', '\x00')
    if '{{' in t:
        return None
    return t.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${').replace('\x00', '${PHONE}')


changed, skipped = [], []


def rep(m):
    i, v = m.group(1), m.group(2)
    e = J.get(i)
    if not e or 'text' not in e or e.get('active') is False or e.get('variants'):
        return m.group(0)
    n = js(e['text'])
    if n is None:
        skipped.append(i)
        return m.group(0)
    if n != v:
        changed.append(i)
        return "'%s':`%s`" % (i, n)
    return m.group(0)


nb = pat.sub(rep, block)
present = {x[0] for x in pat.findall(nb)}
add = []
for i in ['reporter.copy_failed', 'a11y.call_hadas', 'page.header.logo.a11y']:
    if i not in present and i in J:
        add.append(" '%s':`%s`," % (i, js(J[i]['text'])))
if add:
    nb = nb.replace('const T = {', 'const T = {\n' + '\n'.join(add), 1)
s = s[:a] + nb + s[b:]
s = s.replace("NOT in texts.he.json yet, so shown as [טקסט חסר]:",
              "(T synced from texts.he.json by the manager's script, 2026-10-06; see HANDOFF_LOG row 139):", 1)
io.open(p, 'w', encoding='utf-8').write(s)
print('changed', len(changed), changed, flush=True)
print('added', [x.split("'")[1] for x in add], flush=True)
print('skipped', skipped, flush=True)
