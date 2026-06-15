(function () {
  // Skip if portfolio.js already owns the lightbox on this page
  if (document.getElementById('lightbox')) return;

  const el = document.createElement('div');
  el.className = 'lightbox';
  el.id = 'lightbox';
  el.innerHTML = `
    <button class="lightbox__close" aria-label="Закрыть">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <button class="lightbox__prev" aria-label="Предыдущее">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button class="lightbox__next" aria-label="Следующее">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
    <div class="lightbox__img-wrap">
      <img class="lightbox__img" id="lightboxImg" src="" alt="">
      <div class="lightbox__caption">
        <span class="lightbox__caption-text" id="lightboxCaption"></span>
      </div>
    </div>
    <div class="lightbox__counter" id="lightboxCounter"></div>
  `;
  document.body.appendChild(el);

  // Each group is a separate section — clicking a photo navigates only within its group
  const GROUPS = [
    '.portfolio-item img',
    '.interior-item img',
    '.about-photo img',
  ];

  let items   = [];
  let current = 0;

  const lbImg     = el.querySelector('#lightboxImg');
  const lbCaption = el.querySelector('#lightboxCaption');
  const lbCounter = el.querySelector('#lightboxCounter');
  const btnPrev   = el.querySelector('.lightbox__prev');
  const btnNext   = el.querySelector('.lightbox__next');

  function init() {
    GROUPS.forEach(selector => {
      const group = Array.from(document.querySelectorAll(selector));
      group.forEach((img, idx) => {
        const trigger = img.closest('.portfolio-item') || img;
        trigger.style.cursor = 'zoom-in';
        trigger.addEventListener('click', () => open(group, idx));
      });
    });
  }

  function open(group, idx) {
    items   = group;
    current = idx;
    show();
    btnPrev.style.display = items.length < 2 ? 'none' : '';
    btnNext.style.display = items.length < 2 ? 'none' : '';
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }

  function show() {
    lbImg.src = items[current].src;
    lbImg.alt = items[current].alt;
    lbCaption.textContent = '';
    lbCounter.textContent = items.length > 1 ? `${current + 1} / ${items.length}` : '';
  }

  el.querySelector('.lightbox__close').addEventListener('click', close);
  btnPrev.addEventListener('click', () => { current = (current - 1 + items.length) % items.length; show(); });
  btnNext.addEventListener('click', () => { current = (current + 1) % items.length; show(); });
  el.addEventListener('click', e => { if (e.target === el) close(); });

  document.addEventListener('keydown', e => {
    if (!el.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft')  { current = (current - 1 + items.length) % items.length; show(); }
    if (e.key === 'ArrowRight') { current = (current + 1) % items.length; show(); }
  });

  let touchX = 0;
  el.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchX;
    if (Math.abs(dx) < 40) return;
    current = dx < 0
      ? (current + 1) % items.length
      : (current - 1 + items.length) % items.length;
    show();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
