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
const easterHint = document.getElementById('easter-hint');
const easterHintClose = document.querySelector('[data-easter-close]');
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
    'hero.title': 'Saya meracik sistem yang tenang, lalu menghidangkannya rapi.',
    'hero.lead': 'SRE, frontend, backend, dan IoT saya jahit jadi produk yang ringan disentuh.',
    'hero.primary': 'Cek karya',
    'hero.secondary': 'Ngobrol yuk',
    'hero.captionA': 'Berangkat dari rasa penasaran',
    'hero.captionB': 'pulang sebagai produk yang jalan',
    'easter.kicker': 'Easter Egg',
    'easter.text': 'Ada Easter Egg loh, di sini. Coba tekan terus tahan CTRL sambil gerakin cursornya.',
    'about.kicker': 'Tentang saya',
    'about.title': 'Saya menjaga mesin tetap berdetak, sambil ikut membentuk wajah produknya.',
    'about.text': 'Saya akrab dengan reliability, CI/CD, server Linux, dan web app. Kalau ide masih berupa sketsa, saya bantu rapikan dari fondasi sampai layar.',
    'photos.kicker': 'Di luar terminal',
    'photos.title': 'Sedikit arsip visual, biar halaman ini punya jeda dan napas.',
    'photos.note': 'Bukan moodboard. Cuma potongan kecil dari cara saya berjalan, belajar, lalu menata ide.',
    'photos.card1': 'Field mode',
    'photos.card2': 'Quiet build time',
    'photos.card3': 'Ordinary archive',
    'career.kicker': 'Karier singkat',
    'career.title': 'Reliability jadi pondasi. Produk tetap punya arah.',
    'career.note': '1.5 tahun SRE, 20+ pipeline CI/CD, dan jejak frontend sejak 2023.',
    'career.metric1': 'pipeline CI/CD',
    'career.metric2': 'rilis lebih cepat',
    'career.metric3': 'biaya operasional turun',
    'career.job1': 'Menjaga 7 aplikasi edukasi tetap kalem, aman, dan mudah dirilis.',
    'career.job2': 'Menyusun UI React dan merapikan layar lama agar lebih enak dipakai.',
    'career.job3': 'Mengurus kebutuhan frontend harian dengan React dan JavaScript.',
    'career.job4': 'Mengambil jejak geolokasi untuk pemetaan kebun sawit.',
    'story.kicker': 'Scrollytelling',
    'story.title': 'Dari kabel kecil ke sistem yang siap dirawat.',
    'story.step1.title': 'Baca pola.',
    'story.step1.text': 'Fisika mengajari saya membaca sebab, ukuran, dan feedback.',
    'story.step2.title': 'Racik prototype.',
    'story.step2.text': 'Sensor dan Arduino jadi dapur pertama untuk menguji ide.',
    'story.step3.title': 'Bungkus jadi web.',
    'story.step3.text': 'Data mentah saya tata jadi flow, dashboard, dan UI.',
    'story.step4.title': 'Kirim ke pengguna.',
    'story.step4.text': 'Yang sudah matang saya hidangkan: jelas, ringan, siap dipakai.',
    'projects.kicker': 'Karya pilihan',
    'projects.title': 'Beberapa eksperimen yang sudah sempat berlayar.',
    'projects.note': 'Bukan cuma demo. Ini potongan cara saya mempertemukan hardware, data, dan UI.',
    'projects.open': 'Segera',
    'projects.p1': 'Membaca kualitas udara langsung dari gadget sendiri.',
    'projects.p2': 'Prototype motor yang menyala lewat suara.',
    'projects.p3': 'Scan QR untuk melihat detail dan harga barang.',
    'projects.p4': 'Timbangan digital untuk tinggi, berat, dan BMI.',
    'contact.kicker': 'Kontak',
    'contact.title': 'Punya ide yang ingin diracik bareng?',
    'contact.text': 'Ceritakan versi paling mentahnya. Kita pelan-pelan rapikan sampai layak disajikan.',
    'form.name': 'Nama lengkap',
    'form.email': 'Alamat email',
    'form.message': 'Pesan',
    'form.placeholder': 'Ceritakan yang mau kamu bangun...',
    'form.submit': 'Kirim pesan',
    'footer.created': 'Ditata dengan pelan oleh'
  },
  en: {
    'nav.about': 'About',
    'nav.career': 'Career',
    'nav.story': 'Story',
    'nav.works': 'Works',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Fullstack Developer / IoT Builder / Mapping Specialist',
    'hero.title': 'I cook solid systems, then plate them clean.',
    'hero.lead': 'SRE, frontend, backend, and IoT packed into products that click.',
    'hero.primary': 'See work',
    'hero.secondary': 'Let’s talk',
    'hero.captionA': 'From a spark',
    'hero.captionB': 'to things that ship',
    'easter.kicker': 'Easter Egg',
    'easter.text': 'Easter Egg hiding here. Hold CTRL and move your cursor.',
    'about.kicker': 'About me',
    'about.title': 'I keep the lights on, and still build the thing.',
    'about.text': 'Reliability, CI/CD, Linux, and web apps are my lane. If the idea is raw, I cook it from infra to UI.',
    'photos.kicker': 'Outside the terminal',
    'photos.title': 'A tiny visual log, just to let the page breathe.',
    'photos.note': 'Not a moodboard. Just snapshots of moving, learning, and tidying ideas.',
    'photos.card1': 'Field mode',
    'photos.card2': 'Quiet build time',
    'photos.card3': 'Ordinary archive',
    'career.kicker': 'Short career',
    'career.title': 'Reliability first. Product keeps rolling.',
    'career.note': '1.5 years in SRE, 20+ CI/CD pipelines, frontend since 2023.',
    'career.metric1': 'CI/CD pipelines',
    'career.metric2': 'faster ships',
    'career.metric3': 'leaner ops',
    'career.job1': 'Kept 7 education apps steady, secure, and easy to ship.',
    'career.job2': 'Built React UI and gave old screens a cleaner second wind.',
    'career.job3': 'Handled daily frontend work with React and JavaScript.',
    'career.job4': 'Mapped field data for oil palm areas.',
    'story.kicker': 'Scrollytelling',
    'story.title': 'From tiny wires to systems built to last.',
    'story.step1.title': 'Read the room.',
    'story.step1.text': 'Physics taught me cause, measure, and feedback.',
    'story.step2.title': 'Cook a prototype.',
    'story.step2.text': 'Sensors and Arduino were my first test kitchen.',
    'story.step3.title': 'Wrap it in web.',
    'story.step3.text': 'Raw data becomes flows, dashboards, and UI.',
    'story.step4.title': 'Ship the plate.',
    'story.step4.text': 'When it is cooked, I serve it light and ready.',
    'projects.kicker': 'Selected works',
    'projects.title': 'A few experiments I shipped.',
    'projects.note': 'Not just demos. Small slices of hardware, data, and UI on one plate.',
    'projects.open': 'Soon',
    'projects.p1': 'Air quality checks from your own gadget.',
    'projects.p2': 'A motorcycle prototype that starts by voice.',
    'projects.p3': 'QR scans for details and prices.',
    'projects.p4': 'A digital scale for height, weight, and BMI.',
    'contact.kicker': 'Contact',
    'contact.title': 'Got an idea to cook?',
    'contact.text': 'Send the rough cut. We will plate it clean.',
    'form.name': 'Full name',
    'form.email': 'Email address',
    'form.message': 'Message',
    'form.placeholder': 'Tell me what we are building...',
    'form.submit': 'Send message',
    'footer.created': 'Plated neatly by'
  }
};

