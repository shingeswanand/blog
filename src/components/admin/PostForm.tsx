"use client";

import { useState } from "react";

type Props = {
  onSuccess: () => void;
};

const initialForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "draft"
};

export function PostForm({ onSuccess }: Props) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
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
      <textarea
        className="input"
        rows={2}
        placeholder="Excerpt"
        value={form.excerpt}
        onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
      />
      <textarea
        required
        className="input"
        rows={6}
        placeholder="Content"
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
