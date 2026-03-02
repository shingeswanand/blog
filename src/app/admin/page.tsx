import { AdminLayout } from "@/components/admin/AdminLayout";
<<<<<<< HEAD
=======
import { hasMongoConfig } from "@/lib/mongodb";
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
import { getPosts } from "@/lib/posts";

export default async function AdminDashboardPage() {
  const posts = await getPosts();
  const publishedCount = posts.filter((post) => post.status === "published").length;

  return (
    <AdminLayout title="Dashboard">
<<<<<<< HEAD
=======
      {!hasMongoConfig ? (
        <div className="mb-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          MongoDB is not configured. Add <code>MONGODB_URI</code> in <code>.env.local</code>.
        </div>
      ) : null}
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
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
