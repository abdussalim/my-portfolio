import type { SectionProps } from "@/components/ui/types";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function Contact({ dict }: SectionProps) {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 md:grid-cols-12 md:gap-16 md:px-8">
        <Reveal className="md:col-span-5">
          <h2 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
            {dict.contact.title}
          </h2>
          <p className="mt-6 max-w-[40ch] text-base text-muted md:text-lg">{dict.contact.text}</p>
          <p className="mt-8 font-mono text-xs text-muted">{dict.contact.emailLabel}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 inline-block break-all font-display text-xl font-medium text-ink underline decoration-signal underline-offset-4 hover:text-signal-ink"
          >
            {site.email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7">
          <ContactForm form={dict.contact.form} />
        </Reveal>
      </div>
    </section>
  );
}
