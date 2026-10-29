"use client";

import { useEffect, useRef } from "react";

// ---------- deterministic seeded value noise + fbm ----------
function makeNoise(seed: number) {
  const hash = (x: number, y: number) => {
    let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967295;
  };
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const value = (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const sx = smooth(x - xi);
    const sy = smooth(y - yi);
    const a = hash(xi, yi);
    const b = hash(xi + 1, yi);
    const c = hash(xi, yi + 1);
    const d = hash(xi + 1, yi + 1);
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  };
  return (x: number, y: number) => {
    let sum = 0;
    let amp = 0.5;
    let freq = 1;
    for (let i = 0; i < 4; i++) {
      sum += amp * value(x * freq, y * freq);
      freq *= 2.03;
      amp *= 0.5;
    }
    return sum / 0.9375; // normalise to ~0..1
  };
}

const CELL = 9; // css px
const LEVEL_COUNT = 15;
const LEVEL_MIN = 0.1;
const LEVEL_MAX = 0.9;
const HILL_SIGMA = 95; // css px
const HILL_AMP = 0.32;

export function ContourField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const noise = makeNoise(7);
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMq = window.matchMedia("(pointer: fine)");

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let grid = new Float32Array(0);
    let stroke = "#888";

    // hill state (css px relative to canvas)
    let hx = 0;
    let hy = 0;
    let hs = 0; // current strength 0..1
    let tx = 0;
    let ty = 0;
    let ts = 0; // target strength
    let hillInit = false;

    let raf = 0;
    let visible = true;
    let last = 0;
    let time = 0;

    const readColor = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--contour")
        .trim();
      if (v) stroke = v;
    };

    const levels: number[] = [];
    for (let i = 0; i < LEVEL_COUNT; i++) {
      levels.push(LEVEL_MIN + ((LEVEL_MAX - LEVEL_MIN) * i) / (LEVEL_COUNT - 1));
    }

    const sample = (t: number) => {
      const stride = cols + 1;
      const sc = 0.0042;
      const ox = t * 0.018;
      const oy = -t * 0.012;
      const wob = Math.sin(t * 0.05) * 0.35;
      const s2 = 2 * HILL_SIGMA * HILL_SIGMA;
      for (let j = 0; j <= rows; j++) {
        const py = j * CELL;
        for (let i = 0; i <= cols; i++) {
          const px = i * CELL;
          let v = noise(px * sc + ox + 10, py * sc + oy + 10 + wob * 0.2);
          v = 0.5 + (v - 0.5) * 1.9;
          if (hs > 0.001) {
            const dx = px - hx;
            const dy = py - hy;
            v += HILL_AMP * hs * Math.exp(-(dx * dx + dy * dy) / s2);
          }
          grid[j * stride + i] = v;
        }
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (cols < 1 || rows < 1) return;
      sample(time);
      const stride = cols + 1;
      ctx.lineCap = "round";
      ctx.strokeStyle = stroke;

      for (let li = 0; li < levels.length; li++) {
        const L = levels[li];
        const index = li % 5 === 0;
        ctx.globalAlpha = index ? 0.85 : 0.42;
        ctx.lineWidth = index ? 1.5 : 0.9;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const a = grid[j * stride + i];
            const b = grid[j * stride + i + 1];
            const c = grid[(j + 1) * stride + i + 1];
            const d = grid[(j + 1) * stride + i];
            const idx =
              (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x0 = i * CELL;
            const y0 = j * CELL;
            // edge crossings
            const topX = x0 + CELL * ((L - a) / (b - a));
            const botX = x0 + CELL * ((L - d) / (c - d));
            const leftY = y0 + CELL * ((L - a) / (d - a));
            const rightY = y0 + CELL * ((L - b) / (c - b));
            const x1 = x0 + CELL;
            const y1 = y0 + CELL;
            const seg = (ax: number, ay: number, bx: number, by: number) => {
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
            };
            switch (idx) {
              case 1:
              case 14:
                seg(x0, leftY, botX, y1);
                break;
              case 2:
              case 13:
                seg(botX, y1, x1, rightY);
                break;
              case 3:
              case 12:
                seg(x0, leftY, x1, rightY);
                break;
              case 4:
              case 11:
                seg(topX, y0, x1, rightY);
                break;
              case 6:
              case 9:
                seg(topX, y0, botX, y1);
                break;
              case 7:
              case 8:
                seg(x0, leftY, topX, y0);
                break;
              case 5: {
                const centre = (a + b + c + d) / 4 > L;
                if (centre) {
                  seg(x0, leftY, topX, y0);
                  seg(botX, y1, x1, rightY);
                } else {
                  seg(topX, y0, x1, rightY);
                  seg(x0, leftY, botX, y1);
                }
                break;
              }
              case 10: {
                const centre = (a + b + c + d) / 4 > L;
                if (centre) {
                  seg(topX, y0, x1, rightY);
                  seg(x0, leftY, botX, y1);
                } else {
                  seg(x0, leftY, topX, y0);
                  seg(botX, y1, x1, rightY);
                }
                break;
              }
            }
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      grid = new Float32Array((cols + 1) * (rows + 1));
      if (!hillInit) {
        hx = tx = w / 2;
        hy = ty = h / 2;
      }
      draw();
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      time += dt;
      const k = 1 - Math.exp(-dt * 6);
      hx += (tx - hx) * k;
      hy += (ty - hy) * k;
      hs += (ts - hs) * (1 - Math.exp(-dt * 4));
      draw();
      schedule();
    };

    const canRun = () => visible && !document.hidden && !reducedMq.matches;
    const schedule = () => {
      if (!raf && canRun()) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      last = performance.now();
      schedule();
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (reducedMq.matches || !fineMq.matches || e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!hillInit || hs < 0.02) {
        hx = tx;
        hy = ty;
        hillInit = true;
      }
      ts = 1;
    };
    const onLeave = () => {
      ts = 0;
    };

    const onReduced = () => {
      if (reducedMq.matches) {
        stop();
        hs = 0;
        ts = 0;
        draw();
      } else {
        start();
      }
    };
    const onVisibility = () => (canRun() ? start() : stop());

    readColor();
    resize();
    time = 4;
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readColor();
      if (!raf) draw();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    reducedMq.addEventListener("change", onReduced);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      reducedMq.removeEventListener("change", onReduced);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
