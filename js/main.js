const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('[data-theme]');
const storySection = document.getElementById('story');
const storyProgress = document.getElementById('story-progress');
const storySteps = document.querySelectorAll('.story-step');
const projectCards = document.querySelectorAll('.project-card');
const activeProjectImage = document.getElementById('active-project-image');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('revealed');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((element) => revealObserver.observe(element));

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

const updateNavTheme = () => {
  const sampleLine = Math.max(window.innerHeight * 0.28, 120);
  const currentSection = [...sections].find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= sampleLine && rect.bottom > sampleLine;
  });

  if (!currentSection) return;
  navbar.classList.toggle('navbar-dark', currentSection.dataset.theme === 'dark');
  setActiveNav(currentSection.id);
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const theme = entry.target.dataset.theme;
    navbar.classList.toggle('navbar-dark', theme === 'dark');
    setActiveNav(entry.target.id);
  });
}, { threshold: 0.42 });

sections.forEach((section) => sectionObserver.observe(section));

const closeMobileMenu = () => {
  document.body.classList.remove('menu-open');
  navToggle?.classList.remove('active');
  navToggle?.setAttribute('aria-expanded', 'false');
  navMenu?.classList.remove('open');
};

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open', !expanded);
});

navLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

const setProject = (card) => {
  if (!card || !activeProjectImage || card.classList.contains('active')) return;
  const image = card.dataset.image;
  const alt = card.dataset.alt || card.querySelector('h3')?.textContent || 'Selected project';

  projectCards.forEach((item) => item.classList.toggle('active', item === card));
  activeProjectImage.classList.add('switching');

  window.setTimeout(() => {
    activeProjectImage.src = image;
    activeProjectImage.alt = alt;
    activeProjectImage.classList.remove('switching');
  }, prefersReducedMotion ? 0 : 140);
};

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) setProject(entry.target);
  });
}, { threshold: 0.58, rootMargin: '-12% 0px -28% 0px' });

projectCards.forEach((card) => {
  projectObserver.observe(card);
  card.addEventListener('mouseenter', () => setProject(card));
  card.addEventListener('focusin', () => setProject(card));
});

const updateScrollState = () => {
  navbar.classList.toggle('navbar-scrolled', window.scrollY > 18);
  updateNavTheme();

  if (!storySection || !storyProgress) return;
  const rect = storySection.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;

  storyProgress.style.width = `${progress * 100}%`;
  document.documentElement.style.setProperty('--device-offset', `${Math.sin(progress * Math.PI) * -18}px`);
  document.documentElement.style.setProperty('--device-scale', String(1 + progress * 0.025));
};

const storyStepObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('active', entry.isIntersecting);
  });
}, { threshold: 0.58, rootMargin: '-20% 0px -20% 0px' });

storySteps.forEach((step) => storyStepObserver.observe(step));

window.addEventListener('scroll', updateScrollState, { passive: true });
window.addEventListener('resize', updateScrollState);
updateScrollState();

document.getElementById('year').textContent = new Date().getFullYear();
