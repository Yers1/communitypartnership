var supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
var ORG_CODE = 'zhurek2026';

var EVENTS = [];
var CITY = 'all';
var isCoord = sessionStorage.getItem('coord') === '1';
var lang = localStorage.getItem('lang') || 'ru';

var T = {
  ru: {
    tagline: 'Корпоративное волонтёрство Chevron в Казахстане',
    about_title: 'Employee Volunteer Program — NVS & Zhurekten Zhurekke.',
    about_text: 'Субботники, посадка деревьев, поддержка детей с инвалидностью и из малообеспеченных семей. Города: Астана, Алматы, Атырау. Выберите событие и запишитесь в 1 клик.',
    coordinator_btn: 'Я координатор',
    coord_title: 'Добавить событие',
    title_lbl: 'Название',
    city_lbl: 'Город',
    date_lbl: 'Дата',
    category_lbl: 'Категория',
    desc_lbl: 'Описание',
    spots_lbl: 'Мест',
    code_lbl: 'Код организатора',
    add_btn: 'Добавить событие',
    dash_btn: 'Панель координатора',
    feedback_title: 'Оставить отзыв о платформе',
    name_lbl: 'Имя',
    role_lbl: 'Роль',
    role_ph: 'сотрудник, координатор, волонтёр',
    rating_lbl: 'Оценка',
    text_lbl: 'Комментарий',
    send_btn: 'Отправить',
    footer: 'Employee Volunteer Program: NVS \u0026 Zhurekten Zhurekke \u00b7 2026',
    all: 'Все',
    signup: 'Записаться',
    signed: 'Записалось',
    left: 'Осталось',
    from: 'из',
    no_spots: 'Мест нет',
    share: 'Поделиться',
    copied: 'Скопировано',
    your_name: 'Ваше имя',
    email_phone: 'Email или телефон',
    confirm: 'Подтвердить',
    signed_up: 'Вы записаны!',
    feedback_ok: 'Спасибо за отзыв!',
    event_added: 'Событие добавлено!',
    wrong_code: 'Неверный код организатора',
    load_err: 'Ошибка загрузки',
    no_events: 'Нет событий. Координатор ещё ничего не добавил.',
    events_count: 'событий',
    volunteers: 'волонтёров записалось',
    spots_free: 'мест свободно',
    spots: 'Мест',
    copy_list: 'Скопировать список',
    logout: 'Выйти',
    name_hdr: 'Имя',
    contact_hdr: 'Контакт',
    participants: 'Участники',
    cat_Экология: 'Экология', cat_Дети: 'Дети', cat_Образование: 'Образование', cat_Здоровье: 'Здоровье',
    rating_5: '5 — отлично', rating_4: '4 — хорошо', rating_3: '3 — средне', rating_2: '2 — плохо', rating_1: '1 — очень плохо'
  },
  kz: {
    tagline: 'Chevron компаниясының Қазақстандағы корпоративтік волонтерлігі',
    about_title: 'Employee Volunteer Program — NVS & Zhurekten Zhurekke.',
    about_text: 'Сенбіліктер, ағаш отырғызу, мүгедек және аз қамтылған балаларға қолдау. Қалалар: Астана, Алматы, Атырау. Іс-шараны таңдап, 1 басумен тіркеліңіз.',
    coordinator_btn: 'Мен координатормын',
    coord_title: 'Іс-шара қосу',
    title_lbl: 'Атауы',
    city_lbl: 'Қала',
    date_lbl: 'Күні',
    category_lbl: 'Санаты',
    desc_lbl: 'Сипаттамасы',
    spots_lbl: 'Орын',
    code_lbl: 'Ұйымдастырушы коды',
    add_btn: 'Іс-шара қосу',
    dash_btn: 'Координатор панелі',
    feedback_title: 'Платформа туралы пікір қалдыру',
    name_lbl: 'Аты',
    role_lbl: 'Рөлі',
    role_ph: 'қызметкер, координатор, волонтер',
    rating_lbl: 'Баға',
    text_lbl: 'Пікір',
    send_btn: 'Жіберу',
    footer: 'Employee Volunteer Program: NVS \u0026 Zhurekten Zhurekke \u00b7 2026',
    all: 'Барлығы',
    signup: 'Тіркелу',
    signed: 'Тіркелген',
    left: 'Қалды',
    from: 'ішінде',
    no_spots: 'Орын жоқ',
    share: 'Бөлісу',
    copied: 'Көшірілді',
    your_name: 'Атыңыз',
    email_phone: 'Email немесе телефон',
    confirm: 'Растау',
    signed_up: 'Сіз тіркелдіңіз!',
    feedback_ok: 'Пікіріңізге рахмет!',
    event_added: 'Іс-шара қосылды!',
    wrong_code: 'Ұйымдастырушы коды қате',
    load_err: 'Жүктеу қатесі',
    no_events: 'Іс-шара әзірге жоқ',
    events_count: 'іс-шара',
    volunteers: 'волонтер тіркелді',
    spots_free: 'бос орын',
    spots: 'Орын',
    copy_list: 'Тізімді көшіру',
    logout: 'Шығу',
    name_hdr: 'Аты',
    contact_hdr: 'Байланыс',
    participants: 'Қатысушылар',
    cat_Экология: 'Экология', cat_Дети: 'Балалар', cat_Образование: 'Білім', cat_Здоровье: 'Денсаулық',
    rating_5: '5 — өте жақсы', rating_4: '4 — жақсы', rating_3: '3 — орташа', rating_2: '2 — нашар', rating_1: '1 — өте нашар'
  }
};

