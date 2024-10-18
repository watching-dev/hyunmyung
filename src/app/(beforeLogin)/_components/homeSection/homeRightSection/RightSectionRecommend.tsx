import RecommendPost from "./RecommendPost";
import styles from "./rightSectionRecommend.module.css";

export default function RightSectionRecommend() {
  return (
    <div className={styles.postRecommend}>
      <h3>추천 매거진</h3>
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
      <RecommendPost />
    </div>
  );
}
