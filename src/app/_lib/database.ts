import { MongoClient } from "mongodb";

const url = process.env.HMDB_URL as string;
const options: any = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

if (!url) {
  throw new Error("환경 변수가 설정되지 않았습니다.");
}

if (process.env.NODE_ENV === "development") {
  // 개발 중 재실행을 막음
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
