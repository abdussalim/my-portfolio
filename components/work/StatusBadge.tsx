import type { Dictionary } from "@/content/dictionary";
import type { Project } from "@/content/projects";

/** Honest state of a project. Dot style carries the state, the label carries the meaning. */
export function StatusBadge({ status, dict }: { status: NonNullable<Project["status"]>; dict: Dictionary }) {
  const dot =
    status === "live"
      ? "bg-signal"
      : status === "development"
        ? "border border-signal"
        : "bg-muted";
  return (
    <span className="inline-flex items-center gap-2 rounded border border-line px-2 py-1 font-mono text-xs text-ink">
      <span aria-hidden="true" className={`size-2 rounded-full ${dot}`} />
      {dict.work.statusLabel[status]}
    </span>
  );
}
