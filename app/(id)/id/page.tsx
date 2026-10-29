import { getDictionary } from "@/content/dictionary";
import { HomePage } from "@/components/pages/HomePage";
import { homeMetadata } from "@/lib/routes";

export const metadata = homeMetadata("id");

export default function Page() {
  return <HomePage locale="id" dict={getDictionary("id")} />;
}
