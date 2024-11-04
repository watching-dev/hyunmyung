import type { MongoClient } from "mongodb";
import { Mongoose } from "mongoose";

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>;
  }

  var mongoose: {
    promise: Promise<Mongoose> | null;
    connection: Mongoose | null;
  };
}
