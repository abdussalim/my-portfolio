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
const japanesePaper = document.getElementById('japanese-paper');
const japaneseLens = document.getElementById('japanese-lens');
const videoModal = document.getElementById('video-modal');
const projectVideo = document.getElementById('project-video');

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
    'projects.open': 'Segera',
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
    'projects.open': 'Soon',
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

const japaneseTranslations = {
  'nav.about': '私について',
  'nav.career': '経歴',
  'nav.story': 'ストーリー',
  'nav.works': '制作',
  'nav.contact': '連絡',
  'hero.eyebrow': 'フルスタック開発 / IoT開発 / マッピング',
  'hero.title': '安定したシステムを作り、きれいに届けます。',
  'hero.lead': 'SRE、フロントエンド、バックエンド、IoTを、使いやすいプロダクトにまとめます。',
  'hero.primary': '制作を見る',
  'hero.secondary': 'まず話す',
  'hero.captionA': '好奇心から',
  'hero.captionB': 'つながるプロダクトへ',
  'about.kicker': '私について',
  'about.title': 'システムを止めずに守りながら、プロダクトも作れます。',
  'about.text': '信頼性、CI/CD、Linuxサーバー、Webアプリを扱っています。まだ粗いアイデアでも、インフラからUIまで一緒に形にできます。',
  'career.kicker': '経歴のまとめ',
  'career.title': 'まず信頼性。プロダクトは前に進める。',
  'career.note': 'SREとして1.5年、20本以上のCI/CDパイプライン、そして2023年からフロントエンドの経験があります。',
  'career.metric1': 'CI/CDパイプライン',
  'career.metric2': 'リリースを高速化',
  'career.metric3': '運用コストを削減',
  'career.job1': '7つの教育アプリを安定・安全に保ち、リリースしやすくしています。',
  'career.job2': 'ReactのUIを作り、画面をもっと使いやすく改善しました。',
  'career.job3': 'ReactとJavaScriptで日々のフロントエンド開発を担当しました。',
  'career.job4': '農園マッピングのために位置情報データを集めました。',
  'story.kicker': 'スクロールストーリー',
  'story.title': '小さな配線から、運用できるシステムへ。',
  'story.step1.title': 'パターンを読む。',
  'story.step1.text': '物理を通して、原因・数値・フィードバックを見る習慣がつきました。',
  'story.step2.title': '試作品を作る。',
  'story.step2.text': 'センサーとArduinoが、現実の中でアイデアを試す最初の場所でした。',
  'story.step3.title': 'Webにまとめる。',
  'story.step3.text': '生のデータを、フロー、ダッシュボード、インターフェースに整えます。',
  'story.step4.title': 'ユーザーへ届ける。',
  'story.step4.text': '出来上がったものを、分かりやすく、軽く、すぐ使える形で届けます。',
  'projects.kicker': '選んだ制作',
  'projects.title': 'これまで届けてきた実験たち。',
  'projects.note': 'ただのデモではなく、ハードウェア、データ、インターフェースをどう組み合わせるかの小さな記録です。',
  'projects.open': '準備中',
  'projects.p1': '空気の状態を、自分の端末から確認できるモニタリングです。',
  'projects.p2': '声のコマンドでバイクを起動する試作品です。',
  'projects.p3': 'QRを読み取って、商品の詳細や価格をすばやく確認できます。',
  'projects.p4': '身長、体重、BMIをリアルタイムで扱うデジタルスケールです。',
  'contact.kicker': '連絡',
  'contact.title': '一緒に作りたいアイデアがありますか？',
  'contact.text': 'まだ粗い状態でも大丈夫です。少しずつ整えて、届けられる形にしましょう。',
  'form.name': 'お名前',
  'form.email': 'メールアドレス',
  'form.message': 'メッセージ',
  'form.submit': '送信する',
  'footer.created': '丁寧に作りました',
};

