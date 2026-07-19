var supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
var ORG_CODE = 'zhurek2026';

var EVENTS = [];
var CITY = 'all';
var CITIES = ['all'];
var isCoord = sessionStorage.getItem('coord') === '1';
var lang = localStorage.getItem('lang') || 'ru';
var today = new Date().toISOString().slice(0, 10);

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
    csv_btn: 'Скачать CSV',
    cal_btn: 'В календарь',
    cert_btn: 'Сертификат',
    cert_title: 'Сертификат',
    cert_for: 'за участие в',
    cert_name: 'награждается',
    cert_event: 'волонтёрском мероприятии',
    logout: 'Выйти',
    name_hdr: 'Имя',
    contact_hdr: 'Контакт',
    participants: 'Участники',
    wa_btn: 'WhatsApp',
    tg_btn: 'Telegram',
    passport_title: 'Мои записи',
    passport_btn: 'Мои записи',
    passport_contact: 'Email или телефон',
    passport_hours: 'часов волонтёрства',
    top_title: 'Топ волонтёров',
    already_signed: 'Вы уже записаны на это событие',
    cancel_btn: 'Отменить',
    past: 'Событие прошло',
    net_err: 'Нет соединения. Проверьте интернет.',
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
    csv_btn: 'CSV жүктеу',
    cal_btn: 'Күнтізбеге',
    cert_btn: 'Сертификат',
    cert_title: 'Сертификат',
    cert_for: 'қатысқаны үшін',
    cert_name: 'марапатталады',
    cert_event: 'волонтерлік шарада',
    logout: 'Шығу',
    name_hdr: 'Аты',
    contact_hdr: 'Байланыс',
    participants: 'Қатысушылар',
    wa_btn: 'WhatsApp',
    tg_btn: 'Telegram',
    passport_title: 'Менің тіркелуім',
    passport_btn: 'Менің тіркелуім',
    passport_contact: 'Email немесе телефон',
    passport_hours: 'волонтерлік сағат',
    top_title: 'Үздік волонтерлер',
    already_signed: 'Сіз бұл іс-шараға тіркелгенсіз',
    cancel_btn: 'Болдырмау',
    past: 'Іс-шара өтті',
    net_err: 'Байланыс жоқ. Интернетті тексеріңіз.',
    cat_Экология: 'Экология', cat_Дети: 'Балалар', cat_Образование: 'Білім', cat_Здоровье: 'Денсаулық',
    rating_5: '5 — өте жақсы', rating_4: '4 — жақсы', rating_3: '3 — орташа', rating_2: '2 — нашар', rating_1: '1 — өте нашар'
  }
};

function t(key) { return T[lang][key] || key; }
function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return esc(s).replace(/"/g, '\u0026quot;').replace(/'/g, '\u0026#39;'); }
function fmtDate(d) { return new Date(d).toLocaleDateString(lang === 'kz' ? 'kk-KZ' : 'ru-RU', {day:'numeric', month:'long', year:'numeric'}); }
function showMsg(id, text, isErr) { var el = document.getElementById(id); if (el) el.innerHTML = '<div class="msg ' + (isErr ? 'msg-err' : 'msg-ok') + '">' + text + '</div>'; }
function evMsg(text, isErr) { showMsg('evMsg', text, isErr); }
function netMsg(id) { showMsg(id, t('net_err'), true); }

function toggleLang() { setLang(lang === 'ru' ? 'kz' : 'ru'); }
function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru';
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
    'lang-footer': 'footer', 'lang-passport-title': 'passport_title', 'lang-passport-btn': 'passport_btn',
    'lang-top-title': 'top_title'
  };
  for (var id in map) { var el = document.getElementById(id); if (el) el.textContent = T[lang][map[id]]; }
  document.getElementById('fbRole').placeholder = T[lang].role_ph;
  document.getElementById('ppContact').placeholder = T[lang].passport_contact;
  document.querySelectorAll('#evCategory option').forEach(function(o) { o.textContent = T[lang]['cat_' + o.value] || o.value; });
  document.querySelectorAll('#fbRating option').forEach(function(o) { o.textContent = T[lang]['rating_' + o.value] || o.value; });
}

