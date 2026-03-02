import { NextRequest, NextResponse } from "next/server";
import { createPost, getPosts, type CreatePostInput } from "@/lib/posts";

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to fetch posts" },
      { status: 500 }
    );
  }
}

function toCreatePostInput(body: Record<string, unknown>): CreatePostInput | null {
  if (
    typeof body.title !== "string" ||
    typeof body.slug !== "string" ||
    typeof body.content !== "string"
  ) {
    return null;
  }

  return {
    title: body.title,
    slug: body.slug,
    content: body.content,
    excerpt: typeof body.excerpt === "string" ? body.excerpt : "",
    status: body.status === "published" ? "published" : "draft"
  };
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Record<string, unknown>;
  const input = toCreatePostInput(body);

  if (!input) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const post = await createPost(input);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create post" },
      { status: 500 }
    );
  }
}