function t(key) { return T[lang][key] || key; }

function toggleLang() {
  setLang(lang === 'ru' ? 'kz' : 'ru');
}

function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  setLangStatic();
  render();
  document.getElementById('langToggle').textContent = lang === 'ru' ? 'ҚАЗ' : 'РУС';
}

function setLangStatic() {
  var map = {
    'lang-tag': 'tagline', 'lang-about-title': 'about_title', 'lang-about-text': 'about_text',
    'lang-coord-btn': 'coordinator_btn', 'lang-coord-title': 'coord_title',
    'lang-lbl-title': 'title_lbl', 'lang-lbl-city': 'city_lbl', 'lang-lbl-date': 'date_lbl',
    'lang-lbl-cat': 'category_lbl', 'lang-lbl-desc': 'desc_lbl', 'lang-lbl-spots': 'spots_lbl',
    'lang-lbl-code': 'code_lbl', 'lang-btn-add': 'add_btn', 'lang-dash-btn': 'dash_btn',
    'lang-fb-title': 'feedback_title', 'lang-lbl-name': 'name_lbl', 'lang-lbl-role': 'role_lbl',
    'lang-lbl-rating': 'rating_lbl', 'lang-lbl-text': 'text_lbl', 'lang-btn-send': 'send_btn',
    'lang-footer': 'footer'
  };
  for (var id in map) {
    var el = document.getElementById(id);
    if (el) el.textContent = T[lang][map[id]];
  }
  document.getElementById('fbRole').placeholder = T[lang].role_ph;
  document.querySelectorAll('#evCategory option').forEach(function(o) { o.textContent = T[lang]['cat_' + o.value] || o.value; });
  document.querySelectorAll('#fbRating option').forEach(function(o) { o.textContent = T[lang]['rating_' + o.value] || o.value; });
}

function renderStats() {
  var total = EVENTS.length;
  var signed = EVENTS.reduce(function(s, e) { return s + e.signups.length; }, 0);
  var free = EVENTS.reduce(function(s, e) { return s + Math.max(0, (e.spots || 0) - e.signups.length); }, 0);
  document.getElementById('stats').innerHTML =
    '<div class="stat"><b>' + total + '</b><span>' + t('events_count') + '</span></div>' +
    '<div class="stat"><b>' + signed + '</b><span>' + t('volunteers') + '</span></div>' +
    '<div class="stat"><b>' + free + '</b><span>' + t('spots_free') + '</span></div>';
}

