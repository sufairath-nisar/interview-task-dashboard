import PostForm from "@/components/posts/PostForm";
import { getPostById } from "@/lib/api";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;  // Await params here
  const post = await getPostById(id);

  if (!post || post.id === undefined) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
