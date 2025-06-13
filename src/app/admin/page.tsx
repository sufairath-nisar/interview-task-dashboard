import Link from "next/link";
import PostList from "@/components/posts/PostList";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/create">
          <Button>Create New Post</Button>
        </Link>
      </div>
      <PostList isAdmin />
    </div>
  );
}
