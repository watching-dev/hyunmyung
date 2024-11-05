import { InferSchemaType, model, models, Schema } from "mongoose";

const PostSchema = new Schema({
  _id: Schema.Types.ObjectId,
  postId: Number,
  User: {
    id: String,
    nickName: String,
    image: String,
  },
  content: String,
  createdAt: Date,
  Images: Array,
});

type PostType = InferSchemaType<typeof PostSchema>;
const PostAPI = models?.PostAPI || model<PostType>("PostAPI", PostSchema);

export default PostAPI;
