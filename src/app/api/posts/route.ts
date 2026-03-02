import { NextRequest, NextResponse } from "next/server";
import { createPost, getPosts } from "@/lib/posts";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.title || !body.slug || !body.content) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const post = await createPost({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt ?? "",
    content: body.content,
    status: body.status === "published" ? "published" : "draft"
  });

  return NextResponse.json(post, { status: 201 });
}
