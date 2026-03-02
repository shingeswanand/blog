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

function mapDocumentToPost(doc: BlogPostDocument): BlogPost {
  return {
    ...doc,
    _id: doc._id.toString()
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  const client = await clientPromise;
  const docs = await client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(mapDocumentToPost);
}

export async function createPost(post: Omit<BlogPost, "_id" | "createdAt">): Promise<BlogPost> {
  const client = await clientPromise;
  const result = await client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .insertOne({ ...post, createdAt: new Date() });

  return { ...post, _id: result.insertedId.toString() };
}

export async function deletePost(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  const client = await clientPromise;
  const result = await client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount > 0;
}
