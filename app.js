var supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
var COMPANY = window.COMPANY || { name: 'Chevron', program: 'Employee Volunteer Program — NVS \u0026 Zhurekten Zhurekke', color: '#0c5e50' };

var EVENTS = [];
var CITY = 'all';
var CITIES = ['all'];
var CATEGORY = 'all';
var CATEGORIES = ['all', 'Экология', 'Дети', 'Животные', 'Пожилые', 'Образование', 'Здоровье', 'Поддержка семьи'];
var DATE_FILTER = 'all';
var SORT = 'date';
var SEARCH = '';
var searchTimer = null;
var user = null;
var coordEmail = sessionStorage.getItem('coordEmail') || '';
var isCoord = false;
var canEdit = true;
var editingId = null;
var lang = localStorage.getItem('lang') || 'ru';
var today = new Date().toISOString().slice(0, 10);

var T = {
  ru: {
    tagline: 'Выберите важное дело, запишитесь в один клик и сохраните историю своего вклада.',
    hero_overline: 'CHEVRON KAZAKHSTAN · COMMUNITY PROGRAM',
    hero_title_1: 'Ваш вклад',
    hero_title_2: 'начинается здесь.',
    hero_cta: 'Найти событие',
    nav_feedback: 'Отзыв',
    nav_coordinators: 'Координаторам',
    about_title: '',
    about_text: 'Субботники, посадка деревьев, поддержка детей с инвалидностью и из малообеспеченных семей. Города: Астана, Алматы, Атырау. Выберите событие и запишитесь в 1 клик.',
    events_title: 'События',
    how_title: 'Как это работает',
    step1: 'Выберите событие',
    step2: 'Запишитесь в 1 клик',
    step3: 'Получите сертификат',
    coordinator_title: 'Координатор',
    login_tab: 'Вход',
    register_tab: 'Регистрация',
    email_lbl: 'Email',
    password_lbl: 'Пароль',
    reg_email_lbl: 'Email',
    reg_password_lbl: 'Пароль',
    reg_password2_lbl: 'Повторите пароль',
    btn_login: 'Войти',
    btn_register: 'Зарегистрироваться',
    reg_note: 'После регистрации администратор подтвердит вашу заявку.',
    add_title: 'Добавить событие',
    title_lbl: 'Название',
    city_lbl: 'Город',
    date_lbl: 'Дата',
    category_lbl: 'Категория',
    desc_lbl: 'Описание',
    spots_lbl: 'Мест',
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
    cert_after_attendance: 'Сертификат появится после подтверждения участия координатором.',
    waitlist_btn: 'В резерв',
    waitlist_ok: 'Вы в резервном списке. Освободившееся место будет предложено автоматически.',
    feedback_ok: 'Спасибо за отзыв!',
    event_added: 'Событие добавлено!',
    event_saved: 'Событие сохранено!',
    load_err: 'Ошибка загрузки',
    empty_events: 'Пока нет событий — загляните позже',
    empty_passport: 'Вы пока не записаны ни на одно событие',
    empty_top: 'Пока нет записей',
    empty_search: 'Ничего не найдено',
    search_ph: 'Поиск по событиям...',
    sort_label: 'Сортировка:',
    date_label: 'Дата:',
    sort_date: 'По дате',
    sort_popular: 'По популярности',
    sort_spots: 'По местам',
    date_all: 'Все',
    date_future: 'Будущие',
    date_past: 'Прошедшие',
    date_week: 'На этой неделе',
    date_month: 'В этом месяце',
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
    net_err: 'Не удалось завершить действие. Проверьте соединение и повторите попытку.',
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
    report_title: 'Отчёт координатора',
    copy_report: 'Скопировать отчёт',
    fill_rate: 'Заполняемость',
    dup_btn: 'Дублировать',
    dup_prompt: 'Дата для копии (ГГГГ-ММ-ДД)',
    edit_btn: 'Редактировать',
    edit_unavail: 'Редактирование недоступно',
    confirm_del: 'Удалить событие? Это нельзя отменить',
    copy_contacts: 'Скопировать все контакты',
    print_btn: 'Печать',
    pending_approval: 'Заявка на рассмотрении. Ожидайте подтверждения администратора.',
    no_approved: 'Вы не одобрены как координатор.',
    invalid_auth: 'Неверный email или пароль.',
    register_ok: 'Заявка отправлена. Администратор подтвердит доступ.',
    email_exists: 'Этот email уже зарегистрирован.',
    password_match: 'Пароли не совпадают.',
    cat_Экология: 'Экология', cat_Дети: 'Дети', cat_Образование: 'Образование', cat_Здоровье: 'Здоровье',
    rating_5: '5 — отлично', rating_4: '4 — хорошо', rating_3: '3 — средне', rating_2: '2 — плохо', rating_1: '1 — очень плохо',
    sort_options: 'По дате,По популярности,По местам',
    date_options: 'Все,Будущие,Прошедшие,На этой неделе,В этом месяце'
  },
  kz: {
    tagline: 'Маңызды істі таңдаңыз, бір басумен тіркеліп, өз үлесіңіздің тарихын сақтаңыз.',
    hero_overline: 'CHEVRON ҚАЗАҚСТАН · ҚОҒАМДЫҚ БАҒДАРЛАМА',
    hero_title_1: 'Сіздің үлесіңіз',
    hero_title_2: 'осы жерден басталады.',
    hero_cta: 'Іс-шараны табу',
    nav_feedback: 'Пікір',
    nav_coordinators: 'Координаторларға',
    about_title: '',
    about_text: 'Сенбіліктер, ағаш отырғызу, мүгедек және аз қамтылған балаларға қолдау. Қалалар: Астана, Алматы, Атырау. Іс-шараны таңдап, 1 басумен тіркеліңіз.',
    events_title: 'Іс-шаралар',
    how_title: 'Бұл қалай жұмыс істейді',
    step1: 'Іс-шараны таңдаңыз',
    step2: 'Бір басумен тіркеліңіз',
    step3: 'Сертификат алыңыз',
    coordinator_title: 'Координатор',
    login_tab: 'Кіру',
    register_tab: 'Тіркелу',
    email_lbl: 'Email',
    password_lbl: 'Құпия сөз',
    reg_email_lbl: 'Email',
    reg_password_lbl: 'Құпия сөз',
    reg_password2_lbl: 'Құпия сөзді қайталаңыз',
    btn_login: 'Кіру',
    btn_register: 'Тіркелу',
    reg_note: 'Тіркелгеннен кейін әкімшілер сіздің өтініміңізді растайды.',
    add_title: 'Іс-шара қосу',
    title_lbl: 'Атауы',
    city_lbl: 'Қала',
    date_lbl: 'Күні',
    category_lbl: 'Санаты',
    desc_lbl: 'Сипаттамасы',
    spots_lbl: 'Орын',
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
    cert_after_attendance: 'Сертификат қатысуды үйлестіруші растағаннан кейін пайда болады.',
    waitlist_btn: 'Резервке тұру',
    waitlist_ok: 'Сіз резервтік тізімдесіз. Бос орын пайда болса, ол автоматты түрде ұсынылады.',
    feedback_ok: 'Пікіріңізге рахмет!',
    event_added: 'Іс-шара қосылды!',
    event_saved: 'Іс-шара сақталды!',
    load_err: 'Жүктеу қатесі',
    empty_events: 'Әзірге іс-шара жоқ — кейінірек кіріңіз',
    empty_passport: 'Сіз әзірге ешқандай іс-шараға тіркелмегенсіз',
    empty_top: 'Әзірге тіркелімдер жоқ',
    empty_search: 'Ештеңе табылмады',
    search_ph: 'Іс-шаралар бойынша іздеу...',
    sort_label: 'Сұрыптау:',
    date_label: 'Күні:',
    sort_date: 'Күні бойынша',
    sort_popular: 'Танымалдығы бойынша',
    sort_spots: 'Орындар бойынша',
    date_all: 'Барлығы',
    date_future: 'Алдағы',
    date_past: 'Өткен',
    date_week: 'Осы аптада',
    date_month: 'Осы айда',
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
    net_err: 'Әрекет орындалмады. Байланысты тексеріп, қайталап көріңіз.',
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
    report_title: 'Координатор есебі',
    copy_report: 'Есептің көшірмесі',
    fill_rate: 'Толықтыру',
    dup_btn: 'Көшіру',
    dup_prompt: 'Көшірме күні (ЖЖЖЖ-АА-КК)',
    edit_btn: 'Өзгерту',
    edit_unavail: 'Өңдеу қолжетімсіз',
    confirm_del: 'Іс-шараны жою керек пе? Бұны кері қайтару мүмкін емес',
    copy_contacts: 'Барлық байланыстарды көшіру',
    print_btn: 'Баспа',
    pending_approval: 'Өтінім қаралуда. Әкімшінің растауын күтіңіз.',
    no_approved: 'Сіз координатор ретінде расталмағансыз.',
    invalid_auth: 'Email немесе құпия сөз қате.',
    register_ok: 'Өтінім жіберілді. Әкімшілер қатынамды растайды.',
    email_exists: 'Бұл email тіркелген.',
    password_match: 'Құпия сөздер сәйкес келмейді.',
    cat_Экология: 'Экология', cat_Дети: 'Балалар', cat_Образование: 'Білім', cat_Здоровье: 'Денсаулық',
    rating_5: '5 — өте жақсы', rating_4: '4 — жақсы', rating_3: '3 — орташа', rating_2: '2 — нашар', rating_1: '1 — өте нашар',
    sort_options: 'Күні бойынша,Танымалдығы бойынша,Орындар бойынша',
    date_options: 'Барлығы,Алдағы,Өткен,Осы аптада,Осы айда'
  },
  en: {
    tagline: 'Choose a cause, join in one click, and keep a record of your impact.',
    hero_overline: 'CHEVRON KAZAKHSTAN · COMMUNITY PROGRAM',
    hero_title_1: 'Your impact',
    hero_title_2: 'starts here.',
    hero_cta: 'Find an event',
    nav_feedback: 'Feedback',
    nav_coordinators: 'For coordinators',
    about_title: '',
    about_text: 'Clean-ups, tree planting, support for children with disabilities and from low-income families. Cities: Astana, Almaty, Atyrau. Choose an event and sign up in 1 click.',
    events_title: 'Events',
    how_title: 'How it works',
    step1: 'Choose an event',
    step2: 'Sign up in 1 click',
    step3: 'Get your certificate',
    coordinator_title: 'Coordinator',
    login_tab: 'Log in',
    register_tab: 'Register',
    email_lbl: 'Email',
    password_lbl: 'Password',
    reg_email_lbl: 'Email',
    reg_password_lbl: 'Password',
    reg_password2_lbl: 'Repeat password',
    btn_login: 'Log in',
    btn_register: 'Register',
    reg_note: 'After registration, an administrator will approve your request.',
    add_title: 'Add event',
    title_lbl: 'Title',
    city_lbl: 'City',
    date_lbl: 'Date',
    category_lbl: 'Category',
    desc_lbl: 'Description',
    spots_lbl: 'Spots',
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
    cert_after_attendance: 'Your certificate will appear after the coordinator verifies attendance.',
    waitlist_btn: 'Join waitlist',
    waitlist_ok: 'You are on the waitlist. An available spot will be offered automatically.',
    feedback_ok: 'Thank you for your feedback!',
    event_added: 'Event added!',
    event_saved: 'Event saved!',
    load_err: 'Loading error',
    empty_events: 'No events yet — check back later',
    empty_passport: 'You have not signed up for any events yet',
    empty_top: 'No signups yet',
    empty_search: 'Nothing found',
    search_ph: 'Search events...',
    sort_label: 'Sort:',
    date_label: 'Date:',
    sort_date: 'By date',
    sort_popular: 'By popularity',
    sort_spots: 'By spots',
    date_all: 'All',
    date_future: 'Upcoming',
    date_past: 'Past',
    date_week: 'This week',
    date_month: 'This month',
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
    net_err: 'The action could not be completed. Check your connection and try again.',
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
    pending_approval: 'Your request is pending administrator approval.',
    no_approved: 'You are not approved as a coordinator.',
    invalid_auth: 'Invalid email or password.',
    register_ok: 'Request submitted. An administrator will approve access.',
    email_exists: 'This email is already registered.',
    password_match: 'Passwords do not match.',
    cat_Экология: 'Ecology', cat_Дети: 'Children', cat_Образование: 'Education', cat_Здоровье: 'Health',
    rating_5: '5 — excellent', rating_4: '4 — good', rating_3: '3 — average', rating_2: '2 — bad', rating_1: '1 — very bad',
    sort_options: 'By date,By popularity,By spots',
    date_options: 'All,Upcoming,Past,This week,This month'
  }
};

