import { readFileSync } from 'fs';

const app = readFileSync('app.js', 'utf-8');
const html = readFileSync('index.html', 'utf-8');
const config = readFileSync('config.js', 'utf-8');
const url = config.match(/SUPABASE_URL\s*=\s*"([^"]+)"/)[1];
const key = config.match(/SUPABASE_ANON_KEY\s*=\s*"([^"]+)"/)[1];

const h = { apikey: key, Authorization: 'Bearer ' + key };
let errors = 0;
let warnings = 0;
function check(ok, msg) { if (!ok) { console.error('FAIL:', msg); errors++; } else { console.log('OK:', msg); } }
function warn(ok, msg) { if (!ok) { console.warn('WARN:', msg); warnings++; } else { console.log('OK:', msg); } }

// 1. GET events
const r1 = await fetch(url + '/rest/v1/events?select=*', { headers: h });
check(r1.status === 200, `GET events → ${r1.status}`);
const events = await r1.json();
check(Array.isArray(events) && events.length > 0, `events: ${events.length} rows`);

// 2. Write-flow contract checks stay local: tests must never pollute production data.
check(app.includes("from('signups').insert"), 'signup insert flow exists');
check(app.includes("from('feedback').insert"), 'feedback insert flow exists');
check(app.includes('volunteer_hours'), 'verified volunteer hours flow exists');
check(app.includes("status:'no_show'"), 'no-show flow exists');

// 4. Static id cross-check (all getElementById ids exist in index.html)
const idRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
const ids = [...new Set([...app.matchAll(idRegex)].map(m => m[1]))];
const dynamic = /^(name|contact|signup|signupMsg|signupBtn|hours|ev)-/;
for (const id of ids) {
  if (dynamic.test(id)) continue;
  check(html.includes(`id="${id}"`), `index.html has id="${id}"`);
}

// 5. i18n key parity check (extract each T dict block and compare keys)
const blockStarts = ['ru', 'kz', 'en'].map(lang => app.indexOf(lang + ': {'));
const blockEnds = blockStarts.slice(1).concat([app.indexOf('};', blockStarts[blockStarts.length - 1])]);
const blocks = blockStarts.map((start, i) => {
  if (start === -1) return [];
  const block = app.slice(start, blockEnds[i]);
  return [...new Set([...block.matchAll(/\b([a-z_][a-z0-9_]*):\s*['"]/g)].map(m => m[1]))];
});
const [ru, kz, en] = blocks;
for (const k of [...new Set([...ru, ...kz, ...en])]) {
  check(ru.includes(k) && kz.includes(k) && en.includes(k), `i18n key parity: ${k}`);
}

console.log(errors ? `\n${errors} ошибок` : '\nВсе проверки пройдены');
if (warnings) console.log(`${warnings} предупреждений`);
process.exit(errors ? 1 : 0);
