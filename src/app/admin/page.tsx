import { AdminLayout } from "@/components/admin/AdminLayout";
import { getPosts } from "@/lib/posts";

export default async function AdminDashboardPage() {
  const posts = await getPosts();
  const publishedCount = posts.filter((post) => post.status === "published").length;

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-4">
          <h3 className="text-sm text-slate-500">Total Posts</h3>
          <p className="mt-2 text-3xl font-semibold">{posts.length}</p>
        </div>
        <div className="card p-4">
          <h3 className="text-sm text-slate-500">Published</h3>
          <p className="mt-2 text-3xl font-semibold">{publishedCount}</p>
        </div>
        <div className="card p-4">
          <h3 className="text-sm text-slate-500">Drafts</h3>
          <p className="mt-2 text-3xl font-semibold">{posts.length - publishedCount}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