function t(key) { return T[lang][key] || key; }
function ci(key) { var copy={ru:{checked:'Явка',present:'На месте',checkin:'Отметить',qr:'QR для check-in',reminder:'Скопировать напоминание',reminder_ok:'Напоминание скопировано',checkin_title:'Отметьтесь на месте',checkin_hint:'Введите email или телефон, указанные при записи.',checkin_done:'Вы отмечены. Спасибо за участие!',checkin_fail:'Запись не найдена. Проверьте контакт.',report_present:'Пришло'},kz:{checked:'Қатысу',present:'Келді',checkin:'Белгілеу',qr:'Check-in QR',reminder:'Еске салуды көшіру',reminder_ok:'Еске салу көшірілді',checkin_title:'Қатысқаныңызды растаңыз',checkin_hint:'Тіркелу кезіндегі email не телефонды енгізіңіз.',checkin_done:'Сіз белгілендіңіз. Рақмет!',checkin_fail:'Тіркелу табылмады.',report_present:'Келді'},en:{checked:'Attendance',present:'Present',checkin:'Check in',qr:'Check-in QR',reminder:'Copy reminder',reminder_ok:'Reminder copied',checkin_title:'Check in on site',checkin_hint:'Enter the email or phone used when registering.',checkin_done:'You are checked in. Thank you!',checkin_fail:'Registration not found.',report_present:'Present'}};return(copy[lang]||copy.ru)[key]||key;}
function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return esc(s).replace(/"/g, '\u0026quot;').replace(/'/g, '\u0026#39;'); }
function fmtDate(d) { return new Date(d).toLocaleDateString(lang === 'kz' ? 'kk-KZ' : lang === 'en' ? 'en-GB' : 'ru-RU', {day:'numeric', month:'long', year:'numeric'}); }
function showMsg(id, text, isErr) { var el = document.getElementById(id); if (el) el.innerHTML = '<div class="msg ' + (isErr ? 'msg-err' : 'msg-ok') + '">' + esc(text) + '</div>'; }
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
    'lang-tag': 'tagline', 'lang-hero-overline': 'hero_overline', 'lang-hero-title-1': 'hero_title_1',
    'lang-hero-title-2': 'hero_title_2', 'lang-hero-cta': 'hero_cta', 'lang-nav-feedback': 'nav_feedback',
    'lang-nav-login': 'btn_login', 'lang-nav-coordinators': 'nav_coordinators',
    'lang-nav-events': 'events_title', 'lang-nav-passport': 'passport_title', 'lang-nav-impact': 'impact_title',
    'lang-hero-passport': 'passport_title', 'lang-about-title': 'about_title', 'lang-about-text': 'about_text',
    'lang-events-title': 'events_title', 'lang-how-title': 'how_title', 'lang-step1': 'step1',
    'lang-step2': 'step2', 'lang-step3': 'step3', 'lang-coord-title': 'coordinator_title',
    'tabLogin': 'login_tab', 'tabRegister': 'register_tab', 'lang-lbl-email': 'email_lbl',
    'lang-lbl-password': 'password_lbl', 'lang-lbl-reg-email': 'reg_email_lbl',
    'lang-lbl-reg-password': 'reg_password_lbl', 'lang-lbl-reg-password2': 'reg_password2_lbl',
    'lang-btn-login': 'btn_login', 'lang-btn-register': 'btn_register', 'lang-reg-note': 'reg_note',
    'lang-add-title': 'add_title', 'lang-lbl-title': 'title_lbl', 'lang-lbl-city': 'city_lbl',
    'lang-lbl-date': 'date_lbl', 'lang-lbl-cat': 'category_lbl', 'lang-lbl-desc': 'desc_lbl',
    'lang-lbl-spots': 'spots_lbl', 'lang-btn-add': 'add_btn', 'lang-dash-btn': 'dash_btn',
    'lang-fb-title': 'feedback_title', 'lang-lbl-name': 'name_lbl', 'lang-lbl-role': 'role_lbl',
    'lang-lbl-rating': 'rating_lbl', 'lang-lbl-text': 'text_lbl', 'lang-btn-send': 'send_btn',
    'lang-footer': 'footer', 'lang-passport-title': 'passport_title', 'lang-passport-btn': 'passport_btn',
    'lang-top-title': 'top_title', 'lang-impact-title': 'impact_title', 'lang-sort-label': 'sort_label',
    'lang-date-label': 'date_label'
  };
  document.getElementById('lang-about-title').textContent = COMPANY.program;
  for (var id in map) { var el = document.getElementById(id); if (el && map[id]) el.textContent = T[lang][map[id]]; }
  document.getElementById('fbRole').placeholder = T[lang].role_ph;
  document.getElementById('ppContact').placeholder = T[lang].passport_contact;
  document.getElementById('searchInput').placeholder = T[lang].search_ph;
  document.querySelectorAll('#evCategory option').forEach(function(o) { o.textContent = T[lang]['cat_' + o.value] || o.value; });
  document.querySelectorAll('#fbRating option').forEach(function(o) { o.textContent = T[lang]['rating_' + o.value] || o.value; });
  // sort/date options
  var sortOpts = document.getElementById('sortSelect');
  var sorts = t('sort_options').split(',');
  ['sort_date', 'sort_popular', 'sort_spots'].forEach(function(k, i) { if (sortOpts.options[i]) sortOpts.options[i].textContent = sorts[i] || t(k); });
  var dateOpts = document.getElementById('dateFilter');
  var dates = t('date_options').split(',');
  ['date_all', 'date_future', 'date_past', 'date_week', 'date_month'].forEach(function(k, i) { if (dateOpts.options[i]) dateOpts.options[i].textContent = dates[i] || t(k); });
}

