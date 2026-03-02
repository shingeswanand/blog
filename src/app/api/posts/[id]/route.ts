import { NextResponse } from "next/server";
import { hasMongoConfig } from "@/lib/mongodb";
import { deletePost } from "@/lib/posts";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!hasMongoConfig) {
    return NextResponse.json({ message: "MongoDB is not configured" }, { status: 500 });
  }

  await deletePost(params.id);
  return NextResponse.json({ success: true });
}
