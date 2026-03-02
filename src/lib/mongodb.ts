import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export const hasMongoConfig = Boolean(uri);

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoClient() {
  if (!hasMongoConfig) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri!).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri!).connect();
  }

  return clientPromise;
}
