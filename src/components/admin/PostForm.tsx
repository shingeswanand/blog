"use client";

import { useState } from "react";

type Props = {
  onSuccess: () => void;
};

const initialForm = {
  title: "",
  slug: "",
  excerpt: "",
  category: "General",
  tags: "",
  content: "",
  status: "draft" as "draft" | "published"
};

export function PostForm({ onSuccess }: Props) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  function appendMarkdown(snippet: string) {
    setForm((prev) => ({ ...prev, content: prev.content ? `${prev.content}\n${snippet}` : snippet }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      })
    });

    setLoading(false);
    setForm(initialForm);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-4">
      <h2 className="text-lg font-semibold">Add New Post</h2>
      <input
        required
        className="input"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
      />
      <input
        required
        className="input"
        placeholder="Slug"
        value={form.slug}
        onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="input"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
        />
      </div>
      <textarea
        className="input"
        rows={2}
        placeholder="Excerpt"
        value={form.excerpt}
        onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
      />
      <div className="rounded border border-adminBorder p-2">
        <p className="mb-2 text-xs text-slate-500">Quick editor tools</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="button-secondary" onClick={() => appendMarkdown("## Heading")}>H2</button>
          <button type="button" className="button-secondary" onClick={() => appendMarkdown("**Bold text**")}>Bold</button>
          <button type="button" className="button-secondary" onClick={() => appendMarkdown("- List item")}>List</button>
          <button type="button" className="button-secondary" onClick={() => appendMarkdown("> Quote")}>Quote</button>
        </div>
      </div>
      <textarea
        required
        className="input font-mono"
        rows={8}
        placeholder="Content (Markdown supported)"
        value={form.content}
        onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
      />
      <select
        className="input"
        value={form.status}
        onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as "draft" | "published" }))}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <button className="button-primary" disabled={loading}>
        {loading ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
}
