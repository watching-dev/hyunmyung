import { InferSchemaType, model, models, Schema } from "mongoose";

const PostingSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: false,
  },
  email: String,
  content: String,
});

type PostingType = InferSchemaType<typeof PostingSchema>;
const PostingAPIS =
  models?.PostingAPIS || model<PostingType>("PostingAPIS", PostingSchema);

export default PostingAPIS;
