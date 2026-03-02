import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getPublishedPosts();
  const featured = posts[0];

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl p-8">
      <header className="mb-10 rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">WordPress-style CMS</p>
        <h1 className="mt-3 text-4xl font-semibold">Modern Blog Frontend</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Manage content in the admin panel with categories, tags, and markdown-style editing tools.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/admin" className="button-primary">Open Admin</Link>
          <Link href="/posts" className="button-secondary">Browse All Posts</Link>
        </div>
      </header>

      {featured ? (
        <section className="card mb-8 p-6">
          <p className="text-xs uppercase tracking-wide text-slate-500">Featured</p>
          <h2 className="mt-2 text-2xl font-semibold">{featured.title}</h2>
          <p className="mt-2 text-slate-600">{featured.excerpt || featured.content.slice(0, 120)}...</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded bg-slate-100 px-2 py-1 text-xs">{featured.category}</span>
            {featured.tags.map((tag) => (
              <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-xs">#{tag}</span>
            ))}
          </div>
          <Link className="mt-4 inline-block text-primary" href={`/posts/${featured.slug}`}>Read article →</Link>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        {posts.slice(1, 7).map((post) => (
          <article key={post.slug} className="card p-5">
            <p className="text-xs text-slate-500">{post.category}</p>
            <h3 className="mt-1 text-xl font-semibold">{post.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{post.excerpt || post.content.slice(0, 110)}...</p>
            <Link href={`/posts/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-primary">Read more</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
