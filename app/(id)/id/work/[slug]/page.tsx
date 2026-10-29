import { getDictionary } from "@/content/dictionary";
import { WorkPage } from "@/components/pages/WorkPage";
import { workMetadata, workParams } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = workParams;

export async function generateMetadata({ params }: Props) {
  return workMetadata("id", (await params).slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <WorkPage locale="id" dict={getDictionary("id")} slug={slug} />;
}
