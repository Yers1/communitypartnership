var supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
var ORG_CODE = 'zhurek2026';
var COMPANY = window.COMPANY || { name: 'Chevron', program: 'Employee Volunteer Program — NVS \u0026 Zhurekten Zhurekke', emoji: '\ud83c\udf31', color: '#2d6a4f' };

var EVENTS = [];
var CITY = 'all';
var CITIES = ['all'];
var SEARCH = '';
var isCoord = sessionStorage.getItem('coord') === '1';
var canEdit = true;
var editingId = null;
var lang = localStorage.getItem('lang') || 'ru';
var today = new Date().toISOString().slice(0, 10);

var T = {
  ru: {
    tagline: 'Корпоративное волонтёрство в один клик',
    about_title: '', // заполняется из COMPANY.program
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
    save_btn: 'Сохранить изменения',
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
    few_left: 'Осталось мало мест',
    share: 'Поделиться',
    copied: 'Скопировано',
    your_name: 'Ваше имя',
    email_phone: 'Email или телефон',
    confirm: 'Подтвердить',
    signed_up: 'Вы записаны!',
    feedback_ok: 'Спасибо за отзыв!',
    event_added: 'Событие добавлено!',
    event_saved: 'Событие сохранено!',
    wrong_code: 'Неверный код организатора',
    load_err: 'Ошибка загрузки',
    no_events: 'Нет событий. Координатор ещё ничего не добавил.',
    empty_events: 'Пока нет событий — загляните позже',
    empty_passport: 'Вы пока не записаны ни на одно событие',
    empty_top: 'Пока нет записей',
    empty_search: 'Ничего не найдено',
    search_ph: 'Поиск по событиям...',
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
    impact_title: 'Наш вклад',
    impact_hours: 'Часов волонтёрства',
    impact_people: 'Волонтёров',
    impact_events: 'Событий',
    impact_cities: 'Городов',
    more: 'ещё',
    level_1: 'Новичок',
    level_2: 'Активист',
    level_3: 'Лидер',
    next_level: 'До следующего уровня: N событий',
    step1: '1️⃣ Выберите событие',
    step2: '2️⃣ Запишитесь в 1 клик',
    step3: '3️⃣ Получите сертификат',
    how_title: 'Как это работает',
    report_title: 'Отчёт координатора',
    copy_report: 'Скопировать отчёт',
    fill_rate: 'Заполняемость',
    dup_btn: 'Дублировать',
    dup_prompt: 'Дата для копии (ГГГГ-ММ-ДД)',
    edit_btn: 'Ред.',
    edit_unavail: 'Редактирование недоступно',
    confirm_del: 'Удалить событие? Это нельзя отменить',
    copy_contacts: 'Скопировать все контакты',
    print_btn: 'Печать',
    cat_Экология: 'Экология', cat_Дети: 'Дети', cat_Образование: 'Образование', cat_Здоровье: 'Здоровье',
    rating_5: '5 — отлично', rating_4: '4 — хорошо', rating_3: '3 — средне', rating_2: '2 — плохо', rating_1: '1 — очень плохо'
  },
  kz: {
    tagline: 'Бір басумен корпоративтік волонтерлік',
    about_title: '',
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
    save_btn: 'Өзгерістерді сақтау',
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
    few_left: 'Орын аз қалды',
    share: 'Бөлісу',
    copied: 'Көшірілді',
    your_name: 'Атыңыз',
    email_phone: 'Email немесе телефон',
    confirm: 'Растау',
    signed_up: 'Сіз тіркелдіңіз!',
    feedback_ok: 'Пікіріңізге рахмет!',
    event_added: 'Іс-шара қосылды!',
    event_saved: 'Іс-шара сақталды!',
    wrong_code: 'Ұйымдастырушы коды қате',
    load_err: 'Жүктеу қатесі',
    no_events: 'Іс-шара әзірге жоқ',
    empty_events: 'Әзірге іс-шара жоқ — кейінірек кіріңіз',
    empty_passport: 'Сіз әзірге ешқандай іс-шараға тіркелмегенсіз',
    empty_top: 'Әзірге тіркелімдер жоқ',
    empty_search: 'Ештеңе табылмады',
    search_ph: 'Іс-шаралар бойынша іздеу...',
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
    impact_title: 'Біздің үлесіміз',
    impact_hours: 'Волонтерлік сағат',
    impact_people: 'Волонтер',
    impact_events: 'Іс-шара',
    impact_cities: 'Қала',
    more: 'тағы',
    level_1: 'Жаңадан',
    level_2: 'Белсенді',
    level_3: 'Көшбасшы',
    next_level: 'Келесі деңгейге: N іс-шара',
    step1: '1️⃣ Іс-шараны таңдаңыз',
    step2: '2️⃣ Бір басумен тіркеліңіз',
    step3: '3️⃣ Сертификат алыңыз',
    how_title: 'Бұл қалай жұмыс істейді',
    report_title: 'Координатор есебі',
    copy_report: 'Есептің көшірмесі',
    fill_rate: 'Толықтыру',
    dup_btn: 'Көшіру',
    dup_prompt: 'Көшірме күні (ЖЖЖЖ-АА-КК)',
    edit_btn: 'Ред.',
    edit_unavail: 'Өңдеу қолжетімсіз',
    confirm_del: 'Іс-шараны жою керек пе? Бұны кері қайтару мүмкін емес',
    copy_contacts: 'Барлық байланыстарды көшіру',
    print_btn: 'Баспа',
    cat_Экология: 'Экология', cat_Дети: 'Балалар', cat_Образование: 'Білім', cat_Здоровье: 'Денсаулық',
    rating_5: '5 — өте жақсы', rating_4: '4 — жақсы', rating_3: '3 — орташа', rating_2: '2 — нашар', rating_1: '1 — өте нашар'
  },
  en: {
    tagline: 'Corporate volunteering in one click',
    about_title: '',
    about_text: 'Clean-ups, tree planting, support for children with disabilities and from low-income families. Cities: Astana, Almaty, Atyrau. Choose an event and sign up in 1 click.',
    coordinator_btn: 'I am a coordinator',
    coord_title: 'Add event',
    title_lbl: 'Title',
    city_lbl: 'City',
    date_lbl: 'Date',
    category_lbl: 'Category',
    desc_lbl: 'Description',
    spots_lbl: 'Spots',
    code_lbl: 'Organizer code',
    add_btn: 'Add event',
    save_btn: 'Save changes',
    dash_btn: 'Coordinator dashboard',
    feedback_title: 'Leave feedback about the platform',
    name_lbl: 'Name',
    role_lbl: 'Role',
    role_ph: 'employee, coordinator, volunteer',
    rating_lbl: 'Rating',
    text_lbl: 'Comment',
    send_btn: 'Send',
    footer: 'Employee Volunteer Program: NVS \u0026 Zhurekten Zhurekke \u00b7 2026',
    all: 'All',
    signup: 'Sign up',
    signed: 'Signed up',
    left: 'Left',
    from: 'of',
    no_spots: 'No spots left',
    few_left: 'Few spots left',
    share: 'Share',
    copied: 'Copied',
    your_name: 'Your name',
    email_phone: 'Email or phone',
    confirm: 'Confirm',
    signed_up: 'You are signed up!',
    feedback_ok: 'Thank you for your feedback!',
    event_added: 'Event added!',
    event_saved: 'Event saved!',
    wrong_code: 'Invalid organizer code',
    load_err: 'Loading error',
    no_events: 'No events yet. The coordinator has not added anything.',
    empty_events: 'No events yet — check back later',
    empty_passport: 'You have not signed up for any events yet',
    empty_top: 'No signups yet',
    empty_search: 'Nothing found',
    search_ph: 'Search events...',
    events_count: 'events',
    volunteers: 'volunteers signed up',
    spots_free: 'spots available',
    spots: 'Spots',
    copy_list: 'Copy list',
    csv_btn: 'Download CSV',
    cal_btn: 'Add to calendar',
    cert_btn: 'Certificate',
    cert_title: 'Certificate',
    cert_for: 'for participating in',
    cert_name: 'is awarded to',
    cert_event: 'a volunteer event',
    logout: 'Log out',
    name_hdr: 'Name',
    contact_hdr: 'Contact',
    participants: 'Participants',
    wa_btn: 'WhatsApp',
    tg_btn: 'Telegram',
    passport_title: 'My signups',
    passport_btn: 'My signups',
    passport_contact: 'Email or phone',
    passport_hours: 'volunteer hours',
    top_title: 'Top volunteers',
    already_signed: 'You are already signed up for this event',
    cancel_btn: 'Cancel',
    past: 'Event has passed',
    net_err: 'No connection. Please check your internet.',
    impact_title: 'Our impact',
    impact_hours: 'Volunteer hours',
    impact_people: 'Volunteers',
    impact_events: 'Events',
    impact_cities: 'Cities',
    more: 'more',
    level_1: 'Beginner',
    level_2: 'Activist',
    level_3: 'Leader',
    next_level: 'N more events to next level',
    step1: '1️⃣ Choose an event',
    step2: '2️⃣ Sign up in 1 click',
    step3: '3️⃣ Get your certificate',
    how_title: 'How it works',
    report_title: 'Coordinator report',
    copy_report: 'Copy report',
    fill_rate: 'Fill rate',
    dup_btn: 'Duplicate',
    dup_prompt: 'Date for the copy (YYYY-MM-DD)',
    edit_btn: 'Edit',
    edit_unavail: 'Editing is not available',
    confirm_del: 'Delete this event? This cannot be undone',
    copy_contacts: 'Copy all contacts',
    print_btn: 'Print',
    cat_Экология: 'Ecology', cat_Дети: 'Children', cat_Образование: 'Education', cat_Здоровье: 'Health',
    rating_5: '5 — excellent', rating_4: '4 — good', rating_3: '3 — average', rating_2: '2 — bad', rating_1: '1 — very bad'
  }
};