function uiIcon(name, className) {
  var paths = {
    leaf: '<path d="M19 4C10 4 5 8.5 5 15c0 2.5 1.2 4.2 2.5 5C14 20 19 14.5 19 4Z"/><path d="M4 20c3.5-4.2 7.5-6.9 12-9"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3.5 20c.5-3.5 2.5-5.5 5.5-5.5s5 2 5.5 5.5M16 5.5a3 3 0 0 1 0 5.7M18.5 20c-.2-2.2-1.1-3.8-2.8-4.7"/>',
    paw: '<circle cx="7" cy="8" r="1.5"/><circle cx="12" cy="5.5" r="1.5"/><circle cx="17" cy="8" r="1.5"/><path d="M8 18c0-3 1.7-5 4-5s4 2 4 5c0 1.2-.9 2-2 2H10c-1.1 0-2-.8-2-2Z"/>',
    heart: '<path d="M20 8.5C20 14 12 19 12 19S4 14 4 8.5C4 6 5.8 4.5 8 4.5c1.7 0 3.1.9 4 2.2.9-1.3 2.3-2.2 4-2.2 2.2 0 4 1.5 4 4Z"/>',
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 4H12v16H7.5A3.5 3.5 0 0 0 4 23V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 4H12v16h4.5A3.5 3.5 0 0 1 20 23V5.5Z"/>',
    link: '<path d="M10 13.8a4.2 4.2 0 0 0 6.1.1l2-2a4.2 4.2 0 0 0-5.9-5.9l-1.1 1.1"/><path d="M14 10.2a4.2 4.2 0 0 0-6.1-.1l-2 2a4.2 4.2 0 1 0 5.9 5.9l1.1-1.1"/>',
    calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
    award: '<circle cx="12" cy="8" r="4"/><path d="m8.5 12-1.5 8 5-2.5 5 2.5-1.5-8"/>',
    trash: '<path d="M4 7h16M10 11v5M14 11v5M9 7l1-3h4l1 3M6 7l1 14h10l1-14"/>'
  };
  return '<svg class="ui-icon ' + (className || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.leaf) + '</svg>';
}
function categoryIcon(cat) {
  var map = { 'Экология': 'leaf', 'Дети': 'users', 'Животные': 'paw', 'Пожилые': 'users', 'Образование': 'book', 'Здоровье': 'heart', 'Поддержка семьи': 'users' };
  return uiIcon(map[cat] || 'leaf');
}

function renderStats() {
  var total = EVENTS.length;
  var signed = EVENTS.reduce(function(s, e) { return s + e.signups.filter(isConfirmed).length; }, 0);
  var free = EVENTS.reduce(function(s, e) { return s + Math.max(0, (e.spots || 0) - e.signups.filter(isConfirmed).length); }, 0);
  document.getElementById('stats').innerHTML =
    '<div class="stat-item"><b>' + total + '</b><span>' + t('events_count') + '</span></div>' +
    '<div class="stat-item"><b>' + signed + '</b><span>' + t('volunteers') + '</span></div>' +
    '<div class="stat-item"><b>' + free + '</b><span>' + t('spots_free') + '</span></div>';
}

function renderImpact() {
  var attended = [];
  EVENTS.forEach(function(e) { e.signups.forEach(function(s) { if (s.checked_in_at) attended.push(s); }); });
  var hours = attended.reduce(function(sum, s) { return sum + verifiedHours(s); }, 0);
  var people = Object.keys(attended.reduce(function(acc, s) { acc[String(s.contact).trim().toLowerCase()] = 1; return acc; }, {})).length;
  var events = EVENTS.length;
  var cities = Object.keys(EVENTS.reduce(function(acc, e) { acc[e.city] = 1; return acc; }, {})).length;
  document.getElementById('impact').innerHTML =
    '<div class="impact-card"><b>' + hours + '</b><span>' + t('impact_hours') + '</span></div>' +
    '<div class="impact-card"><b>' + people + '</b><span>' + t('impact_people') + '</span></div>' +
    '<div class="impact-card"><b>' + events + '</b><span>' + t('impact_events') + '</span></div>' +
    '<div class="impact-card"><b>' + cities + '</b><span>' + t('impact_cities') + '</span></div>';
}

function openAuth(tab) {
  if (isCoord) {
    var dashboard = document.getElementById('dashboard');
    dashboard.classList.remove('hidden');
    dashboard.scrollIntoView({behavior:'smooth', block:'start'});
    return;
  }
  tab = tab || 'login';
  showAuthTab(tab);
  var dialog = document.getElementById('authDialog');
  if (!dialog.open) dialog.showModal();
  setTimeout(function() { document.getElementById(tab === 'register' ? 'coordRegEmail' : 'coordEmail').focus(); }, 30);
}