function renderFilters() {
  var cities = EVENTS.map(function(e) { return e.city; });
  var unique = ['all'];
  cities.forEach(function(c) { if (unique.indexOf(c) === -1) unique.push(c); });
  var html = unique.map(function(c) {
    return '<button class="' + (CITY === c ? 'active' : '') + '" onclick="CITY=\'' + esc(c) + '\';render()">' + (c === 'all' ? t('all') : esc(c)) + '</button>';
  }).join('');
  document.getElementById('filters').innerHTML = html;
}

function renderEvents() {
  var filtered = CITY === 'all' ? EVENTS : EVENTS.filter(function(e) { return e.city === CITY; });
  var locale = lang === 'kz' ? 'kk-KZ' : 'ru-RU';
  var html;
  if (!filtered.length) {
    html = '<div class="card"><p>' + t('no_events') + '</p></div>';
  } else {
    html = filtered.map(function(e) {
      var signed = e.signups.length;
      var left = Math.max(0, (e.spots || 0) - signed);
      var full = left <= 0;
      return '<div class="card" id="ev-' + e.id + '">' +
        '<h3>' + esc(e.title) + '</h3>' +
        '<div class="meta"><span>' + esc(e.city) + '</span><span>' + new Date(e.date).toLocaleDateString(locale, {day:'numeric', month:'long', year:'numeric'}) + '</span>' +
        '<span class="cat">' + (T[lang]['cat_' + e.category] || e.category) + '</span><span>' + t('spots') + ': ' + e.spots + '</span></div>' +
        '<p class="desc">' + esc(e.description) + '</p>' +
        '<p class="signups">' + t('signed') + ': ' + signed + ' \u00b7 ' + t('left') + ': ' + left + ' ' + t('from') + ' ' + e.spots + '</p>' +
        (full ? '<p class="full">' + t('no_spots') + '</p>' : '') +
        '<button class="btn" ' + (full ? 'disabled' : '') + ' onclick="toggleSignup(' + e.id + ')">' + t('signup') + '</button>' +
        '<button class="btn-share" onclick="shareEvent(' + e.id + ')">\ud83d\udd17 ' + t('share') + '</button>' +
        '<div class="signup-form" id="signup-' + e.id + '">' +
        '<input placeholder="' + t('your_name') + '" id="name-' + e.id + '">' +
        '<input placeholder="' + t('email_phone') + '" id="contact-' + e.id + '">' +
        '<button class="btn btn-small" onclick="doSignup(' + e.id + ')">' + t('confirm') + '</button>' +
        '<span id="signupMsg-' + e.id + '"></span></div></div>';
    }).join('');
  }
  document.getElementById('events').innerHTML = html;
}

function renderDash() {
  document.getElementById('dashBtn').classList.toggle('hidden', !isCoord);
  if (!isCoord) { document.getElementById('dashboard').classList.add('hidden'); return; }
  var html = '';
  EVENTS.forEach(function(e) {
    html += '<div class="card"><h3>' + esc(e.title) + ' — ' + t('participants') + ': ' + e.signups.length + '</h3>';
    if (e.signups.length) {
      html += '<table><tr><th>' + t('name_hdr') + '</th><th>' + t('contact_hdr') + '</th></tr>' +
        e.signups.map(function(s) { return '<tr><td>' + esc(s.name) + '</td><td>' + esc(s.contact) + '</td></tr>'; }).join('') + '</table>';
    } else {
      html += '<p style="color:#999;font-size:0.85em">' + t('no_events') + '</p>';
    }
    html += '<button class="btn btn-small" style="margin-top:8px" onclick="copyList(' + e.id + ')">' + t('copy_list') + '</button></div>';
  });
  html += '<button class="btn btn-outline" style="margin-top:12px" onclick="logoutCoord()">' + t('logout') + '</button>';
  document.getElementById('dashboard').innerHTML = html;
}

function render() { renderStats(); renderFilters(); renderEvents(); renderDash(); }

function toggleSignup(id) {
  document.getElementById('signup-' + id).classList.toggle('open');
}

