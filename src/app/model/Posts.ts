import { InferSchemaType, model, models, Schema } from "mongoose";

const PostsSchema = new Schema({
  title: String,
  Profile: {
    User: {
      user_id: Schema.Types.ObjectId,
      userId: String,
      userName: String,
    },
    description: String,
    profileImage: String,
  },
  recommended: Boolean,
  postImage: String,
  createdAt: Date,
  updatedAt: Date,
});

type PostsType = InferSchemaType<typeof PostsSchema>;
const PostsAPI = models?.PostsAPI || model<PostsType>("PostsAPI", PostsSchema);

export default PostsAPI;
