// Shared button styles. One radius (4px), one accent. Labels never wrap.
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded px-5 h-11 text-sm font-medium transition-[transform,background-color,color,border-color] duration-200 ease-out-expo active:translate-y-px";

export const buttonPrimary = `${base} bg-signal text-on-signal hover:brightness-110`;
export const buttonSecondary = `${base} border border-line text-ink hover:border-ink`;
export const linkArrow =
  "inline-flex items-center gap-1.5 text-sm font-medium text-signal-ink underline-offset-4 hover:underline";
