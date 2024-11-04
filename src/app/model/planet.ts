import { InferSchemaType, model, models, Schema } from "mongoose";

const PlanetSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
  },
  orderFromSun: Number,
  hasRings: Boolean,
  mainAtmosphere: Array,
  surfaceTemperatureC: {
    min: Number,
    max: Number,
    mean: Number,
  },
});

// const IntroductionPostsSchema = new Schema(
//   {
//     introductionPostId: {
//       type: Number,
//       required: true,
//       unique: true,
//     },
//     author: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       maxlength: 50,
//     },
//     thumbnail: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     summary: {
//       type: String,
//       maxlength: 100,
//     },
//     category: {
//       type: String,
//       enum: ["character", "goods"],
//       required: true,
//     },
//     tags: {
//       type: Array<String>,
//     },
//     views: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

type PlanetType = InferSchemaType<typeof PlanetSchema>;
// export default mongoose.models.Planets ||
//   mongoose.model("Planets", PlanetSchema);

// export type { PlanetType };

// models에서 IntroductionPost가 이미 있는지 확인합니다.
// 확인 후 생성되지 않았다면, model을 통해 IntroductionPost 모델을 생성합니다.
const Planet = models?.Planet || model<PlanetType>("Planet", PlanetSchema);

export default Planet;

// export type TypeIntroductionPost = {
//   _id: String;
//   introductionPostId: String;
//   author: {
//     _id: String;
//     name: String;
//     profileImage: String;
//   };
//   title: String;
//   thumbnail: String;
//   content: String;
//   summary: String;
//   category: String;
//   tags: String[];
//   views: Number;
//   createdAt: String;
// };
