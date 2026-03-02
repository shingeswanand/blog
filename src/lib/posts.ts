import { ObjectId } from "mongodb";
import { getMongoClient, hasMongoConfig } from "@/lib/mongodb";

export type PostStatus = "draft" | "published";

export type BlogPost = {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: PostStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreatePostInput = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  tags?: string[];
  status: PostStatus;
};

const DB_NAME = process.env.MONGODB_DB ?? "blog_cms";
const COLLECTION = "posts";

function postsCollection(client: Awaited<ReturnType<typeof getMongoClient>>) {
  return client.db(DB_NAME).collection<BlogPost>(COLLECTION);
}

export async function getPosts() {
  if (!hasMongoConfig) return [] as BlogPost[];

  const client = await getMongoClient();
  return postsCollection(client).find({}).sort({ createdAt: -1 }).toArray();
}

export async function getPublishedPosts() {
  if (!hasMongoConfig) return [] as BlogPost[];

  const client = await getMongoClient();
  return postsCollection(client).find({ status: "published" }).sort({ createdAt: -1 }).toArray();
}

export async function getPostBySlug(slug: string) {
  if (!hasMongoConfig) return null;

  const client = await getMongoClient();
  return postsCollection(client).findOne({ slug, status: "published" });
}

export async function createPost(input: CreatePostInput) {
  if (!hasMongoConfig) {
    throw new Error("Missing MongoDB configuration");
  }

  const now = new Date();
  const post: BlogPost = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt?.trim() || "",
    content: input.content,
    category: input.category?.trim() || "General",
    tags: (input.tags ?? []).map((tag) => tag.trim()).filter(Boolean),
    status: input.status,
    createdAt: now,
    updatedAt: now
  };

  const client = await getMongoClient();
  const result = await postsCollection(client).insertOne(post);

  return { ...post, _id: result.insertedId };
}

export async function deletePost(id: string) {
  if (!hasMongoConfig) {
    throw new Error("Missing MongoDB configuration");
  }

  const client = await getMongoClient();
  await postsCollection(client).deleteOne({ _id: new ObjectId(id) });
}