function t(key) { return T[lang][key] || key; }
function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return esc(s).replace(/"/g, '\u0026quot;').replace(/'/g, '\u0026#39;'); }
function fmtDate(d) { return new Date(d).toLocaleDateString(lang === 'kz' ? 'kk-KZ' : lang === 'en' ? 'en-GB' : 'ru-RU', {day:'numeric', month:'long', year:'numeric'}); }
function showMsg(id, text, isErr) { var el = document.getElementById(id); if (el) el.innerHTML = '<div class="msg ' + (isErr ? 'msg-err' : 'msg-ok') + '">' + text + '</div>'; }
function evMsg(text, isErr) { showMsg('evMsg', text, isErr); }
function netMsg(id) { showMsg(id, t('net_err'), true); }
function setElementDisabled(el, disabled) { if (el) el.disabled = disabled; }

function langLabel() { return lang === 'ru' ? 'ҚАЗ' : lang === 'kz' ? 'ENG' : 'РУС'; }
function nextLang() { return lang === 'ru' ? 'kz' : lang === 'kz' ? 'en' : 'ru'; }
function toggleLang() { setLang(nextLang()); }
function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  document.documentElement.lang = lang === 'kz' ? 'kk' : lang === 'en' ? 'en' : 'ru';
  setLangStatic();
  render();
  document.getElementById('langToggle').textContent = langLabel();
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
    'lang-top-title': 'top_title', 'lang-how-title': 'how_title', 'lang-step1': 'step1',
    'lang-step2': 'step2', 'lang-step3': 'step3'
  };
  document.getElementById('lang-about-title').textContent = COMPANY.program;
  for (var id in map) { var el = document.getElementById(id); if (el && map[id]) el.textContent = T[lang][map[id]]; }
  document.getElementById('fbRole').placeholder = T[lang].role_ph;
  document.getElementById('ppContact').placeholder = T[lang].passport_contact;
  document.getElementById('searchInput').placeholder = T[lang].search_ph;
  document.querySelectorAll('#evCategory option').forEach(function(o) { o.textContent = T[lang]['cat_' + o.value] || o.value; });
  document.querySelectorAll('#fbRating option').forEach(function(o) { o.textContent = T[lang]['rating_' + o.value] || o.value; });
}

