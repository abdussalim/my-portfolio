import { getDictionary } from "@/content/dictionary";
import { HomePage } from "@/components/pages/HomePage";
import { homeMetadata } from "@/lib/routes";

export const metadata = homeMetadata("en");

export default function Page() {
  return <HomePage locale="en" dict={getDictionary("en")} />;
}
