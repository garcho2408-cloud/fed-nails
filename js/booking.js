/* =============================================
   booking.js — 4-step booking form → WhatsApp
   ============================================= */

// === State ===
const state = {
  service: null,
  date: null,
  time: null,
  name: '',
  phone: ''
};

// === Calendar state ===
let calYear, calMonth;

const monthNames = [
  'Январь','Февраль','Март','Апрель','Май','Июнь',
  'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
];
const monthNamesGen = [
  'января','февраля','марта','апреля','мая','июня',
  'июля','августа','сентября','октября','ноября','декабря'
];

// === Step navigation ===
function showStep(n) {
  document.querySelectorAll('.booking-step').forEach((el, i) => {
    el.classList.toggle('active', i + 1 === n);
  });
  document.querySelectorAll('.progress-step').forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i + 1 < n) el.classList.add('done');
    if (i + 1 === n) el.classList.add('active');
  });
  document.querySelectorAll('.progress-line').forEach((el, i) => {
    el.classList.toggle('done', i + 1 < n);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === Step 1: Service selection ===
document.querySelectorAll('.service-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.service-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.service = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: btn.dataset.price,
      duration: parseInt(btn.dataset.duration)
    };
    document.getElementById('step1Next').disabled = false;
  });
});

document.getElementById('step1Next').addEventListener('click', () => {
  if (!state.service) return;
  updateSummary('summaryStep2');
  renderCalendar();
  showStep(2);
});

// === Step 2: Calendar ===
function renderCalendar() {
  const now = new Date();
  if (calYear === undefined) { calYear = now.getFullYear(); calMonth = now.getMonth(); }
  const firstDay = new Date(calYear, calMonth, 1);
  const lastDay  = new Date(calYear, calMonth + 1, 0);
  let startDow = firstDay.getDay(); // 0=Sun
  if (startDow === 0) startDow = 7;
  startDow -= 1; // Mon=0

  document.getElementById('calMonth').textContent = `${monthNames[calMonth]} ${calYear}`;
  const grid = document.getElementById('calDays');
  grid.innerHTML = '';

  for (let i = 0; i < startDow; i++) {
    const el = document.createElement('div');
    el.className = 'calendar__day empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const el = document.createElement('div');
    el.className = 'calendar__day';
    el.textContent = d;

    const thisDate = new Date(calYear, calMonth, d);
    const today = new Date(); today.setHours(0,0,0,0);

    if (thisDate < today) {
      el.classList.add('past');
    } else {
      if (thisDate.toDateString() === today.toDateString()) el.classList.add('today');

      const iso = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      if (state.date === iso) el.classList.add('selected');

      el.addEventListener('click', () => {
        state.date = iso;
        state.time = null;
        document.querySelectorAll('.calendar__day').forEach(x => x.classList.remove('selected'));
        el.classList.add('selected');
        renderTimeSlots();
        document.getElementById('step2Next').disabled = !state.time;
      });
    }
    grid.appendChild(el);
  }
}

function renderTimeSlots() {
  const section = document.getElementById('timeSection');
  const grid    = document.getElementById('timeGrid');
  section.style.display = 'block';
  grid.innerHTML = '';

  const slots = [
    '10:00','10:30','11:00','11:30','12:00','12:30',
    '13:00','13:30','14:00','14:30','15:00','15:30',
    '16:00','16:30','17:00','17:30','18:00','18:30','19:00'
  ];

  if (!slots.length) {
    grid.innerHTML = '<p class="time-no-slots">На этот день нет свободного времени. Выберите другую дату.</p>';
    return;
  }

  slots.forEach(t => {
    const el = document.createElement('button');
    el.className = 'time-slot';
    el.textContent = t;
    if (state.time === t) el.classList.add('selected');
    el.addEventListener('click', () => {
      state.time = t;
      document.querySelectorAll('.time-slot').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      document.getElementById('step2Next').disabled = false;
    });
    grid.appendChild(el);
  });
}

document.getElementById('calPrev').addEventListener('click', () => {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
});
document.getElementById('calNext').addEventListener('click', () => {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
});

document.getElementById('step2Next').addEventListener('click', () => {
  if (!state.date || !state.time) return;
  updateSummary('summaryStep3');
  showStep(3);
});
document.getElementById('step2Back').addEventListener('click', () => showStep(1));

