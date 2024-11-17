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
        <div className={styles.postUserSection}>
          {data.Profile.profileImage === null ||
          data.Profile.profileImage === undefined ? (
            <div className={styles.postUserImage}>
              <svg
                width={26}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
              >
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            </div>
          ) : (
            <Image
              className={styles.postUserImage}
              src={data.Profile.profileImage}
              alt="profile image"
              width={500}
              height={500}
            />
          )}
        </div>
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
            <div className={styles.dot}>&nbsp; · &nbsp;</div>
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
