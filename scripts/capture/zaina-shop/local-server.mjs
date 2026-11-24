// Local stand-in for `wrangler pages dev` (workerd crashes on this Windows host, see report).
// Loads the REAL built Worker (zaina-shop/apps/web/dist/_worker.js) and gives it a D1-compatible
// binding backed by node:sqlite (in-memory), seeded from the repo's schema migrations + our fictional seed.
// Nothing touches Cloudflare. Usage: node local-server.mjs <zainaRepoDir> <seedSql> <port>
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [repo, seedSql, portArg] = process.argv.slice(2);
const port = Number(portArg || 8790);
const dist = path.join(repo, "apps/web/dist");

const db = new DatabaseSync(":memory:");
for (const f of ["0001_initial_d1.sql", "0004_monitor_cctv.sql"]) db.exec(readFileSync(path.join(repo, "migrations", f), "utf8"));
db.exec(readFileSync(seedSql, "utf8"));

const norm = (v) => (v === undefined ? null : typeof v === "boolean" ? Number(v) : v);
const d1 = {
  prepare(sql) {
    let params = [];
    const stmt = {
      bind(...v) { params = v.map(norm); return stmt; },
      async all() {
        const s = db.prepare(sql);
        if (/^\s*(select|with|pragma)/i.test(sql) || /\breturning\b/i.test(sql)) {
          const results = s.all(...params);
          return { results, success: true, meta: { changes: 0 } };
        }
        const r = s.run(...params);
        return { results: [], success: true, meta: { changes: Number(r.changes) } };
      },
      async first() { const r = await stmt.all(); return r.results[0] ?? null; },
      async run() { return stmt.all(); },
    };
    return stmt;
  },
  async exec(sql) { db.exec(sql); return { count: 1, duration: 0 }; },
  async batch(stmts) { return Promise.all(stmts.map((s) => s.all())); },
};

const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json", ".json": "application/json", ".woff2": "font/woff2", ".webp": "image/webp", ".ico": "image/x-icon" };
const ASSETS = {
  async fetch(req) {
    const url = new URL(req.url);
    let p = path.join(dist, decodeURIComponent(url.pathname));
    if (!p.startsWith(dist) || !existsSync(p) || statSync(p).isDirectory()) p = path.join(dist, "index.html");
    const ext = path.extname(p);
    return new Response(readFileSync(p), { headers: { "content-type": types[ext] ?? "application/octet-stream", "cache-control": "no-store" } });
  },
};
const env = { DB: d1, ASSETS, SESSION_SECRET: randomBytes(24).toString("hex"), MONITOR_AGENT_KEY: randomBytes(16).toString("hex") };
const worker = (await import(pathToFileURL(path.join(dist, "_worker.js")).href)).default;
const ctx = { waitUntil() {}, passThroughOnException() {} };

createServer(async (nreq, nres) => {
  try {
    const chunks = [];
    for await (const c of nreq) chunks.push(c);
    const body = chunks.length ? Buffer.concat(chunks) : undefined;
    const req = new Request(`http://localhost:${port}${nreq.url}`, { method: nreq.method, headers: nreq.headers, body: ["GET", "HEAD"].includes(nreq.method) ? undefined : body });
    const res = await worker.fetch(req, env, ctx);
    const headers = {};
    res.headers.forEach((v, k) => { headers[k] = v; });
    const sc = res.headers.getSetCookie?.() ?? [];
    if (sc.length) headers["set-cookie"] = sc;
    nres.writeHead(res.status, headers);
    nres.end(Buffer.from(await res.arrayBuffer()));
  } catch (e) {
    console.error(e);
    nres.writeHead(500); nres.end(String(e));
  }
}).listen(port, "127.0.0.1", () => console.log(`zaina local on http://localhost:${port}`));
