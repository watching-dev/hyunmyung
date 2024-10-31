import { faker } from "@faker-js/faker";
import styles from "./post.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import PostArticle from "./PostArticle";
import Link from "next/link";
import { Post as IPost } from "@/app/model/Post";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  post: IPost;
};

export default function Post({ post }: Props) {
  const data = post;
  let noImage: boolean = true;
  if (Math.random() > 0.5) {
    data.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
    noImage = Math.random() < 0.5;
  }

  return (
    <PostArticle post={data}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>post</div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <Link
              //   href={`/${data.User.nickname}`}
              href={`/profile`}
              className={styles.postUserName}
            >
              {data.User.nickname}
            </Link>
            &nbsp;
            <div className={styles.postUserId}>{data.User.id}</div>
            &nbsp; · &nbsp;
            <div className={styles.postDate}>
              {dayjs(data.createdAt).fromNow(true)}
            </div>
          </div>
          {/* <div>{data.content}</div> */}
          <div>
            {noImage ? (
              <div>{data.content}</div>
            ) : (
              <div className={styles.afterImageSection}>
                {data.Images && data.Images.length > 0 && (
                  <>
                    <div className={styles.afterImageSectionCover} />
                    <span>{data.content}</span>
                    <img src={data.Images[0]?.link} alt="" />
                  </>
                )}
              </div>
            )}
          </div>
          {/*    <div className={styles.postImageSection}>
             {data.Images && data.Images.length > 0 && (
               <img src={data.Images[0]?.link} alt="" />
             )}
           </div> */}
        </div>
      </div>
    </PostArticle>
  );
}
