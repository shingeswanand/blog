import { NextResponse } from "next/server";
import { deletePost } from "@/lib/posts";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = await deletePost(params.id);

  if (!deleted) {
    return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
