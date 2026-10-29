import type { SectionProps } from "@/components/ui/types";
import { StoryProfile } from "./StoryProfile";

export function Story({ dict }: SectionProps) {
  return (
    <section id="story" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <StoryProfile title={dict.story.title} steps={dict.story.steps} />
      </div>
    </section>
  );
}
