import mongoose from "mongoose";

const DB_URI = process.env.HMDB_URL || "";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

/**
 * mongoose를 통해 MongoDB와 연결합니다.
 * @returns Mongoose
 */
async function dbConnect() {
  // 이미 연결된 db가 있으면 그 연결을 반환합니다.
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    cached.promise = mongoose
      .set({ debug: true, strictQuery: false })
      .connect(`${DB_URI}`)
      .then((mongoose) => mongoose);
  }

  cached.connection = await cached.promise;
  return cached.connection;
}

export default dbConnect;
