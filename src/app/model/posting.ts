import { InferSchemaType, model, models, Schema } from "mongoose";

const PostingSchema = new Schema({
  postId: String,
  title: String,
  Profile: {
    User: {
      userName: {
        type: String,
      },
      user_id: Schema.Types.ObjectId,
    },
    description: String,
    profileImage: String,
  },
  postImage: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
});

type PostingType = InferSchemaType<typeof PostingSchema>;
const PostingAPIS =
  models?.PostingAPIS || model<PostingType>("PostingAPIS", PostingSchema);

export default PostingAPIS;
