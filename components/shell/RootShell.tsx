import type { ReactNode } from "react";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { personJsonLd } from "@/lib/seo";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { EasterEgg } from "@/components/easter/EasterEgg";
import "@/app/globals.css";

// Runs before paint so the stored or system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Reveal renders opacity:0 until hydration; without JS, show everything. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {dict.nav.skip}
        </a>
        <Nav locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <EasterEgg locale={locale} dict={dict} />
      </body>
    </html>
  );
}
