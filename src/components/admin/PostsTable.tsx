"use client";

import { useRouter } from "next/navigation";

type Row = {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  status: string;
  createdAt?: Date;
};

export function PostsTable({ posts }: { posts: Row[] }) {
  const router = useRouter();

  async function removePost(id?: string) {
    if (!id) return;

    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="card overflow-hidden">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Tags</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="border-t border-adminBorder">
              <td className="px-4 py-3">
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-slate-500">/{post.slug}</p>
              </td>
              <td className="px-4 py-3">{post.category}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {post.tags.length ? post.tags.map((tag) => (
                    <span key={tag} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">#{tag}</span>
                  )) : <span className="text-xs text-slate-400">No tags</span>}
                </div>
              </td>
              <td className="px-4 py-3 capitalize">{post.status}</td>
              <td className="px-4 py-3">
                <button className="button-secondary" onClick={() => removePost(post._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
