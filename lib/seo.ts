import type { Metadata } from "next";
import { localePath, site, type Locale } from "@/content/site";

/** Canonical + hreflang alternates for a path that exists in both locales. */
export function alternates(locale: Locale, path = "/"): Metadata["alternates"] {
  return {
    canonical: `${site.url}${localePath(locale, path)}`,
    languages: {
      en: `${site.url}${localePath("en", path)}`,
      id: `${site.url}${localePath("id", path)}`,
      "x-default": `${site.url}${localePath("en", path)}`,
    },
  };
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  image ??= `/img/og/og-${locale}.png`;
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: {
      type: "website",
      url: `${site.url}${localePath(locale, path)}`,
      siteName: site.name,
      title,
      description,
      locale: locale === "en" ? "en_US" : "id_ID",
      alternateLocale: locale === "en" ? ["id_ID"] : ["en_US"],
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    icons: { icon: "/img/favicon.png" },
  };
}

export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        url: site.url,
        image: `${site.url}${site.ogImage}`,
        email: `mailto:${site.email}`,
        jobTitle: "Site Reliability Engineer",
        worksFor: { "@type": "Organization", name: "PT Instrumeta Teknologi Nusantara", url: "https://instrumeta.id" },
        address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
        knowsAbout: [
          "Site Reliability Engineering",
          "DevOps",
          "CI/CD",
          "GitHub Actions",
          "Docker",
          "Linux",
          "AWS",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "IoT",
          "Digital mapping",
        ],
        hasCredential: [
          { "@type": "EducationalOccupationalCredential", name: "AWS Certified Solutions Architect - Associate" },
          { "@type": "EducationalOccupationalCredential", name: "AWS Certified Cloud Practitioner" },
        ],
        sameAs: site.socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: locale === "en" ? "en" : "id",
        publisher: { "@id": `${site.url}/#person` },
      },
    ],
  };
}
