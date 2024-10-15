import styles from "./homeRightSection.module.css";
import RightSectionSearch from "./homeRightSection/RightSectionSearch";

export default function HomeRightSection() {
  return (
    <div className={styles.rightSectionWrapper}>
      <div className={styles.rightSectionInner}>
        <div className={styles.mainSection}></div>
        <div className={styles.rightSection}>
          <RightSectionSearch />
        </div>
      </div>
    </div>
  );
}
