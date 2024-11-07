import { InferSchemaType, model, models, Schema } from "mongoose";
import Default from "../(beforeLogin)/@modal/default";

const JoinSchema = new Schema({
  //   _id: Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userPw: { type: String, required: [true, "비밀번호를 입력하세요"] },
  name: String,
  createdAt: { type: Date, Default: Date.now() },
});

type JoinType = InferSchemaType<typeof JoinSchema>;
const JoinAPIS = models?.JoinAPIS || model<JoinType>("JoinAPIS", JoinSchema); // model<JoinType>"JoinAPIS"에서 JoinAPIS 로 설정하면 JoinAPIS 이름으로 몽고 디비 컬렉션이름으로 생성됨

export default JoinAPIS;
