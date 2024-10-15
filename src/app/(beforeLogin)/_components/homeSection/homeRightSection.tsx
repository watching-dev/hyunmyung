import styles from "./homeRightSection.module.css";

export default function HomeRightSection() {
  return (
    <div className={styles.rightSectionWrapper}>
      <div className={styles.rightSectionInner}>
        <div className={styles.mainSection}></div>
        <div className={styles.rightSection}></div>
      </div>
    </div>
  );
}
