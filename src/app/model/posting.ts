import { InferSchemaType, model, models, Schema } from "mongoose";

const PostingSchema = new Schema({
  postId: String,
  title: String,
  Profile: {
    postImage: String,
    User: {
      userName: {
        type: String,
      },
      user_Id: Schema.Types.ObjectId,
    },
  },
  content: String,
  createdAt: Date,
  updatedAt: Date,
});

type PostingType = InferSchemaType<typeof PostingSchema>;
const PostingAPIS =
  models?.PostingAPIS || model<PostingType>("PostingAPIS", PostingSchema);

export default PostingAPIS;
