import { faker } from "@faker-js/faker";
import styles from "./post.module.css";

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
            <div className={styles.postUserName}>userName</div>
            &nbsp;
            <div className={styles.postUserId}>userId</div>
            &nbsp; · &nbsp;
            <div className={styles.postDate}>date</div>
          </div>
          <div>content</div>
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
