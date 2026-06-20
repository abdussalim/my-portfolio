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
const langToggle = document.querySelector('[data-lang-toggle]');

const translations = {
  id: {
    'nav.about': 'Tentang',
    'nav.career': 'Karier',
    'nav.story': 'Cerita',
    'nav.works': 'Karya',
    'nav.contact': 'Kontak',
    'hero.eyebrow': 'Fullstack Developer / IoT Builder / Mapping Specialist',
    'hero.title': 'Saya masak sistem yang stabil, lalu saya sajikan rapi.',
    'hero.lead': 'SRE, frontend, backend, dan IoT saya kemas jadi produk yang enak dipakai.',
    'hero.primary': 'Lihat karya',
    'hero.secondary': 'Ngobrol dulu',
    'hero.captionA': 'Dari rasa penasaran',
    'hero.captionB': 'jadi produk terkoneksi',
    'about.kicker': 'Tentang saya',
    'about.title': 'Saya menjaga sistem tetap hidup, sambil tetap bisa membangun produknya.',
    'about.text': 'Saya bekerja di reliability, CI/CD, server Linux, dan aplikasi web. Kalau produk masih mentah, saya bisa ikut masak dari infrastruktur sampai UI.',
    'career.kicker': 'Karier singkat',
    'career.title': 'Reliability dulu. Produk tetap jalan.',
    'career.note': '1.5 tahun sebagai SRE, 20+ pipeline CI/CD, dan pengalaman frontend sejak 2023.',
    'career.metric1': 'pipeline CI/CD',
    'career.metric2': 'rilis lebih cepat',
    'career.metric3': 'biaya operasional turun',
    'career.job1': 'Menjaga 7 aplikasi edukasi tetap stabil, aman, dan gampang dirilis.',
    'career.job2': 'Membangun UI React dan membantu revamp tampilan agar lebih nyaman dipakai.',
    'career.job3': 'Mengurus kebutuhan frontend harian dengan React dan JavaScript.',
    'career.job4': 'Mengumpulkan data geolokasi untuk pemetaan perkebunan sawit.',
    'story.kicker': 'Scrollytelling',
    'story.title': 'Dari kabel kecil ke sistem yang siap dijaga.',
    'story.step1.title': 'Baca pola.',
    'story.step1.text': 'Fisika bikin saya terbiasa mencari sebab, ukuran, dan feedback.',
    'story.step2.title': 'Racik prototype.',
    'story.step2.text': 'Sensor dan Arduino jadi dapur pertama untuk mencoba ide di dunia nyata.',
    'story.step3.title': 'Bungkus jadi web.',
    'story.step3.text': 'Data yang mentah saya rapikan jadi flow, dashboard, dan interface.',
    'story.step4.title': 'Kirim ke pengguna.',
    'story.step4.text': 'Produk yang sudah matang saya serve: jelas, ringan, dan siap dipakai.',
    'projects.kicker': 'Karya pilihan',
    'projects.title': 'Beberapa eksperimen yang pernah saya kirim.',
    'projects.note': 'Bukan sekadar demo. Ini potongan kecil dari cara saya meracik hardware, data, dan interface.',
    'projects.p1': 'Monitor kualitas udara, biar kondisi napas bisa dibaca dari gadget sendiri.',
    'projects.p2': 'Prototype motor yang bisa dinyalakan lewat perintah suara.',
    'projects.p3': 'Scan QR untuk membaca detail dan harga barang tanpa banyak klik.',
    'projects.p4': 'Timbangan digital yang langsung mengolah tinggi, berat, dan BMI.',
    'contact.kicker': 'Kontak',
    'contact.title': 'Punya ide yang perlu dimasak bareng?',
    'contact.text': 'Ceritakan versi mentahnya. Kita rapikan pelan-pelan sampai siap disajikan.',
    'form.name': 'Nama lengkap',
    'form.email': 'Alamat email',
    'form.message': 'Pesan',
    'form.placeholder': 'Ceritakan yang mau kamu bangun...',
    'form.submit': 'Kirim pesan',
    'footer.created': 'Dibuat dengan rapi oleh'
  },
  en: {
    'nav.about': 'About',
    'nav.career': 'Career',
    'nav.story': 'Story',
    'nav.works': 'Works',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Fullstack Developer / IoT Builder / Mapping Specialist',
    'hero.title': 'I cook stable systems, then serve them clean.',
    'hero.lead': 'SRE, frontend, backend, and IoT packed into products people can enjoy using.',
    'hero.primary': 'See works',
    'hero.secondary': 'Talk first',
    'hero.captionA': 'From curiosity',
    'hero.captionB': 'to connected products',
    'about.kicker': 'About me',
    'about.title': 'I keep systems alive, while still being able to build the product.',
    'about.text': 'I work with reliability, CI/CD, Linux servers, and web apps. If the product is still raw, I can help cook it from infrastructure to UI.',
    'career.kicker': 'Short career',
    'career.title': 'Reliability first. Product still moving.',
    'career.note': '1.5 years as an SRE, 20+ CI/CD pipelines, and frontend experience since 2023.',
    'career.metric1': 'CI/CD pipelines',
    'career.metric2': 'faster releases',
    'career.metric3': 'lower operational cost',
    'career.job1': 'Keeping 7 education apps stable, secure, and easier to release.',
    'career.job2': 'Building React UI and helping revamp screens so they feel easier to use.',
    'career.job3': 'Handling daily frontend needs with React and JavaScript.',
    'career.job4': 'Collecting geolocation data for oil palm mapping.',
    'story.kicker': 'Scrollytelling',
    'story.title': 'From tiny wires to systems ready to be kept alive.',
    'story.step1.title': 'Read the pattern.',
    'story.step1.text': 'Physics trained me to look for cause, measurement, and feedback.',
    'story.step2.title': 'Cook the prototype.',
    'story.step2.text': 'Sensors and Arduino became the first kitchen for testing ideas in the real world.',
    'story.step3.title': 'Pack it into web.',
    'story.step3.text': 'Raw data gets shaped into flows, dashboards, and interfaces.',
    'story.step4.title': 'Ship it to users.',
    'story.step4.text': 'Once the product is cooked, I serve it clear, light, and ready to use.',
    'projects.kicker': 'Selected works',
    'projects.title': 'A few experiments I have shipped.',
    'projects.note': 'Not just demos. These are small slices of how I cook hardware, data, and interface together.',
    'projects.p1': 'Air quality monitoring, so breathing conditions are readable from your own gadget.',
    'projects.p2': 'A motorcycle prototype that starts through voice commands.',
    'projects.p3': 'QR scanning for product details and prices without too many clicks.',
    'projects.p4': 'A digital scale that processes height, weight, and BMI in real time.',
    'contact.kicker': 'Contact',
    'contact.title': 'Got an idea we should cook together?',
    'contact.text': 'Send the raw version. We can shape it slowly until it is ready to serve.',
    'form.name': 'Full name',
    'form.email': 'Email address',
    'form.message': 'Message',
    'form.placeholder': 'Tell me what you want to build...',
    'form.submit': 'Send message',
    'footer.created': 'Created neatly by'
  }
};