function categoryIcon(cat) {
  var map = { 'Экология': '\ud83c\udf33', 'Дети': '\ud83e\uddd2', 'Образование': '\ud83d\udcda', 'Здоровье': '\u2764\ufe0f' };
  return map[cat] || '\ud83c\udf31';
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

function renderImpact() {
  var hours = EVENTS.reduce(function(s, e) { return s + e.signups.length * 3; }, 0);
  var people = Object.keys(EVENTS.reduce(function(acc, e) { e.signups.forEach(function(s) { acc[s.contact] = 1; }); return acc; }, {})).length;
  var events = EVENTS.length;
  var cities = Object.keys(EVENTS.reduce(function(acc, e) { acc[e.city] = 1; return acc; }, {})).length;
  document.getElementById('impact').innerHTML =
    '<h2>' + t('impact_title') + '</h2><div class="impact-grid">' +
    '<div class="impact-item"><b>' + hours + '</b><span>' + t('impact_hours') + '</span></div>' +
    '<div class="impact-item"><b>' + people + '</b><span>' + t('impact_people') + '</span></div>' +
    '<div class="impact-item"><b>' + events + '</b><span>' + t('impact_events') + '</span></div>' +
    '<div class="impact-item"><b>' + cities + '</b><span>' + t('impact_cities') + '</span></div>' +
    '</div>';
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
  var sorted = EVENTS.slice().sort(function(a, b) {
    var fa = a.date < today, fb = b.date < today;
    if (fa !== fb) return fa ? 1 : -1;
    return fa ? (b.date > a.date ? 1 : -1) : (a.date > b.date ? 1 : -1);
  });
  var filtered = sorted.filter(function(e) {
    var cityOk = CITY === 'all' || e.city === CITY;
    var q = SEARCH.trim().toLowerCase();
    var searchOk = !q || (e.title + ' ' + e.description + ' ' + e.city).toLowerCase().indexOf(q) !== -1;
    return cityOk && searchOk;
  });
  var html;
  if (!filtered.length) {
    html = '<div class="card empty"><div class="empty-emoji">' + COMPANY.emoji + '</div><h3>' + (SEARCH ? t('empty_search') : t('empty_events')) + '</h3></div>';
  } else {
    html = filtered.map(function(e) {
      var signed = e.signups.length;
      var left = Math.max(0, (e.spots || 0) - signed);
      var full = left <= 0;
      var past = e.date < today;
      var few = !full && !past && left / e.spots <= 0.2;
      var names = e.signups.slice(0, 3).map(function(s) { return esc(s.name); }).join(', ');
      var social = signed > 0 ? '<p class="social">' + names + (signed > 3 ? ' +' + (signed - 3) + ' ' + t('more') : '') + '</p>' : '';
      return '<div class="card' + (past ? ' past' : '') + '" id="ev-' + e.id + '">' +
        '<h3>' + esc(e.title) + '</h3>' +
        '<div class="meta"><span>' + esc(e.city) + '</span><span>' + fmtDate(e.date) + '</span>' +
        '<span class="cat">' + categoryIcon(e.category) + ' ' + esc(T[lang]['cat_' + e.category] || e.category) + '</span><span>' + t('spots') + ': ' + e.spots + '</span></div>' +
        '<p class="desc">' + esc(e.description) + '</p>' +
        '<p class="signups">' + t('signed') + ': ' + signed + ' \u00b7 ' + t('left') + ': ' + left + ' ' + t('from') + ' ' + e.spots + '</p>' +
        (past ? '<p class="full">' + t('past') + '</p>' : '') +
        (full && !past ? '<p class="full">' + t('no_spots') + '</p>' : '') +
        (few ? '<p class="few">' + t('few_left') + '</p>' : '') +
        social +
        '<div class="share-row">' +
          '<button class="btn" ' + (full || past ? 'disabled' : '') + ' onclick="toggleSignup(' + e.id + ')"' + (full || past ? '' : ' aria-label="' + t('signup') + '"') + '>' + (past ? t('past') : t('signup')) + '</button>' +
          '<button class="btn-share" onclick="shareEvent(' + e.id + ')" aria-label="' + t('share') + '">\ud83d\udd17 ' + t('share') + '</button>' +
          '<button class="btn-wa" onclick="shareWA(' + e.id + ')" aria-label="WhatsApp">' + t('wa_btn') + '</button>' +
          '<button class="btn-tg" onclick="shareTG(' + e.id + ')" aria-label="Telegram">' + t('tg_btn') + '</button>' +
          '<button class="btn-cal" onclick="downloadICS(' + e.id + ')" aria-label="' + t('cal_btn') + '">\ud83d\udcc5 ' + t('cal_btn') + '</button>' +
        '</div>' +
        '<div class="signup-form" id="signup-' + e.id + '">' +
          '<input placeholder="' + escAttr(t('your_name')) + '" id="name-' + e.id + '" aria-label="' + t('your_name') + '">' +
          '<input placeholder="' + escAttr(t('email_phone')) + '" id="contact-' + e.id + '" aria-label="' + t('email_phone') + '">' +
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
  var totalSigned = EVENTS.reduce(function(s, e) { return s + e.signups.length; }, 0);
  var totalSpots = EVENTS.reduce(function(s, e) { return s + (e.spots || 0); }, 0);
  var avgFill = totalSpots ? Math.round(totalSigned / totalSpots * 100) : 0;
  var allContacts = [];
  EVENTS.forEach(function(e) { e.signups.forEach(function(s) { if (allContacts.indexOf(s.contact) === -1) allContacts.push(s.contact); }); });

  var html = '<div class="card report"><h2>' + t('report_title') + '</h2>' +
    '<div class="report-grid">' +
    '<div><b>' + EVENTS.length + '</b><span>' + t('events_count') + '</span></div>' +
    '<div><b>' + totalSigned + '</b><span>' + t('volunteers') + '</span></div>' +
    '<div><b>' + (totalSigned * 3) + '</b><span>' + t('passport_hours') + '</span></div>' +
    '<div><b>' + avgFill + '%</b><span>' + t('fill_rate') + '</span></div>' +
    '</div>' +
    '<div class="share-row"><button class="btn" onclick="copyReport()">' + t('copy_report') + '</button>' +
    '<button class="btn" onclick="copyAllContacts()">' + t('copy_contacts') + '</button>' +
    '<button class="btn btn-outline" onclick="window.print()">' + t('print_btn') + '</button></div></div>';

  EVENTS.forEach(function(e) {
    var fill = (e.spots || 1) ? Math.round(e.signups.length / (e.spots || 1) * 100) : 0;
    var color = fill < 50 ? '#c62828' : fill < 80 ? '#f9a825' : '#2d6a4f';
    html += '<div class="card dash-event"><h3>' + esc(e.title) + '</h3>' +
      '<p class="meta">' + esc(e.city) + ' · ' + fmtDate(e.date) + '</p>' +
      '<p>' + t('participants') + ': ' + e.signups.length + ' / ' + e.spots + ' · ' + t('fill_rate') + ': ' + fill + '%</p>' +
      '<div class="bar-bg"><div class="bar-fill" style="width:' + fill + '%;background:' + color + '"></div></div>';
    if (e.signups.length) {
      html += '<table><tr><th>' + t('name_hdr') + '</th><th>' + t('contact_hdr') + '</th></tr>' +
        e.signups.map(function(s) { return '<tr><td>' + esc(s.name) + '</td><td>' + esc(s.contact) + '</td></tr>'; }).join('') + '</table>';
    } else {
      html += '<p style="color:#999;font-size:0.85em">' + t('empty_top') + '</p>';
    }
    if (canEdit) {
      html += '<div class="share-row">' +
        '<button class="btn btn-small" onclick="copyList(' + e.id + ')">' + t('copy_list') + '</button>' +
        '<button class="btn btn-small" onclick="downloadCSV(' + e.id + ')">' + t('csv_btn') + '</button>' +
        '<button class="btn btn-small btn-outline" onclick="duplicateEvent(' + e.id + ')">' + t('dup_btn') + '</button>' +
        '<button class="btn btn-small btn-outline" onclick="startEdit(' + e.id + ')">' + t('edit_btn') + '</button>' +
        '<button class="btn btn-small btn-outline" style="color:#c62828" onclick="deleteEvent(' + e.id + ')">\ud83d\uddd1</button>' +
        '</div>';
    }
    html += '</div>';
  });
  html += '<button class="btn btn-outline" style="margin-top:12px" onclick="logoutCoord()">' + t('logout') + '</button>';
  document.getElementById('dashboard').innerHTML = html;
}

function renderPassport() { /* generated on lookup */ }
function renderTop() {
  var map = {};
  EVENTS.forEach(function(e) { e.signups.forEach(function(s) { var n = s.name.trim(); map[n] = (map[n] || 0) + 1; }); });
  var sorted = Object.keys(map).map(function(n) { return [n, map[n]]; }).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 5);
  var html;
  if (!sorted.length) {
    html = '<div class="card empty"><div class="empty-emoji">' + COMPANY.emoji + '</div><h3>' + t('empty_top') + '</h3></div>';
  } else {
    html = '<div class="card"><ol>' + sorted.map(function(x) { return '<li><b>' + esc(x[0]) + '</b> — ' + x[1] + ' ' + t('events_count') + '</li>'; }).join('') + '</ol></div>';
  }
  document.getElementById('topResults').innerHTML = html;
}

function renderHow() {
  document.getElementById('lang-step1').textContent = t('step1');
  document.getElementById('lang-step2').textContent = t('step2');
  document.getElementById('lang-step3').textContent = t('step3');
}

function render() { renderStats(); renderImpact(); renderFilters(); renderEvents(); renderDash(); renderTop(); renderHow(); }

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
    confetti();
    document.getElementById('name-' + id).value = '';
    document.getElementById('contact-' + id).value = '';
    setTimeout(loadEvents, 2500);
  } catch (err) { netMsg('signupMsg-' + id); }
  finally { setElementDisabled(btn, false); }
}

function toggleCoordinator() { document.getElementById('coordinatorForm').classList.toggle('hidden'); }

function startEdit(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  editingId = id;
  document.getElementById('evTitle').value = ev.title;
  document.getElementById('evCity').value = ev.city;
  document.getElementById('evDate').value = ev.date;
  document.getElementById('evCategory').value = ev.category;
  document.getElementById('evDesc').value = ev.description;
  document.getElementById('evSpots').value = ev.spots;
  document.getElementById('lang-coord-title').textContent = t('edit_btn');
  document.getElementById('lang-btn-add').textContent = t('save_btn');
  document.getElementById('coordinatorForm').classList.remove('hidden');
  document.getElementById('coordinatorForm').scrollIntoView({behavior:'smooth'});
}
function clearEdit() {
  editingId = null;
  document.getElementById('addEventForm').reset();
  document.getElementById('lang-coord-title').textContent = t('coord_title');
  document.getElementById('lang-btn-add').textContent = t('add_btn');
}

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
    var resp;
    if (editingId) {
      resp = await supabase.from('events').update(ev).eq('id', editingId);
      if (resp.error) { canEdit = false; evMsg(t('edit_unavail') + ': ' + resp.error.message, true); return; }
      evMsg(t('event_saved'), false);
    } else {
      resp = await supabase.from('events').insert(ev);
      if (resp.error) { evMsg(resp.error.message, true); return; }
      isCoord = true;
      sessionStorage.setItem('coord', '1');
      evMsg(t('event_added'), false);
    }
    clearEdit();
    document.getElementById('coordinatorForm').classList.add('hidden');
    loadEvents();
  } catch (err) { netMsg('evMsg'); }
  finally { setElementDisabled(btn, false); }
}