const japaneseTranslations = {
  'nav.about': '私について',
  'nav.career': '経歴',
  'nav.story': 'ストーリー',
  'nav.works': '制作',
  'nav.contact': '連絡',
  'hero.eyebrow': 'フルスタック開発 / IoT開発 / マッピング',
  'hero.title': '落ち着いたシステムを作り、きれいに届けます。',
  'hero.lead': 'SRE、フロントエンド、バックエンド、IoTを、軽く使える形にまとめます。',
  'hero.primary': '制作を見る',
  'hero.secondary': '話しましょう',
  'hero.captionA': '好奇心から始まり',
  'hero.captionB': '動くプロダクトへ',
  'easter.kicker': 'イースターエッグ',
  'easter.text': 'ここにイースターエッグがあります。CTRLを押したままカーソルを動かしてみてください。',
  'about.kicker': '私について',
  'about.title': 'システムを動かし続けながら、プロダクトの顔も整えます。',
  'about.text': '信頼性、CI/CD、Linux、Webアプリを扱っています。まだスケッチのようなアイデアでも、土台から画面まで形にします。',
  'photos.kicker': 'ターミナルの外で',
  'photos.title': '少しだけ写真を置いて、ページに余白と息を。',
  'photos.note': 'ムードボードではなく、歩き、学び、アイデアを整えていく小さな記録です。',
  'photos.card1': 'フィールドモード',
  'photos.card2': '静かに作る時間',
  'photos.card3': 'ふつうの日の記録',
  'career.kicker': '経歴のまとめ',
  'career.title': '信頼性を土台に、プロダクトに進む方向を。',
  'career.note': 'SRE 1.5年、CI/CD 20本以上、2023年からフロントエンドも。',
  'career.metric1': 'CI/CDパイプライン',
  'career.metric2': 'リリース高速化',
  'career.metric3': '運用を軽く',
  'career.job1': '7つの教育アプリを落ち着いて安定・安全に保ち、出しやすくしました。',
  'career.job2': 'React UIを組み、古い画面を使いやすく整えました。',
  'career.job3': 'ReactとJavaScriptで日々の画面開発を支えました。',
  'career.job4': '農園マッピング用の位置情報の足跡を集めました。',
  'story.kicker': 'スクロールストーリー',
  'story.title': '小さな配線から、手入れできるシステムへ。',
  'story.step1.title': '空気を読む。',
  'story.step1.text': '物理で、原因・数値・フィードバックを読む癖がつきました。',
  'story.step2.title': '試作を作る。',
  'story.step2.text': 'センサーとArduinoが、アイデアを試す最初の台所でした。',
  'story.step3.title': 'Webで包む。',
  'story.step3.text': '生データを整え、フロー、ダッシュボード、UIにします。',
  'story.step4.title': '届ける。',
  'story.step4.text': 'できたものを、軽く、分かりやすく、すぐ使える形で届けます。',
  'projects.kicker': '選んだ制作',
  'projects.title': 'これまで船出した実験たち。',
  'projects.note': 'ただのデモではなく、ハードウェア、データ、UIを出会わせた記録です。',
  'projects.open': '準備中',
  'projects.p1': '空気の状態を自分の端末で見られます。',
  'projects.p2': '声で起動するバイクの試作品です。',
  'projects.p3': 'QRで詳細と価格をすぐ確認できます。',
  'projects.p4': '身長、体重、BMIを見るデジタルスケールです。',
  'contact.kicker': '連絡',
  'contact.title': '一緒に作りたいアイデアがありますか？',
  'contact.text': 'まだ粗いままで大丈夫です。少しずつ整えて、届けられる形にしましょう。',
  'form.name': 'お名前',
  'form.email': 'メールアドレス',
  'form.message': 'メッセージ',
  'form.submit': '送信する',
  'footer.created': 'ゆっくり丁寧に整えました',
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
  '[data-i18n]',
  '.nav-logo',
  '.career-card h3',
  '.career-card p:not(.career-date)',
  '.project-card h3',
  '.work-tags span',
  '.skill-cloud span',
  '.contact-links a',
];

