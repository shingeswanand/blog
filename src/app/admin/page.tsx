import { AdminLayout } from "@/components/admin/AdminLayout";
import { hasMongoConfig } from "@/lib/mongodb";
import { getPosts } from "@/lib/posts";

export default async function AdminDashboardPage() {
  const posts = hasMongoConfig ? await getPosts() : [];
  const publishedCount = posts.filter((post) => post.status === "published").length;

  const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <AdminLayout title="Dashboard">
      {!hasMongoConfig ? (
        <div className="card p-4 text-sm text-amber-700">
          MongoDB is not configured. Add <code>MONGODB_URI</code> to <code>.env.local</code> to enable post management.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
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
        <div className="card p-4">
          <h3 className="text-sm text-slate-500">Top Category</h3>
          <p className="mt-2 text-lg font-semibold">{topCategory ? `${topCategory[0]} (${topCategory[1]})` : "N/A"}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
