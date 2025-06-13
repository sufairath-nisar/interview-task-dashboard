"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost } from "@/lib/api";
import { Button } from "../ui/button";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Input } from "../ui/input";
import { toast } from "sonner";

import { Post } from "@/types";
type PostFormProps = {
  post?: Post; 
};

export default function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const editor = useEditor({ extensions: [StarterKit], content: post?.body || "" });
  const router = useRouter();
  const queryClient = useQueryClient();

  const isEdit = Boolean(post);
  const mutation = useMutation({
    mutationFn: isEdit
  ? () => updatePost(post!.id, { title, body: editor?.getHTML() || "" })
  : () => createPost({ title, body: editor?.getHTML() || "" }),

    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(`Post ${isEdit ? "updated" : "created"}`);
      router.push("/admin");
    },
    onError: () => toast.error("Something went wrong"),
  });

  const handleSubmit = () => {
    if (!title.trim() || !editor?.getHTML().trim()) {
      return toast.error("Title and content are required");
    }
    mutation.mutate();
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <EditorContent editor={editor} className="prose border rounded p-2 min-h-[200px]" />
      <Button onClick={handleSubmit}>{isEdit ? "Update" : "Create"} Post</Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/admin")}
        className="ml-4 bg-red-500 text-white hover:bg-red-600 border-red-500"
      >
        Cancel
      </Button>
    </div>
  );
}