function setBtnDisabled(form, disabled) { var btn = form.querySelector('button[type="submit"]'); if (btn) btn.disabled = disabled; }
function setElementDisabled(el, disabled) { if (el) el.disabled = disabled; }

function renderStats() {
  var total = EVENTS.length;
  var signed = EVENTS.reduce(function(s, e) { return s + e.signups.length; }, 0);
  var free = EVENTS.reduce(function(s, e) { return s + Math.max(0, (e.spots || 0) - e.signups.length); }, 0);
  document.getElementById('stats').innerHTML =
    '<div class="stat"><b>' + total + '</b><span>' + t('events_count') + '</span></div>' +
    '<div class="stat"><b>' + signed + '</b><span>' + t('volunteers') + '</span></div>' +
    '<div class="stat"><b>' + free + '</b><span>' + t('spots_free') + '</span></div>';
}

function setCity(i) { CITY = CITIES[i]; render(); }
function renderFilters() {
  CITIES = ['all'];
  EVENTS.forEach(function(e) { if (CITIES.indexOf(e.city) === -1) CITIES.push(e.city); });
  var html = CITIES.map(function(c, i) {
    return '<button class="' + (CITY === c ? 'active' : '') + '" onclick="setCity(' + i + ')">' + (c === 'all' ? t('all') : esc(c)) + '</button>';
  }).join('');
  document.getElementById('filters').innerHTML = html;
}

function renderEvents() {
  var locale = lang === 'kz' ? 'kk-KZ' : 'ru-RU';
  var sorted = EVENTS.slice().sort(function(a, b) {
    var fa = a.date < today, fb = b.date < today;
    if (fa !== fb) return fa ? 1 : -1;
    return fa ? (b.date > a.date ? 1 : -1) : (a.date > b.date ? 1 : -1);
  });
  var filtered = CITY === 'all' ? sorted : sorted.filter(function(e) { return e.city === CITY; });
  var html;
  if (!filtered.length) {
    html = '<div class="card"><p>' + t('no_events') + '</p></div>';
  } else {
    html = filtered.map(function(e) {
      var signed = e.signups.length;
      var left = Math.max(0, (e.spots || 0) - signed);
      var full = left <= 0;
      var past = e.date < today;
      var url = location.origin + location.pathname + '#ev-' + e.id;
      return '<div class="card' + (past ? ' past' : '') + '" id="ev-' + e.id + '">' +
        '<h3>' + esc(e.title) + '</h3>' +
        '<div class="meta"><span>' + esc(e.city) + '</span><span>' + fmtDate(e.date) + '</span>' +
        '<span class="cat">' + esc(T[lang]['cat_' + e.category] || e.category) + '</span><span>' + t('spots') + ': ' + e.spots + '</span></div>' +
        '<p class="desc">' + esc(e.description) + '</p>' +
        '<p class="signups">' + t('signed') + ': ' + signed + ' \u00b7 ' + t('left') + ': ' + left + ' ' + t('from') + ' ' + e.spots + '</p>' +
        (past ? '<p class="full">' + t('past') + '</p>' : '') +
        (full && !past ? '<p class="full">' + t('no_spots') + '</p>' : '') +
        '<div class="share-row">' +
          '<button class="btn" ' + (full || past ? 'disabled' : '') + ' onclick="toggleSignup(' + e.id + ')">' + (past ? t('past') : t('signup')) + '</button>' +
          '<button class="btn-share" onclick="shareEvent(' + e.id + ')">\ud83d\udd17 ' + t('share') + '</button>' +
          '<button class="btn-wa" onclick="shareWA(' + e.id + ')">' + t('wa_btn') + '</button>' +
          '<button class="btn-tg" onclick="shareTG(' + e.id + ')">' + t('tg_btn') + '</button>' +
          '<button class="btn-cal" onclick="downloadICS(' + e.id + ')">\ud83d\udcc5 ' + t('cal_btn') + '</button>' +
        '</div>' +
        '<div class="signup-form" id="signup-' + e.id + '">' +
          '<input placeholder="' + escAttr(t('your_name')) + '" id="name-' + e.id + '">' +
          '<input placeholder="' + escAttr(t('email_phone')) + '" id="contact-' + e.id + '">' +
          '<button class="btn btn-small" id="signupBtn-' + e.id + '" onclick="doSignup(' + e.id + ')">' + t('confirm') + '</button>' +
          '<span id="signupMsg-' + e.id + '"></span>' +
        '</div>' +
      '</div>';
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
    html += '<div class="share-row">' +
      '<button class="btn btn-small" onclick="copyList(' + e.id + ')">' + t('copy_list') + '</button>' +
      '<button class="btn btn-small" onclick="downloadCSV(' + e.id + ')">' + t('csv_btn') + '</button>' +
      '</div></div>';
  });
  html += '<button class="btn btn-outline" style="margin-top:12px" onclick="logoutCoord()">' + t('logout') + '</button>';
  document.getElementById('dashboard').innerHTML = html;
}

function renderPassport() { /* content generated on lookup */ }
function renderTop() {
  var map = {};
  EVENTS.forEach(function(e) { e.signups.forEach(function(s) { var n = s.name.trim(); map[n] = (map[n] || 0) + 1; }); });
  var sorted = Object.keys(map).map(function(n) { return [n, map[n]]; }).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 5);
  var html;
  if (!sorted.length) html = '<div class="card"><p style="color:#999;font-size:0.85em">' + t('no_events') + '</p></div>';
  else html = '<div class="card"><ol>' + sorted.map(function(x) { return '<li><b>' + esc(x[0]) + '</b> — ' + x[1] + ' ' + t('events_count') + '</li>'; }).join('') + '</ol></div>';
  document.getElementById('topResults').innerHTML = html;
}