const staticJapaneseText = {
  'Abdus Salim': 'アブドゥス・サリム',
  'Site Reliability Engineer': 'サイト信頼性エンジニア',
  'Frontend Web Developer': 'フロントエンドWeb開発者',
  'Surveying Technician': '測量技術者',
  'PT INSTRUMETA TEKNOLOGI NUSANTARA': 'PT Instrumeta Teknologi Nusantara',
  'NashTa Group': 'NashTa Group',
  'Kementerian Keuangan RI': 'インドネシア共和国 財務省',
  'DINAS PERTANIAN KABUPATEN KAPUAS': 'カプアス県 農業局',
  'Bahinak Project': 'Bahinakプロジェクト',
  "Google's Motobike": 'Googleのモトバイク',
  'QR Code Goods Scanner': 'QRコード商品スキャナー',
  'BMI Real-time Monitoring': 'BMIリアルタイム監視',
  'IoT': 'IoT',
  'Monitoring': '監視',
  'Mobile-ready': 'モバイル対応',
  'Voice': '音声',
  'Prototype': '試作',
  'Scanner': 'スキャナー',
  'Inventory': '在庫管理',
  'Health': 'ヘルスケア',
  'Realtime': 'リアルタイム',
  'Dashboard': 'ダッシュボード',
  'GitHub Actions': 'GitHub Actions',
  'Docker': 'Docker',
  'Linux VPS': 'Linux VPS',
  'Traefik': 'Traefik',
  'Vault': 'Vault',
  'React': 'React',
  'Next.js': 'Next.js',
  'Node.js': 'Node.js',
  'Express': 'Express',
  'Postgres': 'Postgres',
  'MySQL': 'MySQL',
  'Prisma': 'Prisma',
  '@karaage_sarimu': '@karaage_sarimu',
  'GitHub': 'GitHub',
};

const japaneseOverlaySelectors = [
  '.hero-title[data-i18n]',
  '.section-title[data-i18n]',
  '.story-title[data-i18n]',
  '.contact-title[data-i18n]',
];

const getJapaneseText = (element) => {
  const key = element.dataset.i18n;
  if (key && japaneseTranslations[key]) return japaneseTranslations[key];

  const text = element.textContent.replace(/\s+/g, ' ').trim();
  return staticJapaneseText[text] || '';
};

let japaneseOverlayFrame = 0;
const renderJapaneseOverlay = () => {
  if (!japanesePaper || !window.matchMedia('(pointer: fine)').matches || prefersReducedMotion) return;
  japaneseOverlayFrame = 0;
  const fragment = document.createDocumentFragment();
  const seen = new Set();

  document.querySelectorAll(japaneseOverlaySelectors.join(',')).forEach((element) => {
    if (seen.has(element) || element.closest('.japanese-paper, .video-modal')) return;
    seen.add(element);

    const text = getJapaneseText(element);
    if (!text) return;

    const rect = element.getBoundingClientRect();
    if (rect.bottom < -80 || rect.top > window.innerHeight + 80 || rect.width < 4 || rect.height < 4) return;

    const styles = getComputedStyle(element);
    const originalFontSize = Number.parseFloat(styles.fontSize) || 16;
    const originalLineHeight = Number.parseFloat(styles.lineHeight) || originalFontSize * 1.1;
    const isHeadline = originalFontSize > 48;
    const translatedFontSize = isHeadline ? Math.max(64, originalFontSize * 0.82) : originalFontSize;
    const translatedLineHeight = isHeadline ? originalLineHeight * 0.86 : styles.lineHeight;
    const line = document.createElement('div');
    line.className = isHeadline ? 'jp-line jp-headline' : 'jp-line';
    line.textContent = text;
    line.style.left = `${rect.left}px`;
    line.style.top = `${isHeadline ? rect.top + originalLineHeight * 0.02 : rect.top}px`;
    line.style.width = `${Math.min(rect.width * (isHeadline ? 0.72 : 1.18), window.innerWidth - rect.left - 24)}px`;
    line.style.minHeight = `${rect.height * 1.12}px`;
    line.style.fontSize = `${translatedFontSize}px`;
    line.style.fontWeight = styles.fontWeight;
    line.style.lineHeight = typeof translatedLineHeight === 'number' ? `${translatedLineHeight}px` : translatedLineHeight;
    line.style.textAlign = styles.textAlign;
    line.style.letterSpacing = styles.letterSpacing;
    fragment.append(line);
  });

  japanesePaper.replaceChildren(fragment);
};

