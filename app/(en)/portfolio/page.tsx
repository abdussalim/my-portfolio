import { getDictionary } from "@/content/dictionary";
import { OriginsPage } from "@/components/pages/OriginsPage";
import { originsMetadata } from "@/lib/routes";

export const metadata = originsMetadata("en");

export default function Page() {
  return <OriginsPage locale="en" dict={getDictionary("en")} />;
}
