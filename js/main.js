/* =============================================
   main.js — header, mobile menu, scroll reveal
   ============================================= */

// === Header scroll effect ===
const header = document.getElementById('header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// === Mobile menu ===
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// === Scroll reveal ===
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Re-observe dynamically added .reveal elements
const mutationObs = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      if (node.classList && node.classList.contains('reveal')) revealObserver.observe(node);
      node.querySelectorAll && node.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    });
  });
});
mutationObs.observe(document.body, { childList: true, subtree: true });

// === Photo scroll-expand effect ===
const photoSelectors = [
  '.portfolio-item img',
  '.interior-item img',
  '.about-photo img',
  '.hero__bg img'
].join(',');

const photos = document.querySelectorAll(photoSelectors);

photos.forEach(img => {
  img.style.transition = 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.9s ease';
  img.style.transform = 'scale(0.82)';
  img.style.opacity = '0';
});

const photoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'scale(1)';
      entry.target.style.opacity = '1';
    } else {
      entry.target.style.transform = 'scale(0.82)';
      entry.target.style.opacity = '0';
    }
  });
}, {
  threshold: 0.2,
  rootMargin: '0px 0px -60px 0px'
});

photos.forEach(img => {
  photoObserver.observe(img);
});

// Re-observe dynamically added photos (portfolio filter)
const photoMutationObs = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      const imgs = node.querySelectorAll ? node.querySelectorAll('img') : [];
      imgs.forEach(img => {
        img.style.transition = 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.9s ease';
        img.style.transform = 'scale(0.82)';
        img.style.opacity = '0';
        photoObserver.observe(img);
      });
    });
  });
});
photoMutationObs.observe(document.body, { childList: true, subtree: true });

// === Active nav link ===
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link, .footer__nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
});
