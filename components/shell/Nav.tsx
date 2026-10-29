"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { List, Moon, Sun, X } from "@phosphor-icons/react";
import { localePath } from "@/content/site";
import type { SectionProps } from "@/components/ui/types";

const sections = ["about", "career", "story", "projects", "contact"] as const;

/** Maps the current path to the same page in the other locale. */
function switchPath(pathname: string, toId: boolean): string {
  const bare = pathname.replace(/^\/id(?=\/|$)/, "") || "/";
  return toId ? (bare === "/" ? "/id/" : `/id${bare}`) : bare;
}

export function Nav({ locale, dict }: SectionProps) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  const home = localePath(locale, "/");
  const labels = {
    about: dict.nav.about,
    career: dict.nav.career,
    story: dict.nav.story,
    projects: dict.nav.works,
    contact: dict.nav.contact,
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 md:px-8" aria-label="Primary">
        <a href={home} className="font-display text-lg font-semibold tracking-tight">
          Abdus Salim
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((id) => (
              <li key={id}>
                <a href={`${home}#${id}`} className="rounded px-3 py-2 text-sm text-muted transition-colors hover:text-ink">
                  {labels[id]}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={switchPath(pathname, locale === "en")}
            hrefLang={locale === "en" ? "id" : "en"}
            aria-label={dict.nav.switchLabel}
            className="rounded px-3 py-2 font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            {dict.nav.switchShort}
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dict.nav.themeLabel}
            className="grid size-10 place-items-center rounded text-muted transition-colors hover:text-ink"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={dict.nav.menuLabel}
            className="grid size-10 place-items-center rounded text-ink md:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
          <ul className="flex flex-col px-4 py-4">
            {sections.map((id) => (
              <li key={id}>
                <a
                  href={`${home}#${id}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-2xl tracking-tight"
                >
                  {labels[id]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