const japaneseHeadlineSelectors = [
  '.hero-title[data-i18n]',
  '.section-title[data-i18n]',
  '.photo-journal-title[data-i18n]',
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
  const occupiedHeadlineAreas = [];

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
    const isHeadline = japaneseHeadlineSelectors.some((selector) => element.matches(selector));
    const headlineScale = element.matches('.section-title[data-i18n]') ? 0.74 : 0.82;
    const translatedFontSize = isHeadline ? Math.max(58, originalFontSize * headlineScale) : originalFontSize;
    const translatedLineHeight = isHeadline ? translatedFontSize * 1.02 : styles.lineHeight;
    const translatedWidth = Math.min(rect.width * (isHeadline ? 1.02 : 1.18), window.innerWidth - rect.left - 24);
    const headlineTop = rect.top + originalLineHeight * 0.02;
    const overlappingHeadline = occupiedHeadlineAreas.find((area) => (
      rect.left < area.right &&
      rect.left + rect.width > area.left &&
      rect.top < area.bottom &&
      rect.bottom > area.top
    ));
    const line = document.createElement('div');
    line.className = isHeadline ? 'jp-line jp-headline' : 'jp-line';
    line.textContent = text;
    line.style.left = `${rect.left}px`;
    line.style.top = `${isHeadline ? headlineTop : overlappingHeadline ? overlappingHeadline.bottom + 10 : rect.top}px`;
    line.style.width = `${translatedWidth}px`;
    line.style.minHeight = `${rect.height * 1.12}px`;
    line.style.fontSize = `${translatedFontSize}px`;
    line.style.fontWeight = styles.fontWeight;
    line.style.lineHeight = typeof translatedLineHeight === 'number' ? `${translatedLineHeight}px` : translatedLineHeight;
    line.style.textAlign = styles.textAlign;
    line.style.letterSpacing = styles.letterSpacing;
    fragment.append(line);

    if (isHeadline) {
      occupiedHeadlineAreas.push({
        left: rect.left,
        right: rect.left + translatedWidth,
        top: headlineTop,
        bottom: headlineTop + Math.max(rect.height * 1.08, translatedLineHeight * 2.2),
      });
    }
  });

  japanesePaper.replaceChildren(fragment);
};

const scheduleJapaneseOverlay = () => {
  if (japaneseOverlayFrame || !japanesePaper) return;
  japaneseOverlayFrame = requestAnimationFrame(renderJapaneseOverlay);
};

const dismissEasterHint = (persist = false) => {
  easterHint?.classList.remove('visible');
  if (persist) localStorage.setItem('portfolio-easter-hint-dismissed', 'true');
};

const setupEasterHint = () => {
  if (!easterHint || !window.matchMedia('(pointer: fine)').matches) return;
  if (localStorage.getItem('portfolio-easter-hint-dismissed') === 'true') return;

  window.setTimeout(() => {
    easterHint.classList.add('visible');
  }, prefersReducedMotion ? 0 : 1400);

  easterHintClose?.addEventListener('click', () => dismissEasterHint(true));
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
    renderJapaneseOverlay();
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
    dismissEasterHint();
    if (!frame) frame = requestAnimationFrame(paint);
  }, { passive: true });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Control') return;
    ctrlPressed = true;
    dismissEasterHint();
    renderJapaneseOverlay();
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
setupEasterHint();
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