async function deleteEvent(id) {
  if (!confirm(t('confirm_del'))) return;
  try {
    var resp = await supabase.from('events').delete().eq('id', id);
    if (resp.error) { canEdit = false; alert(t('edit_unavail') + ': ' + resp.error.message); loadEvents(); return; }
    loadEvents();
  } catch (err) { alert(t('net_err')); }
}

async function duplicateEvent(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var nextDate = new Date(ev.date);
  nextDate.setDate(nextDate.getDate() + 7);
  var defaultDate = nextDate.toISOString().slice(0, 10);
  var newDate = prompt(t('dup_prompt'), defaultDate);
  if (!newDate) return;
  try {
    var copy = { title: ev.title, city: ev.city, date: newDate, category: ev.category, description: ev.description, spots: ev.spots };
    var resp = await supabase.from('events').insert(copy);
    if (resp.error) { alert(resp.error.message); return; }
    loadEvents();
  } catch (err) { alert(t('net_err')); }
}

async function sendFeedback(e) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('button[type="submit"]');
  setElementDisabled(btn, true);
  try {
    var fb = { name: document.getElementById('fbName').value.trim(), role: document.getElementById('fbRole').value.trim(), rating: parseInt(document.getElementById('fbRating').value), text: document.getElementById('fbText').value.trim() };
    var resp = await supabase.from('feedback').insert(fb);
    if (resp.error) { showMsg('fbMsg', resp.error.message, true); return; }
    showMsg('fbMsg', t('feedback_ok'), false);
    form.reset();
  } catch (err) { netMsg('fbMsg'); }
  finally { setElementDisabled(btn, false); }
}

