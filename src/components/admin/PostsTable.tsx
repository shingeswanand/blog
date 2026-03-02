"use client";

import { useRouter } from "next/navigation";

type Row = {
  _id?: string;
  title: string;
  slug: string;
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
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="border-t border-adminBorder">
              <td className="px-4 py-3">{post.title}</td>
              <td className="px-4 py-3 text-slate-600">{post.slug}</td>
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
