import { NextResponse } from "next/server";
import { deletePost } from "@/lib/posts";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await deletePost(params.id);
  return NextResponse.json({ success: true });
}
