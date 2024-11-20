import { useQuery } from "@tanstack/react-query";
import RecommendPost from "./RecommendPost";
import styles from "./rightSectionRecommend.module.css";
import { getRecommend } from "./_lib/getRecommend";
import { IList } from "@/app/api/posts/route";

export default function RightSectionRecommend() {
  const { data } = useQuery<IList[]>({
    queryKey: ["monthly", "recommend"],
    queryFn: getRecommend,
    staleTime: 1000 * 60 * 60 * 24 * 1,
    gcTime: 1000 * 10 * 60 * 60 * 24 * 1,
  });
  console.log("rQ", data?.length); // length를 사용항려면 useQuery옆에 타입 <[]> 이렇게 지정해줘야 length 사용 가능, 그리고 data 뿌려주는 타입을 넣어야 지 <[타입]>
  // Math.floor(Math.random() * data?.length - 1);
  const sliceData = data?.slice(0, Math.floor(Math.random() * 10)); // 이번달 작성 글 모두 뿌리려고 했더니 너무 길어서 1~10개 랜덤으로 뿌리기
  console.log("slice", sliceData);
  console.log("recommend data:", data);
  const slice = data?.filter(
    (post) =>
      post.postImage !== "" &&
      post.postImage !== null &&
      post.postImage !== undefined
  );
  // const slice = data?.filter((post) => { 아니 왜 이렇게 하면 Expected an assignment or function call and instead saw an expression.eslint@typescript-eslint/no-unused-expressions 이렇게 나오냐 ==> 왜 중괄호 {} 이거 했다고 그러지 뭔가 표현이 다른가?
  //   post.postImage !== "" ||
  //     post.postImage !== null || --> 그리고 왜 또는 || 으로 하면 왜 안되는거야..
  //     post.postImage !== undefined;
  // });

  console.log("----", slice);
  return (
    <div className={styles.postRecommend}>
      <h3>이달의 매거진</h3>
      <nav>
        <ul>
          {data // 최신 데이터 중에
            ?.filter(
              // 무조건 썸네일 이미지가 있어야하고
              (post) =>
                post.postImage !== "" &&
                post.postImage !== null &&
                post.postImage !== undefined
            )
            .slice(0, 5) // 최신 5개만 가져와서
            .reverse() // 오래된 순으로 보여줌
            .map((post) => (
              <RecommendPost key={post.postId} data={post} /> // useQuery에 타입 지정 안되어 있으니까 'never' 형식에 'postId' 속성 없다고 나오네
            ))}
        </ul>
      </nav>
    </div>
  );
}
