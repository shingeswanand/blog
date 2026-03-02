import { AdminLayout } from "@/components/admin/AdminLayout";
import { hasMongoConfig } from "@/lib/mongodb";
import { getPosts } from "@/lib/posts";

export default async function AdminDashboardPage() {
  const posts = hasMongoConfig ? await getPosts() : [];
  const publishedCount = posts.filter((post) => post.status === "published").length;

  return (
    <AdminLayout title="Dashboard">
      {!hasMongoConfig ? (
        <div className="card p-4 text-sm text-amber-700">
          MongoDB is not configured. Add <code>MONGODB_URI</code> to <code>.env.local</code> to enable post management.
        </div>
      ) : null}

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
