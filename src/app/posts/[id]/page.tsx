// app/posts/[id]/page.tsx
import { getPostById, getPosts } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetails(props: { params: { id: string } }) {
  const id = props.params.id;

  const post = await getPostById(id);

  if (!post || post.id === undefined) {
    notFound();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} className="prose" />
    </div>
  );
}
