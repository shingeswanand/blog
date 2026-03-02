import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export type BlogPost = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  createdAt?: Date;
};

type BlogPostDocument = Omit<BlogPost, "_id"> & {
  _id: ObjectId;
};

const DB_NAME = process.env.MONGODB_DB ?? "blog_cms";
const COLLECTION = "posts";

export async function getPosts() {
  const client = await clientPromise;
  return client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

export async function createPost(post: Omit<BlogPost, "_id" | "createdAt">) {
  const client = await clientPromise;
  const result = await client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .insertOne({ ...post, createdAt: new Date() });

  return { ...post, _id: result.insertedId.toString() };
}

export async function deletePost(id: string) {
  const client = await clientPromise;
  await client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
}
