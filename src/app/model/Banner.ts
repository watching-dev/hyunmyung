import { InferSchemaType, model, models, Schema } from "mongoose";

const BannerSchema = new Schema({
  bannerURL: String,
  createdAt: Date,
  updatedAt: Date,
});

type BannerType = InferSchemaType<typeof BannerSchema>;
const BannerAPIS =
  models?.BannerAPIS || model<BannerType>("BannerAPIS", BannerSchema);

export default BannerAPIS;
