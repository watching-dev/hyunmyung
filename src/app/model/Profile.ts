import { InferSchemaType, model, models, Schema } from "mongoose";

const ProfileSchema = new Schema({
  //   _id: Schema.Types.ObjectId,- 이거 하니까 updatedAt, _id 생성이 안되네
  User: {
    user_id: Schema.Types.ObjectId,
    userId: String,
    userName: String,
  },
  description: String,
  profileImage: String,
  backgroundImage: String,
  createdAt: Date,
  updatedAt: Date,
});

type ProfileType = InferSchemaType<typeof ProfileSchema>;
const ProfileAPIS =
  models?.ProfileAPIS || model<ProfileType>("ProfileAPIS", ProfileSchema);

export default ProfileAPIS;
