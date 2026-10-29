import { site } from "@/content/site";
import type { SectionProps } from "@/components/ui/types";

export function Footer({ dict }: SectionProps) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          {dict.footer.created}{" "}
          <a href={site.socials[2].href} target="_blank" rel="noopener" className="text-ink underline-offset-4 hover:underline">
            {site.name}
          </a>
        </p>
        <p className="font-mono text-xs">
          &copy; {new Date().getFullYear()} {site.name}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
