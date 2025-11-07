import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var _mongooseGlobal: { conn?: typeof mongoose | null; promise?: Promise<typeof mongoose> | null };
}

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please set MONGODB_URI in your .env.local file");
}

if (!globalThis._mongooseGlobal) {
  globalThis._mongooseGlobal = { conn: null, promise: null };
}

async function dbConnect() {
  if (globalThis._mongooseGlobal.conn) return globalThis._mongooseGlobal.conn;
  if (!globalThis._mongooseGlobal.promise) {
    globalThis._mongooseGlobal.promise = mongoose
      .connect(MONGODB_URI)
      .then((m) => {
        console.log("[mongodb] connected");
        return m;
      })
      .catch((err) => {
        console.error("[mongodb] connection error:", err.message);
        throw err;
      });
  }
  globalThis._mongooseGlobal.conn = await globalThis._mongooseGlobal.promise;
  return globalThis._mongooseGlobal.conn;
}

export default dbConnect;
