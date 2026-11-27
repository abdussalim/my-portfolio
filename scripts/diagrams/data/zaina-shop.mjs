export default {
  height: 1000,
  eyebrow: "Architecture / Zaina Shop",
  title: "Store PWA on Cloudflare with an edge counter",
  subtitle: "Inventory and sales on Pages, D1 and R2, plus a visitor counter at the shop.",
  legend: ["primary request / data path", "public catalog path"],
  groups: [
    { x: 340, y: 180, w: 1204, h: 440, label: "Cloudflare" },
    { x: 340, y: 680, w: 1204, h: 220, label: "Store PC (edge agent)" },
  ],
  nodes: [
    { id: "staff", x: 56, y: 250, w: 230, h: 110, t: "Staff PWA", s: ["React 19, offline,", "IndexedDB snapshot"] },
    { id: "cust", x: 56, y: 430, w: 230, h: 100, t: "Customers", s: ["public storefront,", "order by WhatsApp link"] },
    { id: "pw", x: 400, y: 330, w: 340, h: 110, t: "Pages + Hono Worker", s: ["static assets,", "/api/v1/*, monitor routes"], k: "strong" },
    { id: "d1", x: 900, y: 250, w: 260, h: 84, t: "D1", s: ["catalog, stock, sales"], k: "strong" },
    { id: "r2", x: 900, y: 400, w: 260, h: 84, t: "R2", s: ["product images,", "CCTV snapshot"] },
    { id: "cam", x: 380, y: 750, w: 300, h: 100, t: "RTSP cameras", s: ["cam1 inside, cam2 door"] },
    { id: "cv", x: 780, y: 750, w: 360, h: 100, t: "OpenVINO person counter", s: ["Python, person detection", "and centroid tracker"], k: "strong" },
  ],
  edges: [
    { from: "staff.r", to: "pw.l", primary: true, fa: 0.5, mid: 340, label: "", },
    { from: "cust.r", to: "pw.l", fa: 0.5, ta: 0.75, dashed: true, mid: 340 },
    { from: "pw.r", to: "d1.l", primary: true, fa: 0.3, mid: 820 },
    { from: "pw.r", to: "r2.l", fa: 0.7, mid: 820 },
    { from: "cam.r", to: "cv.l", primary: true, label: "RTSP" },
    { from: "cv.t", to: "pw.b", primary: true, both: true, ta: 0.7, fa: 0.3, label: "HTTPS events, control", lp: 0.5 },
  ],
};
