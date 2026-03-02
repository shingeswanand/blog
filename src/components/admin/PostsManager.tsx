"use client";

import { useRouter } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { PostsTable } from "@/components/admin/PostsTable";

type Row = {
  _id?: string;
  title: string;
  slug: string;
  status: string;
  createdAt?: Date;
};

export function PostsManager({ posts }: { posts: Row[] }) {
  const router = useRouter();

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <PostForm onSuccess={() => router.refresh()} />
      <PostsTable posts={posts} />
    </div>
  );
}
