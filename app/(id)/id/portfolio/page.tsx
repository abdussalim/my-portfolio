import { getDictionary } from "@/content/dictionary";
import { OriginsPage } from "@/components/pages/OriginsPage";
import { originsMetadata } from "@/lib/routes";

export const metadata = originsMetadata("id");

export default function Page() {
  return <OriginsPage locale="id" dict={getDictionary("id")} />;
}
