import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostsManager } from "@/components/admin/PostsManager";
import { getPosts } from "@/lib/posts";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <AdminLayout title="Posts">
      <PostsManager
        posts={posts.map((post) => ({
          ...post,
          _id: post._id?.toString()
        }))}
      />
    </AdminLayout>
  );
}
