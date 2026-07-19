const supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

const ORG_CODE = 'zhurek2026';

async function loadEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*, signups(id, name)')
    .order('date', { ascending: true });

  if (error) return showMsg('events', 'Ошибка загрузки: ' + error.message, true);

  const container = document.getElementById('events');
  if (!data || data.length === 0) {
    container.innerHTML = '<div class="card"><p>Нет событий. Координатор ещё ничего не добавил.</p></div>';
    return;
  }

  container.innerHTML = data.map(ev => `
    <div class="card">
      <h3>${esc(ev.title)}</h3>
      <div class="meta">
        <span>${esc(ev.city)}</span>
        <span>${fmtDate(ev.date)}</span>
        <span class="cat">${esc(ev.category)}</span>
        ${ev.spots ? `<span>Мест: ${ev.spots}</span>` : ''}
      </div>
      <p class="desc">${esc(ev.description)}</p>
      <p class="signups">Записалось: ${ev.signups.length}</p>
      <button class="btn" onclick="toggleSignup(${ev.id})">Записаться</button>
      <div class="signup-form" id="signup-${ev.id}">
        <input placeholder="Ваше имя" id="name-${ev.id}" required>
        <input placeholder="Email или телефон" id="contact-${ev.id}" required>
        <button class="btn btn-small" onclick="doSignup(${ev.id})">Подтвердить</button>
        <span id="signupMsg-${ev.id}"></span>
      </div>
    </div>
  `).join('');
}

function toggleSignup(eventId) {
  const el = document.getElementById('signup-' + eventId);
  el.classList.toggle('open');
}

async function doSignup(eventId) {
  const name = document.getElementById('name-' + eventId).value.trim();
  const contact = document.getElementById('contact-' + eventId).value.trim();
  if (!name || !contact) return;

  const { error } = await supabase.from('signups').insert({ event_id: eventId, name, contact });
  if (error) {
    document.getElementById('signupMsg-' + eventId).innerHTML = '<span class="msg msg-err">Ошибка: ' + error.message + '</span>';
    return;
  }
  document.getElementById('signupMsg-' + eventId).innerHTML = '<span class="msg msg-ok">Вы записаны!</span>';
  document.getElementById('name-' + eventId).value = '';
  document.getElementById('contact-' + eventId).value = '';
  setTimeout(loadEvents, 1000);
}

function toggleCoordinator() {
  document.getElementById('coordinatorForm').classList.toggle('hidden');
}

async function addEvent(e) {
  e.preventDefault();

  const code = document.getElementById('evCode').value.trim();
  if (code !== ORG_CODE) {
    showMsg('evMsg', 'Неверный код организатора', true);
    return;
  }

  const event = {
    title: document.getElementById('evTitle').value.trim(),
    city: document.getElementById('evCity').value.trim(),
    date: document.getElementById('evDate').value,
    category: document.getElementById('evCategory').value,
    description: document.getElementById('evDesc').value.trim(),
    spots: parseInt(document.getElementById('evSpots').value) || 20,
  };

  const { error } = await supabase.from('events').insert(event);
  if (error) {
    showMsg('evMsg', 'Ошибка: ' + error.message, true);
    return;
  }

  showMsg('evMsg', 'Событие добавлено!', false);
  document.getElementById('addEventForm').reset();
  document.getElementById('coordinatorForm').classList.add('hidden');
  loadEvents();
}

async function sendFeedback(e) {
  e.preventDefault();

  const fb = {
    name: document.getElementById('fbName').value.trim(),
    role: document.getElementById('fbRole').value.trim(),
    rating: parseInt(document.getElementById('fbRating').value),
    text: document.getElementById('fbText').value.trim(),
  };

  const { error } = await supabase.from('feedback').insert(fb);
  if (error) {
    showMsg('fbMsg', 'Ошибка: ' + error.message, true);
    return;
  }

  showMsg('fbMsg', 'Спасибо за отзыв!', false);
  document.getElementById('feedbackForm').reset();
}

function showMsg(id, text, isErr) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = `<div class="msg ${isErr ? 'msg-err' : 'msg-ok'}">${text}</div>`;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

loadEvents();