// === Step 3: Contact info ===
const nameInput  = document.getElementById('clientName');
const phoneInput = document.getElementById('clientPhone');

function validateStep3() {
  const nameOk  = nameInput.value.trim().length >= 2;
  const phoneOk = /^[\+\d][\d\s\-\(\)]{6,}$/.test(phoneInput.value.trim());
  document.getElementById('step3Next').disabled = !(nameOk && phoneOk);
}
nameInput.addEventListener('input', validateStep3);
phoneInput.addEventListener('input', validateStep3);
validateStep3();

// Phone mask helper
phoneInput.addEventListener('input', () => {
  let v = phoneInput.value.replace(/\D/g, '');
  if (v.startsWith('8')) v = '7' + v.slice(1);
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length === 0) { phoneInput.value = ''; return; }
  let out = '+7';
  if (v.length > 1) out += ' (' + v.slice(1, 4);
  if (v.length >= 4) out += ') ' + v.slice(4, 7);
  if (v.length >= 7) out += '-' + v.slice(7, 9);
  if (v.length >= 9) out += '-' + v.slice(9, 11);
  phoneInput.value = out;
  validateStep3();
});

document.getElementById('step3Next').addEventListener('click', () => {
  const nameVal  = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  if (nameVal.length < 2) {
    document.getElementById('nameError').style.display = 'block';
    return;
  }
  document.getElementById('nameError').style.display = 'none';
  if (!/^[\+\d][\d\s\-\(\)]{6,}$/.test(phoneVal)) {
    document.getElementById('phoneError').style.display = 'block';
    return;
  }
  document.getElementById('phoneError').style.display = 'none';

  state.name  = nameVal;
  state.phone = phoneVal;

  buildFinalSummary();
  buildTelegramLink();
  showStep(4);
});
document.getElementById('step3Back').addEventListener('click', () => showStep(2));

// === Summary helpers ===
function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const dow = ['вс','пн','вт','ср','чт','пт','сб'][new Date(y, m - 1, d).getDay()];
  return `${d} ${monthNamesGen[m - 1]} ${y} (${dow})`;
}

function updateSummary(elId) {
  const el = document.getElementById(elId);
  if (!el || !state.service) return;
  let html = `<div><span class="booking-summary__label">Услуга</span><span class="booking-summary__value">${state.service.name}</span></div>`;
  if (state.date) html += `<div><span class="booking-summary__label">Дата</span><span class="booking-summary__value">${formatDate(state.date)}</span></div>`;
  if (state.time) html += `<div><span class="booking-summary__label">Время</span><span class="booking-summary__value">${state.time}</span></div>`;
  html += `<div><span class="booking-summary__price">${state.service.price}</span></div>`;
  el.innerHTML = html;
}

function buildFinalSummary() {
  const el = document.getElementById('finalSummary');
  if (!el) return;
  el.innerHTML = `
    <div class="booking-detail__row"><span class="booking-detail__key">Услуга</span><span class="booking-detail__val">${state.service.name}</span></div>
    <div class="booking-detail__row"><span class="booking-detail__key">Дата</span><span class="booking-detail__val">${formatDate(state.date)}</span></div>
    <div class="booking-detail__row"><span class="booking-detail__key">Время</span><span class="booking-detail__val">${state.time}</span></div>
    <div class="booking-detail__row"><span class="booking-detail__key">Имя</span><span class="booking-detail__val">${state.name}</span></div>
    <div class="booking-detail__row"><span class="booking-detail__key">Телефон</span><span class="booking-detail__val">${state.phone}</span></div>
    <div class="booking-detail__row booking-detail__total"><span class="booking-detail__key">Стоимость</span><span class="booking-detail__val">${state.service.price}</span></div>
  `;
}

function buildTelegramLink() {
  const msg = `Здравствуйте! Хочу записаться.
Услуга: ${state.service.name}
Дата: ${formatDate(state.date)}
Время: ${state.time}
Меня зовут ${state.name}, телефон: ${state.phone}`;
  const encoded = encodeURIComponent(msg);
  document.getElementById('telegramLink').href = `tg://msg?to=+79661725056&text=${encoded}`;
}
