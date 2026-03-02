import { ObjectId } from "mongodb";
import { getMongoClient, hasMongoConfig } from "@/lib/mongodb";

export type BlogPost = {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  createdAt?: Date;
};

const DB_NAME = process.env.MONGODB_DB ?? "blog_cms";
const COLLECTION = "posts";

export async function getPosts() {
  if (!hasMongoConfig) {
    return [] as BlogPost[];
  }

  const client = await getMongoClient();
  return client
    .db(DB_NAME)
    .collection<BlogPost>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

export async function createPost(post: BlogPost) {
  if (!hasMongoConfig) {
    throw new Error("Missing MongoDB configuration");
  }

  const client = await getMongoClient();
  const result = await client
    .db(DB_NAME)
    .collection<BlogPost>(COLLECTION)
    .insertOne({ ...post, createdAt: new Date() });

  return { ...post, _id: result.insertedId };
}

export async function deletePost(id: string) {
  if (!hasMongoConfig) {
    throw new Error("Missing MongoDB configuration");
  }

  const client = await getMongoClient();
  await client
    .db(DB_NAME)
    .collection<BlogPost>(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
}
