import { useQuery } from "@tanstack/react-query";
import RecommendPost from "./RecommendPost";
import styles from "./rightSectionRecommend.module.css";
import { getRecommend } from "./_lib/getRecommend";

export default function RightSectionRecommend() {
  const { data } = useQuery<[/* 타입 */]>({
    queryKey: ["recommend"],
    queryFn: getRecommend,
    staleTime: 60 * 1000,
  });
  console.log("rQ", data?.length); // length를 사용항려면 useQuery옆에 타입 <[]> 이렇게 지정해줘야 length 사용 가능, 그리고 data 뿌려주는 타입을 넣어야 지 <[타입]>
  // Math.floor(Math.random() * data?.length - 1);
  const sliceData = data?.slice(0, Math.floor(Math.random() * 10)); // 이번달 작성 글 모두 뿌리려고 했더니 너무 길어서 1~10개 랜덤으로 뿌리기
  console.log("slice", sliceData);
  return (
    <div className={styles.postRecommend}>
      <h3>이달의 매거진</h3>
      {sliceData?.map((post) => (
        <RecommendPost key={post.postId} /> // useQuery에 타입 지정 안되어 있으니까 'never' 형식에 'postId' 속성 없다고 나오네
      ))}
    </div>
  );
}