function render() { renderStats(); renderFilters(); renderEvents(); renderDash(); renderTop(); }

function toggleSignup(id) { document.getElementById('signup-' + id).classList.toggle('open'); }

async function doSignup(id) {
  var btn = document.getElementById('signupBtn-' + id);
  var name = document.getElementById('name-' + id).value.trim();
  var contact = document.getElementById('contact-' + id).value.trim();
  if (!name || !contact) return;
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (ev && ev.signups.some(function(s) { return s.contact.toLowerCase().trim() === contact.toLowerCase(); })) {
    showMsg('signupMsg-' + id, t('already_signed'), true); return;
  }
  setElementDisabled(btn, true);
  try {
    var resp = await supabase.from('signups').insert({event_id: id, name: name, contact: contact}).select();
    if (resp.error) { showMsg('signupMsg-' + id, resp.error.message, true); return; }
    var certHtml = '<button class="btn btn-cert" data-id="' + id + '" data-name="' + escAttr(name) + '" onclick="genCert(this.dataset.id, this.dataset.name)">\ud83c\udfc5 ' + t('cert_btn') + '</button>';
    document.getElementById('signupMsg-' + id).innerHTML = '<span class="msg msg-ok">' + t('signed_up') + '</span> ' + certHtml;
    document.getElementById('name-' + id).value = '';
    document.getElementById('contact-' + id).value = '';
    setTimeout(loadEvents, 2500);
  } catch (err) { netMsg('signupMsg-' + id); }
  finally { setElementDisabled(btn, false); }
}

function toggleCoordinator() { document.getElementById('coordinatorForm').classList.toggle('hidden'); }

async function addEvent(e) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('button[type="submit"]');
  setElementDisabled(btn, true);
  try {
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
    var resp = await supabase.from('events').insert(ev);
    if (resp.error) { evMsg(resp.error.message, true); return; }
    isCoord = true;
    sessionStorage.setItem('coord', '1');
    evMsg(t('event_added'), false);
    form.reset();
    document.getElementById('coordinatorForm').classList.add('hidden');
    loadEvents();
  } catch (err) { netMsg('evMsg'); }
  finally { setElementDisabled(btn, false); }
}

