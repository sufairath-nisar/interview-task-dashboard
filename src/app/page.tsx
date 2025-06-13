import PostList from "@/components/posts/PostList";

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Public Posts</h1>
      <PostList isAdmin={false} />
    </div>
  );
}
