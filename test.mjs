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

// 2. POST signup
const r2 = await fetch(url + '/rest/v1/signups', {
  method: 'POST', headers: { ...h, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
  body: JSON.stringify({ event_id: events[0].id, name: 'тест', contact: 'test@test.kz' }),
});
check(r2.status === 201, `POST signup → ${r2.status}`);

// 3. POST feedback
const r3 = await fetch(url + '/rest/v1/feedback', {
  method: 'POST', headers: { ...h, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
  body: JSON.stringify({ name: 'тест', role: 'тест', rating: 5, text: 'тестовый отзыв' }),
});
check(r3.status === 201, `POST feedback → ${r3.status}`);

// 4. Static id cross-check (all getElementById ids exist in index.html)
const idRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
const ids = [...new Set([...app.matchAll(idRegex)].map(m => m[1]))];
const dynamic = /^(name|contact|signup|signupMsg|signupBtn|ev)-/;
for (const id of ids) {
  if (dynamic.test(id)) continue;
  check(html.includes(`id="${id}"`), `index.html has id="${id}"`);
}

// 5. DELETE check (optional, warning only)
const r4 = await fetch(url + '/rest/v1/signups?event_id=eq.0&contact=eq.test@example.com', {
  method: 'DELETE', headers: { ...h, Prefer: 'return=minimal' }
});
warn(r4.status === 204, `DELETE policy check → ${r4.status} (204=ok, other=отмена не включена)`);

console.log(errors ? `\n${errors} ошибок` : '\nВсе проверки пройдены');
if (warnings) console.log(`${warnings} предупреждений`);
process.exit(errors ? 1 : 0);
