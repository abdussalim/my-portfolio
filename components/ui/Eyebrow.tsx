/** Section label shared by every home section and the work index. Pair the heading below with mt-4. */
export function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-xs uppercase tracking-widest text-signal-ink">{children}</p>;
}