async function sendFeedback(e) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('button[type="submit"]');
  setElementDisabled(btn, true);
  try {
    var fb = {
      name: document.getElementById('fbName').value.trim(),
      role: document.getElementById('fbRole').value.trim(),
      rating: parseInt(document.getElementById('fbRating').value),
      text: document.getElementById('fbText').value.trim()
    };
    var resp = await supabase.from('feedback').insert(fb);
    if (resp.error) { showMsg('fbMsg', resp.error.message, true); return; }
    showMsg('fbMsg', t('feedback_ok'), false);
    form.reset();
  } catch (err) { netMsg('fbMsg'); }
  finally { setElementDisabled(btn, false); }
}

async function lookupPassport(e) {
  e.preventDefault();
  var btn = e.target.querySelector('button[type="submit"]');
  var contact = document.getElementById('ppContact').value.trim().toLowerCase();
  if (!contact) return;
  localStorage.setItem('me', contact);
  setElementDisabled(btn, true);
  try {
    await loadEvents(); // ensure fresh data
    var mine = EVENTS.filter(function(e) { return e.signups.some(function(s) { return s.contact.toLowerCase().trim() === contact; }); });
    var html = '';
    if (!mine.length) {
      html = '<div class="card"><p>' + t('no_events') + '</p></div>';
    } else {
      var hours = mine.length * 3;
      html += '<div class="card"><p><b>' + mine.length + '</b> ' + t('events_count') + ' · <b>' + hours + '</b> ' + t('passport_hours') + '</p></div>';
      html += mine.map(function(e) {
        return '<div class="card"><h3>' + esc(e.title) + '</h3><p class="meta">' + esc(e.city) + ' · ' + fmtDate(e.date) + '</p>' +
          '<div class="share-row">' +
            '<button class="btn btn-cert" data-id="' + e.id + '" data-name="' + escAttr(document.getElementById('ppContact').value.trim()) + '" onclick="genCert(this.dataset.id, this.dataset.name)">\ud83c\udfc5 ' + t('cert_btn') + '</button>' +
            '<button class="btn btn-outline" data-id="' + e.id + '" data-contact="' + escAttr(document.getElementById('ppContact').value.trim()) + '" onclick="cancelSignup(this.dataset.id, this.dataset.contact)">' + t('cancel_btn') + '</button>' +
          '</div></div>';
      }).join('');
    }
    document.getElementById('passportResults').innerHTML = html;
  } catch (err) { netMsg('passportResults'); }
  finally { setElementDisabled(btn, false); }
}

async function cancelSignup(id, contact) {
  if (!confirm(t('cancel_btn') + '?')) return;
  var eventId = parseInt(id);
  try {
    var resp = await supabase.from('signups').delete().match({event_id: eventId, contact: contact});
    if (resp.error) { alert('Отмена недоступна: ' + resp.error.message); return; }
    document.getElementById('ppContact').value = contact;
    await loadEvents();
    document.getElementById('passportForm').dispatchEvent(new Event('submit'));
  } catch (err) { alert(t('net_err')); }
}