function isConfirmed(signup) { return !signup.status || signup.status === 'confirmed'; }
function verifiedHours(signup) { return signup && signup.checked_in_at ? Number(signup.volunteer_hours || 0) : 0; }
function formatHours(value) { var n = Number(value || 0); return Number.isInteger(n) ? String(n) : n.toFixed(1); }
function closeAuth() { var dialog = document.getElementById('authDialog'); if (dialog && dialog.open) dialog.close(); }
function renderListing(withFilters) { if (withFilters) renderFilters(); renderEvents(); }
function setCity(i) { CITY = CITIES[i]; renderListing(true); }
function setCategory(i) { CATEGORY = CATEGORIES[i]; renderListing(true); }
function setDateFilter() { DATE_FILTER = document.getElementById('dateFilter').value; renderListing(false); }
function doSort() { SORT = document.getElementById('sortSelect').value; renderListing(false); }

function renderFilters() {
  CITIES = ['all'];
  CATEGORIES = ['all', 'Экология', 'Дети', 'Животные', 'Пожилые', 'Образование', 'Здоровье', 'Поддержка семьи'];
  EVENTS.forEach(function(e) { if (CITIES.indexOf(e.city) === -1) CITIES.push(e.city); if (CATEGORIES.indexOf(e.category) === -1) CATEGORIES.push(e.category); });
  var cityHtml = CITIES.map(function(c, i) {
    return '<button type="button" class="chip ' + (CITY === c ? 'active' : '') + '" aria-pressed="' + (CITY === c) + '" onclick="setCity(' + i + ')">' + (c === 'all' ? t('all') : esc(c)) + '</button>';
  }).join('');
  document.getElementById('filters').innerHTML = cityHtml;
  var catHtml = CATEGORIES.map(function(c, i) {
    return '<button type="button" class="chip ' + (CATEGORY === c ? 'active' : '') + '" aria-pressed="' + (CATEGORY === c) + '" onclick="setCategory(' + i + ')">' + (c === 'all' ? t('all') : categoryIcon(c) + ' ' + esc(T[lang]['cat_' + c] || c)) + '</button>';
  }).join('');
  document.getElementById('categoryChips').innerHTML = catHtml;
}

function inDateFilter(d) {
  if (DATE_FILTER === 'all') return true;
  if (DATE_FILTER === 'future') return d >= today;
  if (DATE_FILTER === 'past') return d < today;
  var ev = new Date(d), now = new Date();
  if (DATE_FILTER === 'week') {
    var start = new Date(now); start.setDate(now.getDate() - now.getDay());
    var end = new Date(start); end.setDate(start.getDate() + 7);
    return ev >= start && ev < end;
  }
  if (DATE_FILTER === 'month') return ev.getFullYear() === now.getFullYear() && ev.getMonth() === now.getMonth();
  return true;
}

function renderEvents() {
  var sorted = EVENTS.slice().sort(function(a, b) {
    var fa = a.date < today, fb = b.date < today;
    if (SORT === 'popular') return b.signups.length - a.signups.length;
    if (SORT === 'spots') return (b.spots - b.signups.length) - (a.spots - a.signups.length);
    if (fa !== fb) return fa ? 1 : -1;
    return fa ? (b.date > a.date ? 1 : -1) : (a.date > b.date ? 1 : -1);
  });
  var filtered = sorted.filter(function(e) {
    var cityOk = CITY === 'all' || e.city === CITY;
    var catOk = CATEGORY === 'all' || e.category === CATEGORY;
    var dateOk = inDateFilter(e.date);
    var q = SEARCH.trim().toLowerCase();
    var searchOk = !q || (e.title + ' ' + e.description + ' ' + e.city).toLowerCase().indexOf(q) !== -1;
    return cityOk && catOk && dateOk && searchOk;
  });
  var html;
  if (!filtered.length) {
    html = '<div class="card empty"><div class="empty-icon">' + uiIcon('leaf') + '</div><h3>' + (SEARCH ? t('empty_search') : t('empty_events')) + '</h3></div>';
  } else {
    html = filtered.map(function(e) {
      var confirmed = e.signups.filter(function(s) { return !s.status || s.status === 'confirmed'; });
      var signed = confirmed.length;
      var left = Math.max(0, (e.spots || 0) - signed);
      var full = left <= 0;
      var past = e.date < today;
      var few = !full && !past && left / e.spots <= 0.2;
      var names = confirmed.slice(0, 3).map(function(s) { return esc(s.name); }).join(', ');
      var social = signed > 0 ? '<p class="social">' + names + (signed > 3 ? ' +' + (signed - 3) + ' ' + t('more') : '') + '</p>' : '';
      return '<div class="event-card' + (past ? ' past' : '') + '" id="ev-' + e.id + '">' +
        '<h3>' + esc(e.title) + '</h3>' +
        '<div class="meta"><span>' + esc(e.city) + '</span><span>' + fmtDate(e.date) + '</span>' +
        '<span class="cat">' + categoryIcon(e.category) + ' ' + esc(T[lang]['cat_' + e.category] || e.category) + '</span><span>' + t('spots') + ': ' + e.spots + '</span></div>' +
        '<p class="desc">' + esc(e.description) + '</p>' +
        '<p class="signups">' + t('signed') + ': ' + signed + ' \u00b7 ' + t('left') + ': ' + left + ' ' + t('from') + ' ' + e.spots + '</p>' +
        (past ? '<p class="full">' + t('past') + '</p>' : '') +
        (full && !past ? '<p class="full">' + t('no_spots') + '</p>' : '') +
        (few ? '<p class="few">' + t('few_left') + '</p>' : '') +
        social +
        '<div class="actions">' +
          '<button type="button" class="btn" id="signupToggle-' + e.id + '" aria-controls="signup-' + e.id + '" aria-expanded="false" ' + (past ? 'disabled' : '') + ' onclick="toggleSignup(' + e.id + ')">' + (past ? t('past') : (full ? t('waitlist_btn') : t('signup'))) + '</button>' +
          '<button class="btn-ghost btn-small" onclick="shareEvent(' + e.id + ')">' + uiIcon('link') + ' ' + t('share') + '</button>' +
          '<button class="btn-wa btn-small" onclick="shareWA(' + e.id + ')">' + t('wa_btn') + '</button>' +
          '<button class="btn-tg btn-small" onclick="shareTG(' + e.id + ')">' + t('tg_btn') + '</button>' +
          '<button class="btn-cal btn-small" onclick="downloadICS(' + e.id + ')">' + uiIcon('calendar') + ' ' + t('cal_btn') + '</button>' +
        '</div>' +
        '<form class="signup-form" id="signup-' + e.id + '" onsubmit="doSignup(' + e.id + ', event)">' +
          '<label for="name-' + e.id + '">' + esc(t('your_name')) + '</label>' +
          '<input placeholder="' + escAttr(t('your_name')) + '" id="name-' + e.id + '" autocomplete="name" maxlength="120" required>' +
          '<label for="contact-' + e.id + '">' + esc(t('email_phone')) + '</label>' +
          '<input placeholder="' + escAttr(t('email_phone')) + '" id="contact-' + e.id + '" autocomplete="email" maxlength="160" required>' +
          '<button type="submit" class="btn btn-small" id="signupBtn-' + e.id + '">' + t('confirm') + '</button>' +
          '<span id="signupMsg-' + e.id + '" role="status" aria-live="polite"></span>' +
        '</form>' +
      '</div>';
    }).join('');
  }
  document.getElementById('events').innerHTML = html;
}

