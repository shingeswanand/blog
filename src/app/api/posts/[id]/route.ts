import { NextResponse } from "next/server";
import { deletePost } from "@/lib/posts";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
<<<<<<< HEAD
  await deletePost(params.id);
  return NextResponse.json({ success: true });
=======
  try {
    const deleted = await deletePost(params.id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to delete post" },
      { status: 500 }
    );
  }
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
}
