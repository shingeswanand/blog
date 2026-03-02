import { ObjectId } from "mongodb";
<<<<<<< HEAD
import clientPromise from "@/lib/mongodb";
=======
import { getMongoClientPromise, hasMongoConfig } from "@/lib/mongodb";
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec

export type BlogPost = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  createdAt?: Date;
};

<<<<<<< HEAD
const DB_NAME = process.env.MONGODB_DB ?? "blog_cms";
const COLLECTION = "posts";

export async function getPosts() {
  const client = await clientPromise;
  return client
    .db(DB_NAME)
    .collection<BlogPost>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

export async function createPost(post: BlogPost) {
  const client = await clientPromise;
  const result = await client
    .db(DB_NAME)
    .collection<BlogPost>(COLLECTION)
    .insertOne({ ...post, createdAt: new Date() });

  return { ...post, _id: result.insertedId.toString() };
}

export async function deletePost(id: string) {
  const client = await clientPromise;
  await client
    .db(DB_NAME)
    .collection<BlogPost>(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
=======
export type CreatePostInput = Omit<BlogPost, "_id" | "createdAt">;

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
  if (!hasMongoConfig) {
    return [];
  }

  const client = await getMongoClientPromise();
  const docs = await client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(mapDocumentToPost);
}

export async function createPost(post: CreatePostInput): Promise<BlogPost> {
  const client = await getMongoClientPromise();
  const createdAt = new Date();
  const result = await client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .insertOne({ ...post, createdAt });

  return { ...post, createdAt, _id: result.insertedId.toString() };
}

export async function deletePost(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  const client = await getMongoClientPromise();
  const result = await client
    .db(DB_NAME)
    .collection<BlogPostDocument>(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount > 0;
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
}
