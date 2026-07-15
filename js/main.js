const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('[data-theme]');
const storySection = document.getElementById('story');
const storyProgress = document.getElementById('story-progress');
const storySteps = document.querySelectorAll('.story-step');
const projectCards = document.querySelectorAll('.project-card');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const langToggle = document.querySelector('[data-lang-toggle]');
const japanesePaper = document.getElementById('japanese-paper');
const japaneseLens = document.getElementById('japanese-lens');
const easterHint = document.getElementById('easter-hint');
const easterHintClose = document.querySelector('[data-easter-close]');
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

const translations = {
  id: {
    'nav.about': 'Tentang',
    'nav.career': 'Karier',
    'nav.story': 'Cerita',
    'nav.works': 'Karya',
    'nav.contact': 'Kontak',
    'hero.eyebrow': 'Fullstack Developer / IoT Builder / Mapping Specialist',
    'hero.title': 'Saya masak sistem sampai matang, lalu disajikan ke piring Anda.',
    'hero.lead': 'SRE, web, dan IoT saya jahit jadi produk yang enak disentuh.',
    'hero.primary': 'Cek karya',
    'hero.secondary': 'Ngobrol yuk',
    'hero.captionA': 'mulai dari penasaran',
    'hero.captionB': 'pulang jadi produk jalan',
    'easter.kicker': 'Easter Egg',
    'easter.text': 'Ada Easter Egg loh, di sini. Coba tekan terus tahan CTRL sambil gerakin cursornya.',
    'about.kicker': 'Tentang saya',
    'about.title': 'Saya jaga mesinnya nyala, sambil ikut ngerapihin wajah produknya.',
    'about.text': 'Reliability, CI/CD, Linux, dan web app jadi dapur saya. Ide mentah tinggal kita masak pelan-pelan.',
    'photos.kicker': 'Di luar terminal',
    'photos.title': 'Sedikit arsip visual, biar halaman ini sempat bernapas.',
    'photos.note': 'Bukan moodboard. Cuma potongan jalan, belajar, lalu beresin ide.',
    'photos.card1': 'Field mode',
    'photos.card2': 'Quiet build time',
    'photos.card3': 'Ordinary archive',
    'photos.portfolio': 'Lihat asal mulanya',
    'career.kicker': 'Karier singkat',
    'career.title': 'Reliability dulu. Produk baru lari.',
    'career.note': 'SRE sejak 2025, frontend sejak 2023 — 20+ pipeline, tanpa drama.',
    'career.metric1': 'pipeline CI/CD berlayar',
    'career.metric2': 'pengguna terlayani tiap hari',
    'career.metric3': 'lembaga tetap menyala',
    'career.job1': 'Menjaga 7 app edukasi tetap kalem, aman, dan gampang rilis.',
    'career.job2': 'Membangun dan merawat UI React untuk alur kerja harian pemerintahan.',
    'career.job3': 'Merekam jejak lokasi untuk peta kebun sawit.',
    'story.kicker': 'A Bit of My Story',
    'story.title': 'Dari kabel kecil ke sistem yang siap dijaga.',
    'story.step1.title': 'Baca pola.',
    'story.step1.text': 'Fisika ngajari saya baca sebab, ukuran, dan feedback.',
    'story.step2.title': 'Racik prototype.',
    'story.step2.text': 'Sensor dan Arduino jadi dapur awal buat ngetes ide.',
    'story.step3.title': 'Bungkus jadi web.',
    'story.step3.text': 'Data mentah saya tata jadi flow, dashboard, dan UI.',
    'story.step4.title': 'Kirim ke pengguna.',
    'story.step4.text': 'Yang sudah matang saya sajikan: ringan, jelas, siap dipakai.',
    'projects.kicker': 'Karya pilihan',
    'projects.title': 'Dari dapur saya ke produksi.',
    'projects.note': 'Platform yang melayani 5000+ orang, rumah digital perusahaan, dan riset yang tembus jurnal — semuanya masih hangat.',
    'projects.open': 'Buka',
    'projects.p1': '10+ sekolah mengelola presensi, ujian, rapor, dan PPDB di sini — melayani 5000+ orang tiap hari.',
    'projects.p2': 'Rumah digital perusahaan IoT & robotik — saya ikut membangunnya, dan saya yang jaga lampunya tetap nyala.',
    'projects.p3': 'Akar fisika, lolos peer-review: riset polusi sedimen sungai, open access di Elsevier.',
    'contact.kicker': 'Kontak',
    'contact.title': 'Ada ide yang mau dimasak bareng?',
    'contact.text': 'Kirim versi mentahnya. Nanti kita rapikan pelan-pelan.',
    'form.name': 'Nama lengkap',
    'form.email': 'Alamat email',
    'form.message': 'Pesan',
    'form.placeholder': 'Ceritakan yang mau kamu bangun...',
    'form.submit': 'Kirim pesan',
    'form.sending': 'Mengirim…',
    'form.success': 'Pesan terkirim. Saya akan segera membalas.',
    'form.error': 'Gagal terkirim. Email langsung saja ke abdussalimsan@gmail.com.',
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
    'photos.portfolio': 'See where it started',
    'career.kicker': 'Short career',
    'career.title': 'Reliability first. Product keeps rolling.',
    'career.note': 'SRE since 2025, frontend since 2023 — 20+ pipelines, zero drama.',
    'career.metric1': 'CI/CD pipelines shipped',
    'career.metric2': 'users served daily',
    'career.metric3': 'institutions kept running',
    'career.job1': 'Kept 7 education apps steady, secure, and easy to ship.',
    'career.job2': 'Built and maintained React UIs for daily government workflows.',
    'career.job3': 'Mapped field data for oil palm areas.',
    'story.kicker': 'A Bit of My Story',
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
    'projects.title': 'From my kitchen to production.',
    'projects.note': 'A platform serving 5000+ people, a company’s digital home, and research that made the journal — all still warm.',
    'projects.open': 'Open',
    'projects.p1': '10+ schools run attendance, exams, reports, and admissions here — serving 5000+ people daily.',
    'projects.p2': 'The digital home of an IoT and robotics company — I helped build it, and I keep the lights on.',
    'projects.p3': 'Physics roots, peer-reviewed: research on river sediment pollution, open access at Elsevier.',
    'contact.kicker': 'Contact',
    'contact.title': 'Got an idea to cook?',
    'contact.text': 'Send the rough cut. We will plate it clean.',
    'form.name': 'Full name',
    'form.email': 'Email address',
    'form.message': 'Message',
    'form.placeholder': 'Tell me what we are building...',
    'form.submit': 'Send message',
    'form.sending': 'Sending…',
    'form.success': 'Message sent. I will get back to you soon.',
    'form.error': 'Something broke. Email me at abdussalimsan@gmail.com instead.',
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
  'photos.portfolio': '始まりの場所を見る',
  'career.kicker': '経歴のまとめ',
  'career.title': '信頼性を土台に、プロダクトに進む方向を。',
  'career.note': '2025年からSRE、2023年からフロントエンド。パイプライン20本以上、ドラマはゼロ。',
  'career.metric1': '出荷したCI/CDパイプライン',
  'career.metric2': '毎日届けているユーザー',
  'career.metric3': '止めずに動かす教育機関',
  'career.job1': '7つの教育アプリを落ち着いて安定・安全に保ち、出しやすくしました。',
  'career.job2': '政府の日常業務のためのReact UIを構築・保守しました。',
  'career.job3': '農園マッピング用の位置情報の足跡を集めました。',
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
  'projects.title': '私の台所から、本番環境へ。',
  'projects.note': '5000人以上が使うプラットフォーム、会社のデジタルの家、学術誌に載った研究。どれもまだ温かい。',
  'projects.open': '開く',
  'projects.p1': '10以上の学校が出席・試験・成績・入学をここで運用。毎日5000人以上に届けています。',
  'projects.p2': 'IoTとロボティクスの会社のデジタルの家。作る側でもあり、灯を守る側でもあります。',
  'projects.p3': '物理の根っこから査読論文へ。川の堆積物汚染の研究、Elsevierでオープンアクセス。',
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
  'Kementerian Keuangan RI · via NashTa Group': 'インドネシア共和国 財務省（NashTa Group経由）',
  'DINAS PERTANIAN KABUPATEN KAPUAS': 'カプアス県 農業局',
  'EDUNUSA': 'EDUNUSA',
  'Instrumeta': 'Instrumeta',
  'Heliyon Research': 'Heliyonでの研究',
  'EdTech': '教育テック',
  '10+ institutions': '10以上の教育機関',
  '5000+ users': '5000人以上のユーザー',
  'Company site': '企業サイト',
  'SRE': 'SRE',
  'Research': '研究',
  'Open access': 'オープンアクセス',
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
    if (seen.has(element) || element.closest('.japanese-paper')) return;
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

let japaneseFontLoaded = false;
const loadJapaneseFont = () => {
  if (japaneseFontLoaded) return;
  japaneseFontLoaded = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700;800&display=swap';
  document.head.append(link);
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
    loadJapaneseFont();
    dismissEasterHint();
    if (!frame) frame = requestAnimationFrame(paint);
  }, { passive: true });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Control') return;
    ctrlPressed = true;
    loadJapaneseFont();
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

const openWork = (card) => {
  const projectUrl = card.dataset.projectUrl?.trim();
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

  easterHintClose?.setAttribute('aria-label', language === 'id' ? 'Tutup petunjuk easter egg' : 'Dismiss easter egg hint');

  scheduleJapaneseOverlay();
};

const savedLanguage = localStorage.getItem('portfolio-language');
const initialLanguage = savedLanguage === 'id' ? 'id' : 'en';
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

projectCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('.work-action')) return;
    openWork(card);
  });
});

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const dictionary = translations[document.documentElement.lang] || translations.en;

  submitButton.disabled = true;
  formStatus.className = 'form-status';
  formStatus.textContent = dictionary['form.sending'];

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm),
    });
    if (!response.ok) throw new Error(String(response.status));
    formStatus.classList.add('success');
    formStatus.textContent = dictionary['form.success'];
    contactForm.reset();
  } catch {
    formStatus.classList.add('error');
    formStatus.textContent = dictionary['form.error'];
  } finally {
    submitButton.disabled = false;
  }
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
