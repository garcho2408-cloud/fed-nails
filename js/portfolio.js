/* =============================================
   portfolio.js — masonry grid, filters, lightbox
   ============================================= */

const PORTFOLIO = [
  { src: 'images/portfolio/1.webp',  label: 'Цветочный дизайн',     cat: 'design' },
  { src: 'images/portfolio/2.webp',  label: 'Классическое покрытие', cat: 'gel' },
  { src: 'images/portfolio/3.webp',  label: 'Градиент омбре',        cat: 'gel' },
  { src: 'images/portfolio/4.webp',  label: 'Арт-роспись',           cat: 'design' },
  { src: 'images/portfolio/5.webp',  label: 'Педикюр французский',   cat: 'pedi' },
  { src: 'images/portfolio/6.webp',  label: 'Наращивание миндаль',   cat: 'build' },
  { src: 'images/portfolio/7.webp',  label: 'Геометрия',             cat: 'design' },
  { src: 'images/portfolio/8.webp',  label: 'Гель-лак нюд',          cat: 'gel' },
  { src: 'images/portfolio/9.webp',  label: 'Наращивание квадрат',   cat: 'build' },
  { src: 'images/portfolio/10.webp', label: 'Фольга и блёстки',      cat: 'design' },
  { src: 'images/portfolio/11.webp', label: 'Педикюр уход',          cat: 'pedi' },
  { src: 'images/portfolio/12.webp', label: 'Гель-лак красный',      cat: 'gel' },
  { src: 'images/portfolio/13.webp', label: 'Наращивание стилет',    cat: 'build' },
  { src: 'images/portfolio/14.webp', label: 'Акварель',              cat: 'design' },
  { src: 'images/portfolio/15.webp', label: 'Педикюр гель-лак',      cat: 'pedi' },
  { src: 'images/portfolio/16.webp', label: 'Зеркальная пудра',      cat: 'design' },
  { src: 'images/portfolio/17.webp', label: 'Гель-лак французский',  cat: 'gel' },
  { src: 'images/portfolio/18.webp', label: 'Наращивание балерина',   cat: 'build' },
  { src: 'images/portfolio/19.webp', label: 'Цветы 3D',              cat: 'design' },
  { src: 'images/portfolio/20.webp', label: 'Нюд градиент',          cat: 'gel' },
  { src: 'images/portfolio/21.webp', label: 'Педикюр педикюр',       cat: 'pedi' },
  { src: 'images/portfolio/22.webp', label: 'Авторский дизайн',      cat: 'design' },
  { src: 'images/portfolio/23.webp', label: 'Наращивание коррекция', cat: 'build' },
];

let currentFilter = 'all';
let currentIndex  = 0;
let visibleItems  = [];

const grid    = document.getElementById('portfolioGrid');
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lightboxImg');
const lbCaption    = document.getElementById('lightboxCaption');
const lbCounter    = document.getElementById('lightboxCounter');
const lbClose      = document.getElementById('lightboxClose');
const lbPrev       = document.getElementById('lightboxPrev');
const lbNext       = document.getElementById('lightboxNext');

// === Render grid ===
function renderGrid(filter) {
  grid.innerHTML = '';
  visibleItems = PORTFOLIO.filter(p => filter === 'all' || p.cat === filter);

  visibleItems.forEach((item, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'portfolio-item reveal';
    wrap.innerHTML = `
      <img src="${item.src}" alt="${item.label}" loading="lazy">`;
    wrap.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(wrap);
  });
}

// === Filter tabs ===
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    renderGrid(currentFilter);
  });
});

// === Lightbox ===
function openLightbox(idx) {
  currentIndex = idx;
  showLightboxItem();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showLightboxItem() {
  const item = visibleItems[currentIndex];
  lbImg.src     = item.src;
  lbImg.alt     = item.label;
  lbCaption.textContent = '';
  lbCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showLightboxItem();
});
lbNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showLightboxItem();
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLightboxItem(); }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % visibleItems.length; showLightboxItem(); }
});

// Touch swipe
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) < 40) return;
  if (dx < 0) { currentIndex = (currentIndex + 1) % visibleItems.length; }
  else        { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; }
  showLightboxItem();
});

// === Init ===
renderGrid('all');
