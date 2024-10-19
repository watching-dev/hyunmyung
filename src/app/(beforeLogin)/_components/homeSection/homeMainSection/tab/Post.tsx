import { faker } from "@faker-js/faker";
import styles from "./post.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post() {
  const data = {
    postID: 1,
    User: {
      id: "elon",
      nickname: "musk",
      image: "",
    },
    content: "어려워어려워",
    createAt: new Date(),
    Images: [] as any,
  };
  if (Math.random() > 0.5) {
    data.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  }
  return (
    <article className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>post</div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <div className={styles.postUserName}>{data.User.nickname}</div>
            &nbsp;
            <div className={styles.postUserId}>{data.User.id}</div>
            &nbsp; · &nbsp;
            <div className={styles.postDate}>
              {dayjs(data.createAt).fromNow(true)}
            </div>
          </div>
          <div>{data.content}</div>
          <div className={styles.postImageSection}>
            {data.Images && data.Images.length > 0 && (
              <img src={data.Images[0]?.link} alt="" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
