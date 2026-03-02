import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

function renderSimpleMarkdown(content: string) {
  return content
    .replace(/^###\s(.+)$/gm, "<h3>$1</h3>")
    .replace(/^##\s(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#\s(.+)$/gm, "<h1>$1</h1>")
    .replace(/^>\s(.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^-\s(.+)$/gm, "<li>$1</li>");
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const html = `<p>${renderSimpleMarkdown(post.content)}</p>`;

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-8">
      <article className="card p-8">
        <p className="text-xs uppercase tracking-wider text-slate-500">{post.category}</p>
        <h1 className="mt-2 text-3xl font-semibold">{post.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-xs">#{tag}</span>
          ))}
        </div>
        <div className="prose prose-slate mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}
