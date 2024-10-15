import styles from "./homeLeftSection.module.css";

export default function HomeLeftSection() {
  return (
    <div className={styles.leftSectionWrapper}>
      <div className={styles.leftSection}>
        <div className={styles.fixed}>
          <div className={styles.logo}>로고</div>
          <nav>
            <ul>
              <li>홈</li>
              <li>프로필</li>
              <li>탐색하기</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
