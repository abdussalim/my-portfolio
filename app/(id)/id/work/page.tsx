import { getDictionary } from "@/content/dictionary";
import { WorkIndexPage } from "@/components/pages/WorkIndexPage";
import { workIndexMetadata } from "@/lib/routes";

export const metadata = workIndexMetadata("id");

export default function Page() {
  return <WorkIndexPage locale="id" dict={getDictionary("id")} />;
}