const japaneseWords = [
  '信頼性', '安定', '配信', '設計', '監視', '自動化', '速度', '安全', '基盤', '開発',
  '運用', '品質', '地図', '計測', '試作', '構築', '改善', '接続', '画面', '製品'
];

const getJapaneseWord = (word) => {
  let total = 0;
  [...word].forEach((char) => {
    total += char.codePointAt(0);
  });
  return japaneseWords[total % japaneseWords.length];
};

const wrapJapaneseHoverWords = () => {
  if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion) return;

  document.querySelectorAll('.jp-hover').forEach((element) => {
    const text = element.textContent;
    const fragment = document.createDocumentFragment();
    const parts = text.split(/(\s+)/);

    parts.forEach((part) => {
      if (!part.trim()) {
        fragment.append(document.createTextNode(part));
        return;
      }

      const match = part.match(/^([^\p{L}\p{N}]?)([\p{L}\p{N}/+.-]+)([^\p{L}\p{N}]?)$/u);
      if (!match) {
        fragment.append(document.createTextNode(part));
        return;
      }

      const [, prefix, word, suffix] = match;
      const span = document.createElement('span');
      span.className = 'jp-word';
      span.dataset.original = part;
      span.dataset.jp = `${prefix}${getJapaneseWord(word)}${suffix}`;
      span.textContent = part;
      fragment.append(span);
    });

    element.replaceChildren(fragment);
    element.querySelectorAll('.jp-word').forEach((word) => {
      word.style.minWidth = `${word.getBoundingClientRect().width}px`;
    });
  });
};

let japaneseHoverReady = false;
const setupJapaneseHover = () => {
  if (japaneseHoverReady || !window.matchMedia('(pointer: fine)').matches || prefersReducedMotion) return;
  japaneseHoverReady = true;

  document.addEventListener('mousemove', (event) => {
    const radius = 78;
    document.querySelectorAll('.jp-word').forEach((word) => {
      const rect = word.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - x, event.clientY - y);
      const active = distance < radius;

      word.classList.toggle('jp-active', active);
      word.textContent = active ? word.dataset.jp : word.dataset.original;
    });
  }, { passive: true });

  window.addEventListener('mouseout', (event) => {
    if (event.relatedTarget) return;
    document.querySelectorAll('.jp-word').forEach((word) => {
      word.classList.remove('jp-active');
      word.textContent = word.dataset.original;
    });
  });
};

const setLanguage = (language) => {
  const dictionary = translations[language] || translations.id;
  document.documentElement.lang = language;
  localStorage.setItem('portfolio-language', language);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) element.setAttribute('placeholder', dictionary[key]);
  });

  if (langToggle) {
    langToggle.textContent = language === 'id' ? 'EN' : 'ID';
    langToggle.setAttribute('aria-label', language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia');
  }

  wrapJapaneseHoverWords();
};

const initialLanguage = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'id';
setLanguage(initialLanguage);
setupJapaneseHover();

langToggle?.addEventListener('click', () => {
  const nextLanguage = document.documentElement.lang === 'id' ? 'en' : 'id';
  setLanguage(nextLanguage);
});

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
