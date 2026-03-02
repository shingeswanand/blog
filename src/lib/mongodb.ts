import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
<<<<<<< HEAD

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
=======
export const hasMongoConfig = Boolean(uri);

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

<<<<<<< HEAD
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
=======
export function getMongoClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}
>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