function renderDash() {
  var dashBtn = document.getElementById('dashBtn'), dash = document.getElementById('dashboard');
  dashBtn.classList.toggle('hidden', !isCoord);
  if (!isCoord) { dash.classList.add('hidden'); return; }
  var all = []; EVENTS.forEach(function(e) { e.signups.forEach(function(s) { all.push({event:e, signup:s}); }); });
  var confirmed = all.filter(function(x) { return isConfirmed(x.signup); });
  var waiting = all.filter(function(x) { return x.signup.status === 'waitlist'; });
  var noShows = all.filter(function(x) { return x.signup.status === 'no_show'; });
  var checked = confirmed.filter(function(x) { return !!x.signup.checked_in_at; });
  var verifiedTotal = checked.reduce(function(sum, x) { return sum + verifiedHours(x.signup); }, 0);
  var totalSpots = EVENTS.reduce(function(sum, e) { return sum + Number(e.spots || 0); }, 0);
  var fill = totalSpots ? Math.round(confirmed.length / totalSpots * 100) : 0;
  var attendance = confirmed.length ? Math.round(checked.length / confirmed.length * 100) : 0;
  var upcoming = EVENTS.filter(function(e) { return e.date >= today; }).sort(function(a,b) { return a.date.localeCompare(b.date); });
  var risks = upcoming.filter(function(e) { return e.signups.filter(isConfirmed).length / Math.max(1, e.spots) < .55; }).slice(0, 3);
  var html = '<div class="coord-shell"><div class="coord-topline"><div><p>Кабинет координатора</p><h2>Волонтёрская программа</h2></div><div class="coord-actions"><button class="btn btn-outline btn-small" onclick="copyReport()">Скопировать отчёт</button><button class="btn btn-outline btn-small" onclick="logoutCoord()">' + t('logout') + '</button></div></div>';
  html += '<div class="coord-kpi-grid"><div class="coord-kpi"><span>Подтверждённые записи</span><b>' + confirmed.length + '</b><small>из ' + totalSpots + ' мест</small></div><div class="coord-kpi"><span>Средняя загрузка</span><b>' + fill + '%</b><small>' + EVENTS.length + ' событий</small></div><div class="coord-kpi"><span>Резервный список</span><b>' + waiting.length + '</b><small>' + noShows.length + ' no-show</small></div><div class="coord-kpi"><span>Проверенный impact</span><b>' + formatHours(verifiedTotal) + ' ч</b><small>' + checked.length + ' участников с check-in</small></div></div>';
  html += '<div class="coord-grid"><section class="coord-panel"><h3>Загрузка ближайших событий</h3><p>Сразу видно, где нужен дополнительный набор.</p>';
  if (upcoming.length) html += upcoming.slice(0,5).map(function(e) { var used = e.signups.filter(isConfirmed).length, pct = Math.min(100, Math.round(used / Math.max(1,e.spots) * 100)); return '<div class="load-row"><div><b>' + esc(e.title) + '</b><span>' + esc(e.city) + ' · ' + fmtDate(e.date) + '</span></div><div class="load-track"><i style="width:' + pct + '%"></i></div><strong>' + used + '/' + e.spots + '</strong></div>'; }).join(''); else html += '<p>Пока нет будущих событий.</p>';
  html += '</section><section class="coord-panel"><h3>Посещаемость</h3><p>По отметкам на площадке.</p><div class="attendance"><div class="attendance-ring" style="--attendance:' + attendance + '%"><b>' + attendance + '%</b></div><div class="attendance-copy"><b>' + checked.length + '</b><span>отметились из ' + confirmed.length + ' подтверждённых</span></div></div></section></div>';
  if (risks.length) html += '<section class="coord-risk"><h3>Требуют внимания</h3>' + risks.map(function(e) { var used=e.signups.filter(isConfirmed).length; return '<div class="coord-risk-row"><div><strong>' + esc(e.title) + '</strong><small>' + fmtDate(e.date) + ' · ' + esc(e.city) + '</small></div><b>' + used + '/' + e.spots + ' мест</b></div>'; }).join('') + '</section>';
  html += '<div class="coord-event-list">' + EVENTS.map(function(e) {
    var eventConfirmed=e.signups.filter(isConfirmed), eventWait=e.signups.filter(function(s){return s.status==='waitlist';}), eventNoShow=e.signups.filter(function(s){return s.status==='no_show';}), eventFill=Math.round(eventConfirmed.length/Math.max(1,e.spots)*100);
    var rows = eventConfirmed.map(function(s){
      var done=!!s.checked_in_at, hours=done ? verifiedHours(s) : Number(e.default_hours || 3);
      var cert = done && s.certificate_code ? '<a class="coord-cert-link" href="' + escAttr(certificateUrl(s.certificate_code)) + '" target="_blank">Сертификат</a>' : '';
      return '<tr><td><b>' + esc(s.name) + '</b><small class="coord-person-meta">' + esc(s.contact) + '</small></td><td><label class="hours-control"><input id="hours-' + s.id + '" type="number" min="0.5" max="24" step="0.5" value="' + hours + '"><span>ч</span></label></td><td><div class="row-actions"><button class="btn btn-small" onclick="checkInSignup(' + e.id + ',' + s.id + ')">' + (done ? 'Обновить часы' : 'Подтвердить') + '</button>' + (!done ? '<button class="btn btn-outline btn-small" onclick="markNoShow(' + e.id + ',' + s.id + ')">No-show</button>' : '') + cert + '</div></td></tr>';
    }).join('');
    var waitRows = eventWait.map(function(s){return '<li><span><b>'+esc(s.name)+'</b><small>'+esc(s.contact)+'</small></span><button class="btn btn-outline btn-small" onclick="promoteWaitlist(' + e.id + ',' + s.id + ')">Дать место</button></li>';}).join('');
    return '<article class="coord-event"><div class="coord-event-head"><div><h3>' + esc(e.title) + '</h3><p>' + esc(e.city) + ' · ' + fmtDate(e.date) + ' · ' + eventConfirmed.length + '/' + e.spots + ' мест · план ' + formatHours(e.default_hours || 3) + ' ч</p></div><span class="coord-status' + (eventWait.length ? ' wait' : '') + '">' + (eventWait.length ? eventWait.length + ' в резерве' : eventFill + '% заполнено') + '</span></div><div class="bar-bg"><div class="bar-fill" style="width:' + Math.min(100,eventFill) + '%"></div></div>' + (rows ? '<div class="coord-table-wrap"><table class="attendance-table"><tr><th>Участник</th><th>Часы</th><th>Attendance</th></tr>' + rows + '</table></div>' : '<p>Пока нет подтверждённых участников.</p>') + (waitRows ? '<div class="waitlist-block"><h4>Резерв — следующий автоматически получает место при no-show</h4><ul>' + waitRows + '</ul></div>' : '') + (eventNoShow.length ? '<p class="no-show-note">No-show: ' + eventNoShow.length + '</p>' : '') + '<div class="coord-event-actions"><button class="btn btn-small" onclick="showCheckinQR(' + e.id + ')">QR для check-in</button><button class="btn btn-outline btn-small" onclick="copyReminder(' + e.id + ')">Напоминание</button><button class="btn btn-outline btn-small" onclick="downloadCSV(' + e.id + ')">CSV</button><button class="btn btn-outline btn-small" onclick="startEdit(' + e.id + ')">Изменить</button></div></article>';
  }).join('') + '</div></div>';
  dash.innerHTML = html;
}

function renderPassport() { /* on lookup */ }
function renderTop() {
  var map = {};
  EVENTS.forEach(function(e) { e.signups.forEach(function(s) { var n = s.name.trim(); map[n] = (map[n] || 0) + 1; }); });
  var sorted = Object.keys(map).map(function(n) { return [n, map[n]]; }).sort(function(a, b) { return b[1] - a[1]; });
  var html = '';
  if (!sorted.length) {
    html = '<div class="card empty"><div class="empty-icon">' + uiIcon('leaf') + '</div><h3>' + t('empty_top') + '</h3></div>';
  } else {
    var top = sorted.slice(0, 3);
    var rest = sorted.slice(3);
    html += '<div class="podium">';
    if (top[1]) html += '<div class="podium-item second"><div class="rank-mark">02</div><div class="name">' + esc(top[1][0]) + '</div><div class="count">' + top[1][1] + ' ' + t('events_count') + '</div></div>';
    if (top[0]) html += '<div class="podium-item first"><div class="rank-mark">01</div><div class="name">' + esc(top[0][0]) + '</div><div class="count">' + top[0][1] + ' ' + t('events_count') + '</div></div>';
    if (top[2]) html += '<div class="podium-item third"><div class="rank-mark">03</div><div class="name">' + esc(top[2][0]) + '</div><div class="count">' + top[2][1] + ' ' + t('events_count') + '</div></div>';
    html += '</div>';
    if (rest.length) {
      html += '<div class="leader-list"><ol>' + rest.map(function(x) { return '<li><span>' + esc(x[0]) + '</span><b>' + x[1] + ' ' + t('events_count') + '</b></li>'; }).join('') + '</ol></div>';
    }
  }
  document.getElementById('topResults').innerHTML = html;
}

