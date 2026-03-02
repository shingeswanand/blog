import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostsManager } from "@/components/admin/PostsManager";
import { hasMongoConfig } from "@/lib/mongodb";
import { getPosts } from "@/lib/posts";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <AdminLayout title="Posts">
      {!hasMongoConfig ? (
        <div className="mb-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          MongoDB is not configured. Add <code>MONGODB_URI</code> in <code>.env.local</code>.
        </div>
      ) : null}
      <PostsManager posts={posts} />
    </AdminLayout>
  );
}
