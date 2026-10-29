export const site = {
  url: "https://www.abdussalim.my.id",
  name: "Abdus Salim",
  email: "abdussalimsan@gmail.com",
  formAction: "https://formspree.io/f/xnjkaaky",
  ogImage: "/img/portraits/sarimu-3-display.png",
  // Jakarta, shown as the survey station label in the hero.
  coordinates: { lat: -6.2088, lng: 106.8456, label: "6.2088° S, 106.8456° E" },
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/abdussalim" },
    { label: "GitHub", href: "https://github.com/abdussalim" },
    { label: "Instagram", href: "https://www.instagram.com/karaage_sarimu/" },
  ],
} as const;

export type Locale = "en" | "id";
export const locales: Locale[] = ["en", "id"];

/** Path prefix for a locale: English lives at the root, Indonesian under /id. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  return clean === "/" ? "/id/" : `/id${clean}`;
}
