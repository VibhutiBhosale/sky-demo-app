import mongoose, { Mongoose } from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please set the MONGODB_URI environment variable.");
}

// Define a global cache type to prevent duplicate connections
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend global type to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    //use non-null assertion (!) to tell TS “uri is definitely defined”
    cached.promise = mongoose
      .connect(uri!, {
        dbName: "sky-demo",
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

