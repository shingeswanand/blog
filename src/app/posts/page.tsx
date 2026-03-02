import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export default async function PostsPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl p-8">
      <h1 className="text-3xl font-semibold">All Posts</h1>
      <p className="mt-2 text-slate-600">Browse all published posts by category and tags.</p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="card p-5">
            <div className="mb-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-slate-100 px-2 py-1">{post.category}</span>
              {post.tags.map((tag) => <span key={tag} className="rounded bg-slate-100 px-2 py-1">#{tag}</span>)}
            </div>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-slate-600">{post.excerpt || post.content.slice(0, 160)}...</p>
            <Link href={`/posts/${post.slug}`} className="mt-3 inline-block text-primary">Read post →</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
