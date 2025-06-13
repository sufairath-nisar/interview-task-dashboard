"use client";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getPosts,
  deletePost,
  createPost,
  updatePost, 
  type Post,
} from "@/lib/api";
import PostCard from "./PostCard";
import { toast } from "sonner";

export default function PostList({ isAdmin = false }: { isAdmin?: boolean }) {
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  
  const {
    data: posts,
    isPending: postsLoading,
    isError,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted");
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  const createMutation = useMutation<Post, Error, { title: string; body: string }>({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(["posts"], (oldPosts = []) => [
        newPost,
        ...(oldPosts || []),
      ]);
      toast.success("Post created!");
      setTitle("");
      setBody("");
      setShowForm(false);
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });

  const updateMutation = useMutation<Post, Error, { id: number; title: string; body: string }>({
    mutationFn: ({ id, title, body }) => updatePost(id, { title, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated");
      setEditingPostId(null);
      setEditTitle("");
      setEditBody("");
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ title, body });
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPostId === null) return;
    updateMutation.mutate({ id: editingPostId, title: editTitle, body: editBody });
  };

  if (postsLoading) return <div>Loading...</div>;
  if (isError || !posts) return <div>Error fetching posts</div>;

  return (
    <div>
      {isAdmin && (
        <div className="mb-6 max-w-lg">
         
          {showForm && (
            <form onSubmit={handleCreate} className="space-y-4">
              <h2 className="text-xl font-semibold">Create New Post</h2>

              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={4}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="btn btn-primary"
                >
                  {createMutation.isPending ? "Creating..." : "Create Post"}
                </button>
            
              </div>
            </form>
          )}

        </div>
      )}

      <div className="grid gap-4 max-w-lg">
        {posts.map((post) =>
          editingPostId === post.id ? (
            <form
              key={post.id}
              onSubmit={handleEditSave}
              className="border p-4 rounded shadow-sm"
            >
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded mb-2"
              />
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                required
                rows={4}
                className="w-full border px-3 py-2 rounded mb-2"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                  {updateMutation.isPending ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPostId(null)}
                  className="btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={post.id}>
              <PostCard
                post={post}
                isAdmin={isAdmin}
                onDelete={() => deleteMutation.mutate(post.id)}
              />
              {isAdmin && (
                <button
                  onClick={() => {
                    setEditingPostId(post.id);
                    setEditTitle(post.title);
                    setEditBody(post.body);
                  }}
                  className="btn  mt-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit Inline
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
