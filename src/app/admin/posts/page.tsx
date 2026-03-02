import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostsManager } from "@/components/admin/PostsManager";
import { hasMongoConfig } from "@/lib/mongodb";
import { getPosts } from "@/lib/posts";

export default async function AdminPostsPage() {
  const posts = hasMongoConfig ? await getPosts() : [];

  return (
    <AdminLayout title="Posts">
      {!hasMongoConfig ? (
        <div className="card p-4 text-sm text-amber-700">
          MongoDB is not configured. Add <code>MONGODB_URI</code> to <code>.env.local</code> to create and delete posts.
        </div>
      ) : null}
      <PostsManager
        posts={posts.map((post) => ({
          ...post,
          _id: post._id?.toString(),
          category: post.category ?? "General",
          tags: post.tags ?? []
        }))}
      />
    </AdminLayout>
  );
}
