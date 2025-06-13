// src/app/test/[slug]/page.tsx
interface TestPageProps {
  params: {
    slug: string;
  };
}

export default function TestPage({ params }: TestPageProps) {
  return (
    <div>
      <h1>Test Page: {params.slug}</h1>
    </div>
  );
}