async function lookupPassport(e) {
  if (e) e.preventDefault();
  var form = document.getElementById('passportForm');
  var btn = form.querySelector('button[type="submit"]');
  var contact = document.getElementById('ppContact').value.trim().toLowerCase();
  if (!contact) return;
  localStorage.setItem('me', contact);
  setElementDisabled(btn, true);
  try {
    await loadEvents();
    var mine = EVENTS.filter(function(e) { return e.signups.some(function(s) { return s.contact.toLowerCase().trim() === contact; }); });
    var html = '';
    if (!mine.length) {
      html = '<div class="card empty"><div class="empty-emoji">' + COMPANY.emoji + '</div><h3>' + t('empty_passport') + '</h3></div>';
    } else {
      var hours = mine.length * 3;
      var level = hours < 9 ? 1 : hours < 15 ? 2 : 3;
      var levelKey = level === 1 ? 'level_1' : level === 2 ? 'level_2' : 'level_3';
      var levelEmoji = level === 1 ? '\ud83c\udf31' : level === 2 ? '\ud83c\udf3f' : '\ud83c\udf33';
      var next = level === 1 ? 3 - mine.length : level === 2 ? 5 - mine.length : 0;
      html += '<div class="card level-card"><div class="level-emoji">' + levelEmoji + '</div><h3>' + levelEmoji + ' ' + t(levelKey) + '</h3><p><b>' + mine.length + '</b> ' + t('events_count') + ' · <b>' + hours + '</b> ' + t('passport_hours') + '</p>';
      if (next > 0) html += '<div class="progress"><div class="progress-fill" style="width:' + (mine.length/(mine.length+next)*100) + '%"></div></div><p class="next">' + t('next_level').replace('N', next) + '</p>';
      html += '</div>';
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
    lookupPassport(null);
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
  window.open('https://wa.me/?text=' + encodeURIComponent(ev.title + ' — ' + url), '_blank');
}
function shareTG(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var url = encodeURIComponent(location.origin + location.pathname + '#ev-' + id);
  window.open('https://t.me/share/url?url=' + url + '&text=' + encodeURIComponent(ev.title), '_blank');
}
function downloadICS(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var date = ev.date.replace(/-/g, '');
  var ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Volunteer Hub//EN\nBEGIN:VEVENT\nUID:' + id + '@volunteerhub\nDTSTART;VALUE=DATE:' + date + '\nSUMMARY:' + ev.title + '\nLOCATION:' + ev.city + '\nDESCRIPTION:' + ev.description + '\nEND:VEVENT\nEND:VCALENDAR';
  var blob = new Blob([ics], {type: 'text/calendar'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'event-' + id + '.ics'; a.click();
}
function downloadCSV(id) {
  var ev = EVENTS.find(function(e) { return e.id === id; });
  if (!ev) return;
  var csv = '\uFEFFName,Contact\r\n' + ev.signups.map(function(s) { return esc(s.name).replace(/,/g, ' ') + ',' + esc(s.contact); }).join('\r\n');
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
function copyAllContacts() {
  var contacts = [];
  EVENTS.forEach(function(e) { e.signups.forEach(function(s) { if (contacts.indexOf(s.contact) === -1) contacts.push(s.contact); }); });
  navigator.clipboard.writeText(contacts.join(', ')).then(function() { alert(t('copied') + ' (' + contacts.length + ')'); });
}
function copyReport() {
  var totalSigned = EVENTS.reduce(function(s, e) { return s + e.signups.length; }, 0);
  var totalSpots = EVENTS.reduce(function(s, e) { return s + (e.spots || 0); }, 0);
  var avgFill = totalSpots ? Math.round(totalSigned / totalSpots * 100) : 0;
  var date = new Date().toLocaleDateString(lang === 'kz' ? 'kk-KZ' : lang === 'en' ? 'en-GB' : 'ru-RU');
  var lines = ['# ' + t('report_title') + ' — ' + date, '',
    '| ' + t('title_lbl') + ' | ' + t('city_lbl') + ' | ' + t('signed') + ' | ' + t('spots') + ' | ' + t('fill_rate') + ' |', '|---|---|---|---|---|'];
  EVENTS.forEach(function(e) {
    var fill = (e.spots || 1) ? Math.round(e.signups.length / (e.spots || 1) * 100) : 0;
    lines.push('| ' + e.title + ' | ' + e.city + ' | ' + e.signups.length + ' | ' + e.spots + ' | ' + fill + '% |');
  });
  lines.push('', '**' + t('impact_events') + ':** ' + EVENTS.length + ' · **' + t('volunteers') + ':** ' + totalSigned + ' · **' + t('passport_hours') + ':** ' + (totalSigned*3) + ' · **' + t('fill_rate') + ':** ' + avgFill + '%');
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
  // watermark
  ctx.font = '120px system-ui';
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = COMPANY.color;
  for (var i = 0; i < 5; i++) { ctx.fillText(COMPANY.emoji, 80 + i * 180, 200 + i * 120); }
  ctx.globalAlpha = 1;
  // borders
  ctx.lineWidth = 12; ctx.strokeStyle = COMPANY.color; ctx.strokeRect(24, 24, 852, 592);
  ctx.lineWidth = 4; ctx.strokeStyle = '#74c69d'; ctx.strokeRect(36, 36, 828, 568);
  // title
  ctx.font = '60px system-ui'; ctx.textAlign = 'center'; ctx.fillStyle = COMPANY.color; ctx.fillText(COMPANY.emoji, 450, 110);
  ctx.font = 'bold 48px system-ui'; ctx.fillText(t('cert_title'), 450, 170);
  ctx.font = '22px system-ui'; ctx.fillText(t('cert_name'), 450, 230);
  ctx.font = 'bold 56px system-ui'; ctx.fillStyle = '#1b4332'; ctx.fillText(name, 450, 310);
  ctx.font = '26px system-ui'; ctx.fillStyle = COMPANY.color;
  ctx.fillText(t('cert_for') + ' ' + t('cert_event'), 450, 370);
  ctx.font = 'italic 32px system-ui'; ctx.fillText('«' + ev.title + '»', 450, 420);
  ctx.font = '20px system-ui'; ctx.fillText(ev.city + ', ' + fmtDate(ev.date), 450, 470);
  ctx.font = '16px system-ui'; ctx.fillStyle = '#555'; ctx.fillText(COMPANY.program, 450, 540);
  ctx.font = '16px system-ui'; ctx.fillText('____________________', 450, 580); ctx.fillText('Coordinator', 450, 600);
  var a = document.createElement('a'); a.href = c.toDataURL(); a.download = 'certificate.png'; a.click();
}

function confetti() {
  var colors = ['#2d6a4f', '#40916c', '#74c69d', '#f9a825', '#e76f51'];
  for (var i = 0; i < 40; i++) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;left:' + (Math.random() * 100) + 'vw;top:-10px;width:8px;height:8px;background:' + colors[Math.floor(Math.random() * colors.length)] + ';border-radius:50%;pointer-events:none;z-index:9999;animation:confettiFall ' + (1 + Math.random()) + 's linear forwards;';
    document.body.appendChild(d);
    setTimeout(function(el){ el.remove(); }, 2500, d);
  }
}

function toggleDash() { document.getElementById('dashboard').classList.toggle('hidden'); }
function logoutCoord() { sessionStorage.removeItem('coord'); isCoord = false; render(); }

function doSearch() {
  SEARCH = document.getElementById('searchInput').value;
  renderEvents();
}

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
  document.documentElement.lang = lang === 'kz' ? 'kk' : lang === 'en' ? 'en' : 'ru';
  document.documentElement.style.setProperty('--brand', COMPANY.color);
  document.getElementById('langToggle').textContent = langLabel();
  var me = localStorage.getItem('me');
  if (me) { document.getElementById('ppContact').value = me; }
  setLangStatic();
  loadEvents();
  if (me) setTimeout(function() { lookupPassport(null); }, 600);
  window.addEventListener('error', function(e) {
    var el = document.getElementById('globalError');
    if (el) { el.textContent = t('net_err'); el.classList.remove('hidden'); }
  });
}

init();