async function doSignup(id) {
  var name = document.getElementById('name-' + id).value.trim();
  var contact = document.getElementById('contact-' + id).value.trim();
  if (!name || !contact) return;
  var _a, _b = await supabase.from('signups').insert({event_id: id, name: name, contact: contact});
  if (_b.error) { document.getElementById('signupMsg-' + id).innerHTML = '<span class="msg msg-err">' + _b.error.message + '</span>'; return; }
  document.getElementById('signupMsg-' + id).innerHTML = '<span class="msg msg-ok">' + t('signed_up') + '</span>';
  document.getElementById('name-' + id).value = '';
  document.getElementById('contact-' + id).value = '';
  loadEvents();
}

function toggleCoordinator() { document.getElementById('coordinatorForm').classList.toggle('hidden'); }

async function addEvent(e) {
  e.preventDefault();
  var code = document.getElementById('evCode').value.trim();
  if (code !== ORG_CODE) { evMsg(t('wrong_code'), true); return; }
  var ev = {
    title: document.getElementById('evTitle').value.trim(),
    city: document.getElementById('evCity').value.trim(),
    date: document.getElementById('evDate').value,
    category: document.getElementById('evCategory').value,
    description: document.getElementById('evDesc').value.trim(),
    spots: parseInt(document.getElementById('evSpots').value) || 20
  };
  var _a, _b = await supabase.from('events').insert(ev);
  if (_b.error) { evMsg(_b.error.message, true); return; }
  isCoord = true;
  sessionStorage.setItem('coord', '1');
  evMsg(t('event_added'), false);
  document.getElementById('addEventForm').reset();
  document.getElementById('coordinatorForm').classList.add('hidden');
  loadEvents();
}

async function sendFeedback(e) {
  e.preventDefault();
  var fb = {
    name: document.getElementById('fbName').value.trim(),
    role: document.getElementById('fbRole').value.trim(),
    rating: parseInt(document.getElementById('fbRating').value),
    text: document.getElementById('fbText').value.trim()
  };
  var _a, _b = await supabase.from('feedback').insert(fb);
  if (_b.error) { showMsg('fbMsg', _b.error.message, true); return; }
  showMsg('fbMsg', t('feedback_ok'), false);
  document.getElementById('feedbackForm').reset();
}

function evMsg(text, isErr) { showMsg('evMsg', text, isErr); }

function showMsg(id, text, isErr) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = '<div class="msg ' + (isErr ? 'msg-err' : 'msg-ok') + '">' + text + '</div>';
}

function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

function shareEvent(id) {
  var url = location.origin + location.pathname + '#ev-' + id;
  navigator.clipboard.writeText(url).then(function() { alert(t('copied')); });
}

function copyList(eventId) {
  var ev = EVENTS.find(function(e) { return e.id === eventId; });
  if (!ev) return;
  var lines = [ev.title, ''];
  ev.signups.forEach(function(s) { lines.push(s.name + ' — ' + s.contact); });
  navigator.clipboard.writeText(lines.join('\n')).then(function() { alert(t('copied')); });
}

function toggleDash() { document.getElementById('dashboard').classList.toggle('hidden'); }

function logoutCoord() { sessionStorage.removeItem('coord'); isCoord = false; render(); }

async function loadEvents() {
  var _a, _b = await supabase.from('events').select('*, signups(id,name,contact)').order('date', {ascending: true});
  if (_b.error) { document.getElementById('events').innerHTML = '<div class="card"><p class="msg-err">' + t('load_err') + ': ' + _b.error.message + '</p></div>'; return; }
  EVENTS = _b.data || [];
  render();
  if (location.hash) {
    setTimeout(function() {
      var el = document.getElementById(location.hash.slice(1));
      if (el) { el.scrollIntoView({behavior:'smooth'}); el.classList.add('hl'); }
    }, 300);
  }
}

function init() {
  document.getElementById('langToggle').textContent = lang === 'ru' ? 'ҚАЗ' : 'РУС';
  setLangStatic();
  loadEvents();
}

init();
