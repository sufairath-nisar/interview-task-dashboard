const BASE_URL = "https://jsonplaceholder.typicode.com";

export type Post = { id: number; title: string; body: string };

export const getPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const getPostById = async (id: string): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
};

export const createPost = async (post: { title: string; body: string }): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const updatePost = async (id: number, post: { title: string; body: string }): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const deletePost = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete post");
};