function shareEvent(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var url = location.origin + location.pathname + '#ev-' + id;
  navigator.clipboard.writeText(url).then(function() { alert(t('copied')); });
}
function shareWA(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var url = location.origin + location.pathname + '#ev-' + id;
  var text = encodeURIComponent(ev.title + ' — ' + url);
  window.open('https://wa.me/?text=' + text, '_blank');
}
function shareTG(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var url = encodeURIComponent(location.origin + location.pathname + '#ev-' + id);
  var text = encodeURIComponent(ev.title);
  window.open('https://t.me/share/url?url=' + url + '&text=' + text, '_blank');
}
function downloadICS(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var date = ev.date.replace(/-/g, '');
  var ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Volunteer Hub//RU\nBEGIN:VEVENT\nUID:' + id + '@volunteerhub\nDTSTART;VALUE=DATE:' + date + '\nSUMMARY:' + ev.title + '\nLOCATION:' + ev.city + '\nDESCRIPTION:' + ev.description + '\nEND:VEVENT\nEND:VCALENDAR';
  var blob = new Blob([ics], {type: 'text/calendar'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'event-' + id + '.ics'; a.click();
}
function downloadCSV(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var csv = '\uFEFFИмя,Контакт\r\n' + ev.signups.map(function(s) { return esc(s.name).replace(/,/g, ' ') + ',' + esc(s.contact); }).join('\r\n');
  var blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (ev.title || 'event') + '.csv'; a.click();
}
function copyList(eventId) {
  var ev = EVENTS.find(function(e) { return e.id === eventId; });
  if (!ev) return;
  var lines = [ev.title, ''];
  ev.signups.forEach(function(s) { lines.push(s.name + ' — ' + s.contact); });
  navigator.clipboard.writeText(lines.join('\n')).then(function() { alert(t('copied')); });
}
function genCert(id, name) {
  var eventId = parseInt(id);
  var ev = EVENTS.find(function(e) { return e.id === eventId; });
  if (!ev) return;
  var c = document.createElement('canvas');
  c.width = 900; c.height = 640;
  var ctx = c.getContext('2d');
  var grd = ctx.createLinearGradient(0, 0, 900, 640);
  grd.addColorStop(0, '#e8f5e9');
  grd.addColorStop(1, '#b7e4c7');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 900, 640);
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#2d6a4f';
  ctx.strokeRect(30, 30, 840, 580);
  ctx.font = '60px system-ui';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#2d6a4f';
  ctx.fillText('\ud83c\udf31', 450, 120);
  ctx.font = 'bold 48px system-ui';
  ctx.fillText(t('cert_title'), 450, 190);
  ctx.font = '24px system-ui';
  ctx.fillText(t('cert_name'), 450, 250);
  ctx.font = 'bold 56px system-ui';
  ctx.fillStyle = '#1b4332';
  ctx.fillText(name, 450, 330);
  ctx.font = '28px system-ui';
  ctx.fillStyle = '#2d6a4f';
  ctx.fillText(t('cert_for') + ' ' + t('cert_event'), 450, 390);
  ctx.font = 'italic 32px system-ui';
  ctx.fillText('«' + ev.title + '»', 450, 440);
  ctx.font = '22px system-ui';
  ctx.fillText(ev.city + ', ' + fmtDate(ev.date), 450, 500);
  var a = document.createElement('a'); a.href = c.toDataURL(); a.download = 'certificate.png'; a.click();
}

function toggleDash() { document.getElementById('dashboard').classList.toggle('hidden'); }
function logoutCoord() { sessionStorage.removeItem('coord'); isCoord = false; render(); }

async function loadEvents() {
  try {
    var resp = await supabase.from('events').select('*, signups(id,name,contact)').order('date', {ascending: true});
    if (resp.error) { document.getElementById('events').innerHTML = '<div class="card"><p class="msg-err">' + t('load_err') + ': ' + resp.error.message + '</p></div>'; return; }
    EVENTS = resp.data || [];
    render();
    if (location.hash) {
      setTimeout(function() {
        var el = document.getElementById(location.hash.slice(1));
        if (el) { el.scrollIntoView({behavior:'smooth'}); el.classList.add('hl'); }
      }, 300);
    }
  } catch (err) { document.getElementById('events').innerHTML = '<div class="card"><p class="msg-err">' + t('net_err') + '</p></div>'; }
}

function init() {
  document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru';
  document.getElementById('langToggle').textContent = lang === 'ru' ? 'ҚАЗ' : 'РУС';
  var me = localStorage.getItem('me');
  if (me) document.getElementById('ppContact').value = me;
  setLangStatic();
  loadEvents();
}

init();
