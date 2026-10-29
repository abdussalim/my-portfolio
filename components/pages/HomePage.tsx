import type { SectionProps } from "@/components/ui/types";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Photos } from "@/components/home/Photos";
import { Career } from "@/components/home/Career";
import { Story } from "@/components/home/Story";
import { Projects } from "@/components/home/Projects";
import { Contact } from "@/components/home/Contact";

// Section order and anchor ids (#home, #about, #photos, #career, #story,
// #projects, #contact) match the old site so inbound links keep working.
export function HomePage(props: SectionProps) {
  return (
    <>
      <Hero {...props} />
      <About {...props} />
      <Photos {...props} />
      <Career {...props} />
      <Story {...props} />
      <Projects {...props} />
      <Contact {...props} />
    </>
  );
}
