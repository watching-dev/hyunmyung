import { MongoClient } from "mongodb";

const url = process.env.HMDB_URL as string;
const options: any = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

if (!url) {
  throw new Error("환경 변수가 설정되지 않았습니다.");
}

// lint rules에서 no-var를 적용하고 global.d.ts에서 var를 let or const로 바꾸면 아래 _mongo를 찾을수 없다고 나옴
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
