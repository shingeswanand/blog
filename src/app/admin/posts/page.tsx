import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostsManager } from "@/components/admin/PostsManager";
<<<<<<< HEAD
=======
import { hasMongoConfig } from "@/lib/mongodb";
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
import { getPosts } from "@/lib/posts";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <AdminLayout title="Posts">
<<<<<<< HEAD
      <PostsManager
        posts={posts.map((post) => ({
          ...post,
          _id: post._id?.toString()
        }))}
      />
=======
      {!hasMongoConfig ? (
        <div className="mb-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          MongoDB is not configured. Add <code>MONGODB_URI</code> in <code>.env.local</code>.
        </div>
      ) : null}
      <PostsManager posts={posts} />
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
    </AdminLayout>
  );
}
