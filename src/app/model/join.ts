import { InferSchemaType, model, models, Schema } from "mongoose";
import Default from "../(beforeLogin)/@modal/default";

const JoinSchema = new Schema({
  // _id: Schema.Types.ObjectId, - 이거 하니까 updatedAt, _id 생성이 안되네
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userPw: { type: String, required: [true, "비밀번호를 입력하세요"] },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date },
  //updatedAt: { type: Date }, // 업데이트 이력을 남기려면 새로운 컬렉션에다가 해야하네_unique 때문에
});

type JoinType = InferSchemaType<typeof JoinSchema>;
const JoinAPIS = models?.JoinAPIS || model<JoinType>("JoinAPIS", JoinSchema); // model<JoinType>"JoinAPIS"에서 JoinAPIS 로 설정하면 JoinAPIS 이름으로 몽고 디비 컬렉션이름으로 생성됨

export default JoinAPIS;