function render() { renderStats(); renderImpact(); renderFilters(); renderEvents(); renderDash(); renderTop(); }

function toggleSignup(id) { var form = document.getElementById('signup-' + id), button = document.getElementById('signupToggle-' + id); var open = form.classList.toggle('open'); if (button) button.setAttribute('aria-expanded', String(open)); if (open) document.getElementById('name-' + id).focus(); }

async function checkInSignup(eventId,signupId){
  var ev=EVENTS.find(function(e){return e.id===eventId;}),s=ev&&ev.signups.find(function(x){return x.id===signupId;}),input=document.getElementById('hours-'+signupId),hours=Number(input&&input.value);
  if(!s||!hours||hours<0.5||hours>24){alert('Укажите фактические часы от 0.5 до 24.');return;}
  var checkedAt=s.checked_in_at||new Date().toISOString();
  var resp=await supabase.from('signups').update({checked_in_at:checkedAt,volunteer_hours:hours}).eq('id',signupId);
  if(resp.error){alert('Check-in unavailable: apply the database migration first.');return;}
  s.checked_in_at=checkedAt;s.volunteer_hours=hours;
  var code=await issueCertificate(s);
  render();
  if(code) alert('Участие подтверждено на '+formatHours(hours)+' ч. Сертификат готов: '+certificateUrl(code));
}
async function markNoShow(eventId,signupId){
  if(!confirm('Отметить участника как no-show? Первому человеку из резерва автоматически будет предложено место.'))return;
  var resp=await supabase.from('signups').update({status:'no_show',checked_in_at:null,volunteer_hours:null,certificate_code:null,certificate_issued_at:null}).eq('id',signupId);
  if(resp.error){alert('Не удалось отметить no-show: '+resp.error.message);return;}
  await loadEvents();
}
async function promoteWaitlist(eventId,signupId){
  var ev=EVENTS.find(function(e){return e.id===eventId;}),confirmed=ev?ev.signups.filter(isConfirmed).length:0;
  if(ev&&confirmed>=ev.spots&&!confirm('Событие уже заполнено. Всё равно дать место этому участнику?'))return;
  var resp=await supabase.from('signups').update({status:'confirmed'}).eq('id',signupId);
  if(resp.error){alert('Не удалось перевести из резерва: '+resp.error.message);return;}
  await loadEvents();
}
function showCheckinQR(eventId){var ev=EVENTS.find(function(e){return e.id===eventId;});if(!ev)return;var url=location.origin+location.pathname+'?checkin='+eventId,img=document.getElementById('qrImage');document.getElementById('qrTitle').textContent=ci('qr')+': '+ev.title;img.hidden=false;img.onerror=function(){img.hidden=true;};img.src='https://api.qrserver.com/v1/create-qr-code/?size=280x280&data='+encodeURIComponent(url);document.getElementById('qrLink').textContent=url;document.getElementById('qrLink').href=url;document.getElementById('qrDialog').showModal();}
function closeQR(){document.getElementById('qrDialog').close();}
function copyReminder(eventId){var ev=EVENTS.find(function(e){return e.id===eventId;});if(!ev)return;var text='Напоминание: «'+ev.title+'» — '+fmtDate(ev.date)+', '+ev.city+'. Пожалуйста, подтвердите участие и отметьтесь на площадке через QR-код.';navigator.clipboard.writeText(text).then(function(){alert(ci('reminder_ok'));});}
function renderCheckinGate(){var eventId=Number(new URLSearchParams(location.search).get('checkin')),gate=document.getElementById('checkinGate');if(!eventId||!gate)return;var ev=EVENTS.find(function(e){return e.id===eventId;});if(!ev)return;gate.classList.remove('hidden');gate.innerHTML='<div class="checkin-gate"><div><p class="checkin-kicker">'+ci('checkin_title')+'</p><h2>'+esc(ev.title)+'</h2><p>'+esc(ev.city)+' · '+fmtDate(ev.date)+'</p></div><div class="checkin-form"><label>'+ci('checkin_hint')+'</label><input id="checkinContact" type="text" placeholder="Email или телефон"><button class="btn" onclick="selfCheckIn('+ev.id+')">'+ci('checkin')+'</button><div id="checkinMsg"></div></div></div>';}
async function selfCheckIn(eventId){var contact=(document.getElementById('checkinContact').value||'').trim().toLowerCase(),ev=EVENTS.find(function(e){return e.id===eventId;}),signup=ev&&ev.signups.find(function(s){return String(s.contact).trim().toLowerCase()===contact&&isConfirmed(s);}),msg=document.getElementById('checkinMsg');if(!signup){msg.textContent=ci('checkin_fail');msg.className='msg msg-err';return;}msg.textContent='Регистрация найдена. Покажите экран координатору: он подтвердит attendance и фактические часы.';msg.className='msg msg-ok';}

async function doSignup(id, submitEvent) {
  if (submitEvent) submitEvent.preventDefault();
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
    var confirmedCount = ev ? ev.signups.filter(function(s) { return !s.status || s.status === 'confirmed'; }).length : 0;
    var signupStatus = ev && confirmedCount >= ev.spots ? 'waitlist' : 'confirmed';
    var resp = await supabase.from('signups').insert({event_id: id, name: name, contact: contact, status: signupStatus}).select();
    if (resp.error) { showMsg('signupMsg-' + id, resp.error.message, true); return; }
    document.getElementById('signupMsg-' + id).innerHTML = '<span class="msg msg-ok">' + (signupStatus === 'waitlist' ? t('waitlist_ok') : t('signed_up') + ' ' + t('cert_after_attendance')) + '</span>';
    confetti();
    document.getElementById('name-' + id).value = '';
    document.getElementById('contact-' + id).value = '';
    setTimeout(loadEvents, 2500);
  } catch (err) { netMsg('signupMsg-' + id); }
  finally { setElementDisabled(btn, false); }
}

function showAuthTab(tab) {
  document.getElementById('loginForm').classList.toggle('active', tab === 'login');
  document.getElementById('registerForm').classList.toggle('active', tab === 'register');
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
}

async function checkApproved(email) {
  try {
    var resp = await supabase.from('coordinator_requests').select('approved').eq('email', email).maybeSingle();
    if (resp.error) { return false; }
    return resp.data && resp.data.approved;
  } catch (err) { return false; }
}

async function loginCoord(e) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('button[type="submit"]');
  setElementDisabled(btn, true);
  try {
    var email = document.getElementById('coordEmail').value.trim();
    var password = document.getElementById('coordPassword').value;
    var resp = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (resp.error) { showMsg('loginMsg', t('invalid_auth'), true); return; }
    var approved = await checkApproved(email);
    if (!approved) { showMsg('loginMsg', t('no_approved'), true); await supabase.auth.signOut(); return; }
    user = resp.data.user;
    coordEmail = email;
    sessionStorage.setItem('coordEmail', email);
    isCoord = true;
    showMsg('loginMsg', '', false);
    closeAuth();
    document.getElementById('addEventSection').classList.remove('hidden');
    render();
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('dashboard').scrollIntoView({behavior:'smooth', block:'start'});
  } catch (err) { netMsg('loginMsg'); }
  finally { setElementDisabled(btn, false); }
}

