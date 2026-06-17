'use strict';

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const MOBILE_BREAKPOINT = 1250;

const isMobileView = () => window.innerWidth < MOBILE_BREAKPOINT;

const elementToggleFunc = (elem) => {
  if (isMobileView()) elem.classList.toggle('active');
};

const elementEnableFunc = (elem, enable) => {
  if (isMobileView()) {
    elem.classList.toggle('active', enable);
  } else {
    elem.classList.remove('active');
  }
};

// Sidebar
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('button[data-sidebar-btn]');

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

// Portfolio filter
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = (selectedValue) => {
  const normalized = selectedValue.toLowerCase();

  filterItems.forEach((item) => {
    const category = item.dataset.category;
    const show = normalized === 'all' || normalized === category;
    item.classList.toggle('active', show);
  });
};

if (select) {
  select.addEventListener('click', () => elementToggleFunc(select));
}

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const selectedValue = item.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedValue = btn.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = btn.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove('active');
      btn.classList.add('active');
      lastClickedBtn = btn;
    });
  });
}

// Contact form
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formBtn) {
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    });
  });
}

// Scroll reveal — must be defined before page navigation uses it
let revealObserver = null;

function initScrollReveal() {
  const activeArticle = document.querySelector('article.active');
  const scope = activeArticle || document;
  const reveals = scope.querySelectorAll('.reveal:not(.is-visible)');

  if (reveals.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));
}

// Page navigation — scope selectors to avoid matching hero CTAs / articles twice
const navigationLinks = document.querySelectorAll('.navbar [data-nav-link]');
const pages = document.querySelectorAll('article[data-page]');
const navIndicator = document.querySelector('[data-nav-indicator]');
const validPages = ['about', 'resume', 'portfolio', 'contact'];

function updateNavIndicator(activeLink) {
  if (!navIndicator || !activeLink) return;

  const navbar = activeLink.closest('.navbar');
  if (!navbar) return;

  const navRect = navbar.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  navIndicator.style.width = `${linkRect.width}px`;
  navIndicator.style.left = `${linkRect.left - navRect.left}px`;
}

function activatePage(pageName) {
  pages.forEach((page) => {
    page.classList.toggle('active', page.dataset.page === pageName);
  });

  let activeLink = null;

  navigationLinks.forEach((link) => {
    const isActive = link.dataset.page === pageName;
    link.classList.toggle('active', isActive);
    if (isActive) activeLink = link;
  });

  elementEnableFunc(sidebar, pageName === 'contact');
  requestAnimationFrame(() => updateNavIndicator(activeLink));
}

function getPageFromHash() {
  const hash = window.location.hash.slice(1).toLowerCase();
  return validPages.includes(hash) ? hash : 'about';
}

function navigateToPage(pageName, updateHash) {
  activatePage(pageName);

  if (updateHash && window.location.hash !== `#${pageName}`) {
    history.replaceState(null, '', `#${pageName}`);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  requestAnimationFrame(() => {
    initScrollReveal();
  });
}

document.querySelectorAll('[data-nav-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    navigateToPage(link.dataset.page, true);
  });
});

window.addEventListener('hashchange', () => {
  navigateToPage(getPageFromHash(), false);
});

window.addEventListener('resize', () => {
  const activeLink = document.querySelector('.navbar [data-nav-link].active');
  updateNavIndicator(activeLink);
});

navigateToPage(getPageFromHash(), false);

// Image modal
const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalClose = imgModal?.querySelector('.modal-close');
const projectCards = document.querySelectorAll('[data-modal-src]');

function openModal(src, alt) {
  if (!imgModal || !modalImg) return;

  modalImg.src = src;
  modalImg.alt = alt || 'Project preview';
  imgModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  modalClose?.focus();
}

function closeModal() {
  if (!imgModal) return;

  imgModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  modalImg.src = '';
}

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    openModal(card.dataset.modalSrc, card.dataset.modalAlt);
  });
});

modalClose?.addEventListener('click', closeModal);

imgModal?.addEventListener('click', (event) => {
  if (event.target === imgModal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && imgModal && !imgModal.hasAttribute('hidden')) {
    closeModal();
  }
});
