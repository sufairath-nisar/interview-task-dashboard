import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Post } from "@/types"; 
type PostCardProps = {
  post: Post;
  isAdmin?: boolean;
  onDelete: (id: number) => void;
};

export default function PostCard({ post, isAdmin = false, onDelete }: PostCardProps) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: post.body.slice(0, 100) + "..." }} />
      <div className="mt-2 flex gap-2">
        <Link href={`/posts/${post.id}`}>
          <Button size="sm" variant="outline">View</Button>
        </Link>
        {isAdmin && (
          <>
            <Link href={`/admin/edit/${post.id}`}>
              <Button size="sm">Edit</Button>
            </Link>
            <Button size="sm" variant="destructive" onClick={() => onDelete(post.id)}>Delete</Button>
          </>
        )}
      </div>
    </div>
  );
}