async function registerCoord(e) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('button[type="submit"]');
  setElementDisabled(btn, true);
  try {
    var email = document.getElementById('coordRegEmail').value.trim();
    var password = document.getElementById('coordRegPassword').value;
    var password2 = document.getElementById('coordRegPassword2').value;
    if (password !== password2) { showMsg('registerMsg', t('password_match'), true); return; }
    var resp = await supabase.auth.signUp({ email: email, password: password });
    if (resp.error) {
      if (resp.error.message && resp.error.message.toLowerCase().indexOf('already') !== -1) showMsg('registerMsg', t('email_exists'), true);
      else showMsg('registerMsg', resp.error.message, true);
      return;
    }
    // insert request
    var req = await supabase.from('coordinator_requests').insert({ email: email, approved: false });
    if (req.error) { showMsg('registerMsg', req.error.message, true); return; }
    showMsg('registerMsg', t('register_ok'), false);
    form.reset();
  } catch (err) { netMsg('registerMsg'); }
  finally { setElementDisabled(btn, false); }
}

async function logoutCoord() {
  try { await supabase.auth.signOut(); } catch (err) {}
  user = null;
  coordEmail = '';
  sessionStorage.removeItem('coordEmail');
  isCoord = false;
  document.getElementById('addEventSection').classList.add('hidden');
  closeAuth();
  render();
}

function toggleAddEvent() { document.getElementById('addEventSection').classList.toggle('hidden'); }

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
  document.getElementById('evHours').value = ev.default_hours || 3;
  document.getElementById('lang-add-title').textContent = t('edit_btn');
  document.getElementById('lang-btn-add').textContent = t('save_btn');
  document.getElementById('addEventSection').classList.remove('hidden');
  document.getElementById('addEventSection').scrollIntoView({behavior:'smooth'});
}
function clearEdit() {
  editingId = null;
  document.getElementById('addEventForm').reset();
  document.getElementById('lang-add-title').textContent = t('add_title');
  document.getElementById('lang-btn-add').textContent = t('add_btn');
}

