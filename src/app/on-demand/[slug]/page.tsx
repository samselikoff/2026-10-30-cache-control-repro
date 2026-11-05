// Only /on-demand/build-time is prerendered at build. Any other slug is
// rendered on its first request and then cached.
export function generateStaticParams() {
  return [{ slug: 'build-time' }];
}

async function getContent(slug: string) {
  'use cache';
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { slug, generatedAt: new Date().toISOString() };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent(slug);
  return (
    <main>
      <h2 className="text-xl font-medium">On demand: {content.slug}</h2>
      <p>Generated: {content.generatedAt}</p>
    </main>
  );
}
