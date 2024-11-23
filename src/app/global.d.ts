import type { MongoClient } from "mongodb";
import { Mongoose } from "mongoose";

// 아래 변수는 let, const 안됨, var만 가능해서 lint rules 끔
declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>;
  }

  var mongoose: {
    promise: Promise<Mongoose> | null;
    connection: Mongoose | null;
  };
}
