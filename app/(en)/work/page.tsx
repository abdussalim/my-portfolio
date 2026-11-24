import { getDictionary } from "@/content/dictionary";
import { WorkIndexPage } from "@/components/pages/WorkIndexPage";
import { workIndexMetadata } from "@/lib/routes";

export const metadata = workIndexMetadata("en");

export default function Page() {
  return <WorkIndexPage locale="en" dict={getDictionary("en")} />;
}
