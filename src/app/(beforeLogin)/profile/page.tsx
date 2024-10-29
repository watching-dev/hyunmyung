import HomeLeftSection from "../_components/homeSection/HomeLeftSection";

import styles from "./profile.module.css";

export default function Profile() {
  return (
    <>
      <div className={styles.tabFixed}>
        <div className={styles.title}>프로필</div>
      </div>
      <div className={styles.backgroundImage}>background image</div>
      <div className={styles.profileBackground}>
        <div className={styles.profileImage}></div>
      </div>
      <div className={styles.name}>HyunMyung</div>
      <div className={styles.description}>
        지금까지 알게된 모든 것을 공유합니다.
      </div>
    </>
  );
}