const scheduleJapaneseOverlay = () => {
  if (japaneseOverlayFrame || !japanesePaper) return;
  japaneseOverlayFrame = requestAnimationFrame(renderJapaneseOverlay);
};

let japaneseLensReady = false;
const setupJapaneseLens = () => {
  if (japaneseLensReady || !window.matchMedia('(pointer: fine)').matches || prefersReducedMotion) return;
  japaneseLensReady = true;

  let x = 0;
  let y = 0;
  let frame = 0;
  let ctrlPressed = false;

  const hideLens = () => {
    japanesePaper?.classList.remove('visible');
    japaneseLens?.classList.remove('visible');
  };

  const paint = () => {
    frame = 0;
    if (!ctrlPressed) return;
    document.documentElement.style.setProperty('--lens-x', `${x}px`);
    document.documentElement.style.setProperty('--lens-y', `${y}px`);
    japanesePaper?.classList.add('visible');
    japaneseLens?.classList.add('visible');
  };

  document.addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
    ctrlPressed = event.ctrlKey;
    if (!ctrlPressed) {
      hideLens();
      return;
    }
    if (!frame) frame = requestAnimationFrame(paint);
  }, { passive: true });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Control') return;
    ctrlPressed = true;
    if (!frame) frame = requestAnimationFrame(paint);
  });

  window.addEventListener('keyup', (event) => {
    if (event.key !== 'Control') return;
    ctrlPressed = false;
    hideLens();
  });

  window.addEventListener('blur', () => {
    ctrlPressed = false;
    hideLens();
  });

  window.addEventListener('mouseout', (event) => {
    if (event.relatedTarget) return;
    hideLens();
  });

  window.addEventListener('scroll', scheduleJapaneseOverlay, { passive: true });
  window.addEventListener('resize', scheduleJapaneseOverlay);
  scheduleJapaneseOverlay();
};

const getDrivePreviewUrl = (url) => {
  if (!url) return '';
  const directMatch = url.match(/\/d\/([^/]+)/);
  const idMatch = url.match(/[?&]id=([^&]+)/);
  const id = directMatch?.[1] || idMatch?.[1];
  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
};

const openVideoModal = (url) => {
  if (!videoModal || !projectVideo) return;
  projectVideo.src = getDrivePreviewUrl(url);
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closeVideoModal = () => {
  if (!videoModal || !projectVideo) return;
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  projectVideo.src = '';
};

const openWork = (card) => {
  const projectUrl = card.dataset.projectUrl?.trim();
  const videoUrl = card.dataset.videoUrl?.trim();

  if (videoUrl) {
    openVideoModal(videoUrl);
    return;
  }

  if (projectUrl) {
    window.open(projectUrl, '_blank', 'noopener,noreferrer');
  }
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

  updateWorkActions();
  scheduleJapaneseOverlay();
};

const initialLanguage = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'id';
setLanguage(initialLanguage);
setupJapaneseLens();

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
    scheduleJapaneseOverlay();
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
  card.addEventListener('click', (event) => {
    if (!event.target.closest('.work-media, .work-action, .work-media-action')) return;
    openWork(card);
  });
});

function updateWorkActions() {
  const language = document.documentElement.lang === 'en' ? 'en' : 'id';
  projectCards.forEach((card) => {
    const hasTarget = Boolean(card.dataset.projectUrl?.trim() || card.dataset.videoUrl?.trim());
    card.classList.toggle('has-target', hasTarget);
    card.querySelectorAll('.work-action, .work-media-action').forEach((button) => {
      button.disabled = !hasTarget;
      button.textContent = hasTarget ? (language === 'en' ? 'Open' : 'Buka') : (language === 'en' ? 'Soon' : 'Segera');
    });
  });
}

document.querySelectorAll('[data-video-close]').forEach((button) => {
  button.addEventListener('click', closeVideoModal);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeVideoModal();
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
updateWorkActions();
