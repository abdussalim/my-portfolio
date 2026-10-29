"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

type Step = { title: string; text: string };

// Four stations along a rising terrain line (viewBox 400 x 300).
const STATIONS = [
  { x: 40, y: 240 },
  { x: 150, y: 185 },
  { x: 260, y: 115 },
  { x: 370, y: 45 },
];
const PATH =
  "M6 264 C 24 264 26 240 40 240 C 84 240 106 185 150 185 C 194 185 216 115 260 115 C 304 115 326 45 370 45 L 394 45";

function Profile({
  progress,
  active,
  animated,
}: {
  progress: MotionValue<number> | null;
  active: number;
  animated: boolean;
}) {
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" aria-hidden="true">
      {[70, 130, 190, 250].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--contour)" strokeWidth="1" strokeDasharray="2 6" />
      ))}
      <path d={PATH} fill="none" stroke="var(--contour)" strokeWidth="1.5" />
      {animated && progress ? (
        <motion.path
          d={PATH}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      ) : (
        <path d={PATH} fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      )}
      {STATIONS.map((s, i) => {
        const on = animated && i === active;
        return (
          <g key={i}>
            <line x1={s.x} x2={s.x} y1={s.y} y2="280" stroke="var(--contour)" strokeWidth="1" />
            <circle
              cx={s.x}
              cy={s.y}
              r="7"
              strokeWidth="2"
              style={{
                fill: on ? "var(--signal)" : "var(--paper)",
                stroke: on ? "var(--signal)" : "var(--ink)",
                transition: "fill 0.3s, stroke 0.3s",
              }}
            />
            <text x={s.x} y="294" textAnchor="middle" className="font-mono" fontSize="11" style={{ fill: "var(--muted)" }}>
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function StoryProfile({ title, steps }: { title: string; steps: readonly Step[] }) {
  const reduce = useReducedMotion();
  const stepsRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 65%", "end 60%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.max(0, Math.min(steps.length - 1, Math.floor(v * steps.length))));
  });

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5">
        <div className="md:sticky md:top-24">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl">
            {title}
          </h2>
          <div className="mt-8 md:hidden">
            <Profile progress={null} active={0} animated={false} />
          </div>
          <div className="mt-10 hidden md:block">
            <Profile progress={reduce ? null : draw} active={active} animated={!reduce} />
          </div>
        </div>
      </div>
      <ol ref={stepsRef} className="md:col-span-7">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="border-t border-line py-8 md:flex md:min-h-[55vh] md:flex-col md:justify-center md:py-12"
          >
            <span className="font-mono text-sm text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">{s.title}</h3>
            <p className="mt-3 max-w-[48ch] text-base text-muted md:text-lg">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
