import { faker } from "@faker-js/faker";
import styles from "./post.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import PostArticle from "./PostArticle";
import Link from "next/link";
import { Post as IPost } from "@/app/model/Post";
import Image from "next/image";
import { IList } from "@/app/api/posts/route";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  // post: IPost;
  post: IList;
};

export default function Post({ post }: Props) {
  const data = post;
  console.log("posttt", data);
  console.log("created", data.createdAt);
  console.log("dayjs", dayjs(Date.now()).from(data.createdAt));
  console.log("dayjs now", dayjs(data.createdAt).fromNow(true));
  console.log(
    "diff",
    dayjs(dayjs(data.createdAt).subtract(9, "hour").format()).fromNow(true)
  );
  const time = dayjs(
    dayjs(data.createdAt).subtract(9, "hour").format()
  ).fromNow(true);

  const noImage: boolean =
    data.postImage === "" || data.postImage === undefined ? true : false;
  // if (Math.random() > 0.5) {
  //   data.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  //   noImage = Math.random() < 0.5;
  // }

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
              {data.Profile.User.userName}
            </Link>
            &nbsp; &nbsp;
            <div className={styles.postUserId}>{data.Profile.description}</div>
            &nbsp; · &nbsp;
            <div className={styles.postDate}>{time}</div>
          </div>
          {/* <div>{data.content}</div> */}
          <div className={styles.titleImage}>
            {noImage ? (
              <div>{data.title}</div>
            ) : (
              <div className={styles.afterImageSection}>
                {data.postImage && data.postImage.length > 0 && (
                  <>
                    <div className={styles.afterImageSectionCover} />
                    <span>{data.title}</span>
                    <Image
                      src={data.postImage}
                      width={600}
                      height={400}
                      alt={data.title}
                    />
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
