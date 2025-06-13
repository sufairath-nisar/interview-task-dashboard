import { getPostById } from "@/lib/api";
import PostForm from "@/components/posts/PostForm";

// ✅ Correct explicit prop type
export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(params.id);

  if (!post || post.id === undefined) {
    return <div>Post not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