async function addEvent(e) {
  e.preventDefault();
  if (!isCoord) { showMsg('evMsg', t('no_approved'), true); return; }
  var form = e.target;
  var btn = form.querySelector('button[type="submit"]');
  setElementDisabled(btn, true);
  try {
    var ev = {
      title: document.getElementById('evTitle').value.trim(),
      city: document.getElementById('evCity').value.trim(),
      date: document.getElementById('evDate').value,
      category: document.getElementById('evCategory').value,
      description: document.getElementById('evDesc').value.trim(),
      spots: parseInt(document.getElementById('evSpots').value) || 20,
      default_hours: Number(document.getElementById('evHours').value) || 3
    };
    var resp;
    if (editingId) {
      resp = await supabase.from('events').update(ev).eq('id', editingId);
      if (resp.error) { canEdit = false; showMsg('evMsg', t('edit_unavail') + ': ' + resp.error.message, true); return; }
      showMsg('evMsg', t('event_saved'), false);
    } else {
      resp = await supabase.from('events').insert(ev);
      if (resp.error) { showMsg('evMsg', resp.error.message, true); return; }
      showMsg('evMsg', t('event_added'), false);
    }
    clearEdit();
    document.getElementById('addEventSection').classList.add('hidden');
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
    var mine = [];
    EVENTS.forEach(function(eventItem) { eventItem.signups.forEach(function(signup) { if (String(signup.contact).toLowerCase().trim() === contact) mine.push({event:eventItem,signup:signup}); }); });
    var html = '';
    if (!mine.length) {
      html = '<div class="card empty"><div class="empty-icon">' + uiIcon('leaf') + '</div><h3>' + t('empty_passport') + '</h3></div>';
    } else {
      var completed = mine.filter(function(x) { return !!x.signup.checked_in_at; });
      var hours = completed.reduce(function(sum,x){return sum+verifiedHours(x.signup);},0);
      var level = completed.length < 3 ? 1 : completed.length < 5 ? 2 : 3;
      var levelKey = level === 1 ? 'level_1' : level === 2 ? 'level_2' : 'level_3';
      var levelIcon = level === 1 ? 'leaf' : level === 2 ? 'users' : 'award';
      var next = level === 1 ? 3 - completed.length : level === 2 ? 5 - completed.length : 0;
      html += '<div class="card level-card"><div class="level-icon">' + uiIcon(levelIcon) + '</div><h3>' + t(levelKey) + '</h3><p><b>' + completed.length + '</b> подтверждённых событий · <b>' + formatHours(hours) + '</b> ' + t('passport_hours') + '</p>';
      if (next > 0) html += '<div class="progress"><div class="progress-fill" style="width:' + (completed.length/(completed.length+next)*100) + '%"></div></div><p class="next">' + t('next_level').replace('N', next) + '</p>';
      html += '</div>';
      html += mine.map(function(x) {
        var eventItem=x.event,signup=x.signup,done=!!signup.checked_in_at,status=signup.status==='waitlist'?'Резерв':signup.status==='no_show'?'No-show':done?'Участие подтверждено · '+formatHours(verifiedHours(signup))+' ч':'Регистрация подтверждена';
        var certificate=done&&signup.certificate_code?'<a class="btn btn-cert" href="'+escAttr(certificateUrl(signup.certificate_code))+'" target="_blank">'+uiIcon('award')+' '+t('cert_btn')+'</a>':'<span class="certificate-pending">Сертификат после attendance</span>';
        return '<div class="card"><h3>' + esc(eventItem.title) + '</h3><p class="meta">' + esc(eventItem.city) + ' \u00b7 ' + fmtDate(eventItem.date) + '</p><p class="passport-status">'+esc(status)+'</p>' +
          '<div class="actions">' + certificate +
            (!done&&signup.status!=='no_show'?'<button class="btn btn-outline" data-id="' + eventItem.id + '" data-contact="' + escAttr(signup.contact) + '" onclick="cancelSignup(this.dataset.id, this.dataset.contact)">' + t('cancel_btn') + '</button>':'') +
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
  var csv = '\uFEFFName,Contact,Status,Checked in,Volunteer hours,Certificate\r\n' + ev.signups.map(function(s) { return [s.name,s.contact,s.status||'confirmed',s.checked_in_at||'',verifiedHours(s)||'',s.certificate_code||''].map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(','); }).join('\r\n');
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
  var totalSigned = EVENTS.reduce(function(s, e) { return s + e.signups.filter(isConfirmed).length; }, 0);
  var checked = []; EVENTS.forEach(function(e){e.signups.forEach(function(s){if(s.checked_in_at)checked.push(s);});});
  var totalHours = checked.reduce(function(sum,s){return sum+verifiedHours(s);},0);
  var totalSpots = EVENTS.reduce(function(s, e) { return s + (e.spots || 0); }, 0);
  var avgFill = totalSpots ? Math.round(totalSigned / totalSpots * 100) : 0;
  var date = new Date().toLocaleDateString(lang === 'kz' ? 'kk-KZ' : lang === 'en' ? 'en-GB' : 'ru-RU');
  var lines = ['# ' + t('report_title') + ' — ' + date, '',
    '| ' + t('title_lbl') + ' | ' + t('city_lbl') + ' | ' + t('signed') + ' | ' + t('spots') + ' | ' + t('fill_rate') + ' |', '|---|---|---|---|---|'];
  EVENTS.forEach(function(e) {
    var count=e.signups.filter(isConfirmed).length, fill = (e.spots || 1) ? Math.round(count / (e.spots || 1) * 100) : 0;
    lines.push('| ' + e.title + ' | ' + e.city + ' | ' + count + ' | ' + e.spots + ' | ' + fill + '% |');
  });
  lines.push('', '**' + t('impact_events') + ':** ' + EVENTS.length + ' · **Регистрации:** ' + totalSigned + ' · **Подтверждено attendance:** ' + checked.length + ' · **' + t('passport_hours') + ':** ' + formatHours(totalHours) + ' · **' + t('fill_rate') + ':** ' + avgFill + '%');
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
  ctx.globalAlpha = 0.08; ctx.strokeStyle = COMPANY.color; ctx.lineWidth = 2;
  for (var i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(100 + i * 180, 180 + i * 90, 44, 0, Math.PI * 2); ctx.stroke(); }
  ctx.globalAlpha = 1;
  ctx.lineWidth = 12; ctx.strokeStyle = COMPANY.color; ctx.strokeRect(24, 24, 852, 592);
  ctx.lineWidth = 4; ctx.strokeStyle = '#74c69d'; ctx.strokeRect(36, 36, 828, 568);
  ctx.textAlign = 'center'; ctx.fillStyle = COMPANY.color; ctx.beginPath(); ctx.arc(450, 95, 24, 0, Math.PI * 2); ctx.fill();
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

function certificateUrl(code){return location.origin+location.pathname+'?certificate='+encodeURIComponent(code);}
async function issueCertificate(signup){if(signup.certificate_code)return signup.certificate_code;var code=crypto.randomUUID().replace(/-/g,'').slice(0,16).toUpperCase();var resp=await supabase.from('signups').update({certificate_code:code,certificate_issued_at:new Date().toISOString()}).eq('id',signup.id);if(resp.error)return null;signup.certificate_code=code;return code;}
async function renderCertificateVerification(){var code=new URLSearchParams(location.search).get('certificate'),view=document.getElementById('certificateView');if(!code||!view)return;view.classList.remove('hidden');view.innerHTML='<div class="certificate-shell"><p class="certificate-eyebrow">Volunteer Hub · Verified impact record</p><h1>Проверяем сертификат…</h1></div>';var resp=await supabase.from('signups').select('id,name,event_id,certificate_code,checked_in_at,volunteer_hours').eq('certificate_code',code).maybeSingle();if(resp.error||!resp.data||!resp.data.checked_in_at){view.innerHTML='<div class="certificate-shell certificate-invalid"><h1>Сертификат не найден</h1><p>Проверьте ссылку или обратитесь к координатору.</p></div>';return;}var signup=resp.data,ev=EVENTS.find(function(e){return e.id===signup.event_id;});if(!ev){view.innerHTML='<div class="certificate-shell certificate-invalid"><h1>Сертификат не найден</h1></div>';return;}view.innerHTML='<div class="certificate-shell"><p class="certificate-eyebrow">Volunteer Hub · Verified impact record</p><div class="certificate-stamp">ПРОВЕРЕНО</div><h1>Сертификат волонтёра</h1><p class="certificate-lead">Подтверждаем участие</p><h2>'+esc(signup.name)+'</h2><p class="certificate-event">в волонтёрском событии «'+esc(ev.title)+'»</p><p>'+esc(ev.city)+' · '+fmtDate(ev.date)+'</p><div class="certificate-hours"><b>'+formatHours(signup.volunteer_hours)+'</b><span>подтверждённых волонтёрских часов</span></div><div class="certificate-code">№ '+esc(signup.certificate_code)+'</div><p class="certificate-note">Участие и часы подтверждены координатором после check-in. Ссылка и код подходят для независимой проверки.</p><div class="actions certificate-actions"><button class="btn" onclick="window.print()">Печать / сохранить PDF</button><button class="btn btn-outline" onclick="navigator.clipboard.writeText(location.href)">Скопировать ссылку</button></div></div>';}
function confetti() {
  var colors = ['#2d6a4f', '#40916c', '#74c69d', '#f9a825', '#e76f51'];
  for (var i = 0; i < 40; i++) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;left:' + (Math.random() * 100) + 'vw;top:-10px;width:8px;height:8px;background:' + colors[Math.floor(Math.random() * colors.length)] + ';border-radius:50%;pointer-events:none;z-index:9999;animation:confettiFall ' + (1 + Math.random()) + 's linear forwards;';
    document.body.appendChild(d);
    setTimeout(function(el){ el.remove(); }, 2500, d);
  }
}

function toggleDash() { var dash = document.getElementById('dashboard'); dash.classList.toggle('hidden'); if (!dash.classList.contains('hidden')) dash.scrollIntoView({behavior:'smooth', block:'start'}); }

function doSearch() {
  SEARCH = document.getElementById('searchInput').value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderEvents, 120);
}

async function loadEvents() {
  try {
    var resp = await supabase.from('events').select('*, signups(id,name,contact)').order('date', {ascending: true});
    if (resp.error) { document.getElementById('events').innerHTML = '<div class="card"><p class="msg-err">' + esc(t('load_err') + ': ' + resp.error.message) + '</p></div>'; return; }
    EVENTS = resp.data || [];
    var extras = await Promise.all([supabase.from('signups').select('id,status'), supabase.from('signups').select('id,checked_in_at,certificate_code,volunteer_hours')]);
    var statuses = extras[0];
    if (!statuses.error) { var byId = {}; statuses.data.forEach(function(s) { byId[s.id] = s.status; }); EVENTS.forEach(function(e) { e.signups.forEach(function(s) { s.status = byId[s.id] || 'confirmed'; }); }); }
    var attendance = extras[1];
    if (!attendance.error) { var seen = {}; attendance.data.forEach(function(x) { seen[x.id] = x; }); EVENTS.forEach(function(e) { e.signups.forEach(function(s) { s.checked_in_at = seen[s.id] ? seen[s.id].checked_in_at : null; s.certificate_code = seen[s.id] ? seen[s.id].certificate_code : null; s.volunteer_hours = seen[s.id] ? seen[s.id].volunteer_hours : null; }); }); }
    render();
    if (location.hash) {
      setTimeout(function() {
        var el = document.getElementById(location.hash.slice(1));
        if (el) { el.scrollIntoView({behavior:'smooth'}); el.classList.add('hl'); }
      }, 300);
    }
  } catch (err) { document.getElementById('events').innerHTML = '<div class="card"><p class="msg-err">' + t('net_err') + '</p></div>'; }
}

async function initAuth() {
  try {
    var resp = await supabase.auth.getSession();
    if (resp.data && resp.data.session) {
      user = resp.data.session.user;
      var email = user.email;
      var approved = await checkApproved(email);
      if (approved) {
        coordEmail = email;
        sessionStorage.setItem('coordEmail', email);
        isCoord = true;
      } else {
        await supabase.auth.signOut();
      }
    }
  } catch (err) {}
}

function init() {
  document.documentElement.lang = lang === 'kz' ? 'kk' : lang === 'en' ? 'en' : 'ru';
  document.documentElement.style.setProperty('--brand', COMPANY.color);
  document.getElementById('langToggle').textContent = langLabel();
  var me = localStorage.getItem('me');
  if (me) { document.getElementById('ppContact').value = me; }
  setLangStatic();
  initAuth().then(function() {
    var loading = loadEvents();
    if (isCoord) {
      document.getElementById('addEventSection').classList.remove('hidden');
      if (new URLSearchParams(location.search).get('coordinator') === '1') loading.then(function() {
        var dash = document.getElementById('dashboard');
        dash.classList.remove('hidden');
        dash.scrollIntoView({behavior:'smooth', block:'start'});
        history.replaceState(null, '', location.pathname + '#dashboard');
      });
    }
  });
  if (me) setTimeout(function() { lookupPassport(null); }, 800);
  window.addEventListener('offline', function() {
    var el = document.getElementById('globalError');
    if (el) { el.textContent = t('net_err'); el.classList.remove('hidden'); }
  });
  window.addEventListener('online', function() {
    var el = document.getElementById('globalError');
    if (el) el.classList.add('hidden');
  });
}

init();
