// Japanese layer for the CTRL lens easter egg.
// Keys are dictionary paths (see content/dictionary.ts). Values are shown only
// inside the lens. Proper nouns, tech names, and numbers are intentionally
// absent: they are identical in Japanese, so no overlay is needed.
export const japanese: Record<string, string> = {
  // nav
  "nav.about": "私について",
  "nav.career": "経歴",
  "nav.story": "ストーリー",
  "nav.works": "制作",
  "nav.contact": "連絡",
  "nav.switchLabel": "インドネシア語で読む",
  "nav.skip": "本文へ移動",

  // hero
  "hero.eyebrow": "サイト信頼性エンジニア / フルスタック / IoT",
  "hero.title": "堅牢なシステムを作り、きれいに届けます。",
  "hero.lead": "センサーから本番環境まで。CI/CD、インフラ、その上のWebアプリを、動かし続けます。",
  "hero.primary": "制作を見る",
  "hero.secondary": "連絡する",
  "hero.station": "拠点、ジャカルタ",

  // about
  "about.title": "システムを動かし続けながら、プロダクトも作ります。",
  "about.text":
    "信頼性、CI/CD、Linux、Webアプリが私の領域です。アイデアがまだ粗くても、インフラから画面まで形にします。",
  "about.metrics.0.label": "出荷したCI/CDパイプライン",
  "about.metrics.1.label": "毎日届けているユーザー",
  "about.metrics.2.label": "止めずに動かす教育機関",

  // photos
  "photos.title": "ターミナルの外で。",
  "photos.note": "歩き、学び、アイデアを整えていく小さな記録です。",
  "photos.items.0.caption": "フィールドモード",
  "photos.items.1.caption": "静かに作る時間",
  "photos.items.2.caption": "オフの日",

  // career
  "career.eyebrow": "経歴",
  "career.title": "まず信頼性。プロダクトは走り続ける。",
  "career.note": "2025年からSRE、2023年からフロントエンド。パイプライン20本以上、ドラマはゼロ。",
  "career.jobs.0.date": "2025年5月 - 現在",
  "career.jobs.0.role": "サイト信頼性エンジニア",
  "career.jobs.0.text":
    "LinuxとGitHub Actions、Docker、Traefik、Vaultで、7つの教育アプリを安定・安全に保ち、出しやすくしています。",
  "career.jobs.1.date": "2023年2月 - 2026年2月",
  "career.jobs.1.role": "フロントエンドWeb開発者",
  "career.jobs.1.org": "インドネシア共和国 財務省（NashTa Group経由）",
  "career.jobs.1.text": "政府の日常業務のためのReact UIを構築・保守しました。",
  "career.jobs.2.date": "2021年1月 - 2021年9月",
  "career.jobs.2.role": "測量技術者",
  "career.jobs.2.org": "カプアス県 農業局",
  "career.jobs.2.text": "アブラヤシ農園のために現地データをマッピングしました。",
  "career.skillGroups.0.title": "信頼性とDevOps",
  "career.skillGroups.0.items.6": "Kubernetes（学習中）",
  "career.skillGroups.0.items.7": "Terraform（学習中）",
  "career.skillGroups.0.items.8": "Prometheus/Grafana（学習中）",
  "career.skillGroups.1.title": "プロダクト開発",
  "career.skillGroups.2.title": "データ",
  "career.certsTitle": "資格とコミュニティ",

  // story
  "story.title": "小さな配線から、長く使えるシステムへ。",
  "story.steps.0.title": "空気を読む。",
  "story.steps.0.text": "物理で、原因・測定・フィードバックを読む癖がつきました。",
  "story.steps.1.title": "試作を作る。",
  "story.steps.1.text": "センサーとArduinoが、最初の実験台所でした。",
  "story.steps.2.title": "Webで包む。",
  "story.steps.2.text": "生データが、フロー、ダッシュボード、UIになります。",
  "story.steps.3.title": "皿を出す。",
  "story.steps.3.text": "できあがったら、軽く、すぐ使える形で本番へ届けます。",

  // projects
  "projects.eyebrow": "選んだ制作",
  "projects.title": "私の台所から、本番環境へ。",
  "projects.note": "5000人以上が使うプラットフォーム、会社のデジタルの家、学術誌に載った研究。",
  "projects.open": "サイトを見る",
  "projects.caseStudy": "ケーススタディを読む",
  "projects.origins": "始まりの場所を見る",
  "projects.items.edunusa.summary":
    "10以上の学校が出席・試験・成績・入学をここで運用。毎日5000人以上に届けています。",
  "projects.items.edunusa.tags.0": "教育テック",
  "projects.items.edunusa.tags.1": "10以上の教育機関",
  "projects.items.edunusa.tags.2": "5000人以上のユーザー",
  "projects.items.edunusa.role": "サイト信頼性エンジニア",
  "projects.items.instrumeta.summary":
    "IoTとロボティクスの会社のデジタルの家。作る側でもあり、灯を守る側でもあります。",
  "projects.items.instrumeta.tags.0": "企業サイト",
  "projects.items.instrumeta.role": "サイト信頼性エンジニア",
  "projects.items.heliyon-research.summary":
    "物理の根っこから査読論文へ。川の堆積物汚染の研究、Elsevierでオープンアクセス。",
  "projects.items.heliyon-research.tags.0": "研究",
  "projects.items.heliyon-research.tags.1": "オープンアクセス",

  // contact
  "contact.title": "一緒に作りたいアイデアがありますか？",
  "contact.text": "まだ粗いままで大丈夫です。きれいに整えて、届けられる形にしましょう。",
  "contact.emailLabel": "またはメール",
  "contact.form.name": "お名前",
  "contact.form.email": "メールアドレス",
  "contact.form.message": "メッセージ",
  "contact.form.submit": "送信する",
  "contact.form.sending": "送信中...",
  "contact.form.success": "送信しました。まもなくお返事します。",
  "contact.form.error": "送信に失敗しました。代わりに abdussalimsan@gmail.com へメールしてください。",

  // footer
  "footer.created": "きれいに整えたのは",
  "footer.rights": "無断転載を禁じます。",

  // origins page
  "origins.label": "始まり",
  "origins.title": "すべての始まりになった、三つの初期実験。",
  "origins.text": "学生時代のハードウェア優先の試作。好奇心はここから来ました。",
  "origins.back": "最近の制作を見る",
  "origins.archived": "アーカイブ",
  "origins.cards.bahinak.kicker": "IoT試作",
  "origins.cards.bahinak.text": "センサーと小さなダッシュボードで、手元の機器から空気の質を確認します。",
  "origins.cards.motobike.kicker": "音声試作",
  "origins.cards.motobike.text": "声でエンジンがかかるバイク。デモはDriveに録画してあります。",
  "origins.cards.qr.kicker": "キャンパスのプロジェクト",
  "origins.cards.qr.text": "QRスキャンで商品の詳細と価格を表示。懐かしいアーカイブです。",

  // work (case study) labels
  "work.back": "すべての制作",
  "work.role": "役割",
  "work.stack": "技術構成",
  "work.year": "年",
  "work.challenge": "課題",
  "work.approach": "やったこと",
  "work.outcome": "成果",
  "work.visit": "訪問する",
  "work.next": "次のプロジェクト",
};
