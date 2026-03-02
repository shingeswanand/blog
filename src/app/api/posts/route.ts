import { NextRequest, NextResponse } from "next/server";
import { hasMongoConfig } from "@/lib/mongodb";
import { createPost, getPosts, type CreatePostInput } from "@/lib/posts";

export async function GET() {
  if (!hasMongoConfig) {
    return NextResponse.json({ message: "MongoDB is not configured" }, { status: 500 });
  }

  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!hasMongoConfig) {
    return NextResponse.json({ message: "MongoDB is not configured" }, { status: 500 });
  }

  const body = await req.json();

  if (!body.title || !body.slug || !body.content) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const postInput: CreatePostInput = {
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt ?? "",
    content: body.content,
    category: body.category ?? "General",
    tags: Array.isArray(body.tags) ? body.tags : [],
    status: body.status === "published" ? "published" : "draft"
  };

  const post = await createPost(postInput);
  return NextResponse.json(post, { status: 201 });
}
