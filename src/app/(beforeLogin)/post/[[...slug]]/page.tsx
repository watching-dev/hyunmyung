import styles from "./postSlug.module.css";
import BackButton from "../../_components/homeSection/homeMainSection/tab/BackButton";
import sanitizeHtml from "../../_lib/sanitizeHTML";

// interface Props {
//   post: {
//     title: string;
//     postId: string;
//     Profile: {
//       User: {
//         userId: string;
//         userName: string;
//       };
//       description: string;
//       profileImage: string;
//     };
//     postImage: string;
//     createdAt: Date;
//     updatedAt: Date;
//   };
// }
export default async function PostSlug(props: any) {
  try {
    // props.params.slug[0](postId)가 인코딩 된 값이 MTFfY1hkbGNnPT1fMQ== 인데 특수문자 인코딩문제로 MTFfY1hkbGNnPT1fMQ%3D%3D 이렇게 변환되어 넘어옴
    // 그래서 atob() 할때 에러나서 DOMException [InvalidCharacterError]: Invalid character 뜸
    // 디코딩을 먼저 다시 하고 변환으로 해결
    const decodeURI = decodeURIComponent(props.params.slug[0]);
    const decodeSlug = decodeURIComponent(props.params.slug[1]);
    // console.log("decode:", decodeURI);
    // console.log("decode slug", decodeSlug);
    // console.log("props slug", props.params.slug); // 이렇게 해야 url 값을 가져오네
    const originPostId = atob(decodeURI); // 디코딩이 실패하면 에러남_인코딩 글자를 임의로 수정했을 경우처럼
    const slug = decodeSlug.replace(/-/gi, " "); // -를 공백으로 치환

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        process.env.NEXT_PUBLIC_BASE
      }/api/post/detail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originPostId, slug }),
        // next: { revalidate: 3 }, 리액트 쿼리로 재수정 필요
      }
    );

    const res = await response.json();

    const cleanContent = sanitizeHtml(res.content);

    return (
      <>
        <div className={styles.tabFixed}>
          <BackButton page="/" />
          <div className={styles.title}>{res.title}</div>
        </div>
        <div className={styles.postWrapper}>
          <div className={styles.postBoundary}>
            <span
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </div>
          <div className={styles.bottom}>_</div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>not found</div>;
  }
}
