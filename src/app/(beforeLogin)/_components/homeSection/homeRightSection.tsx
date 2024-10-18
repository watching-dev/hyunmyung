import RightSectionMain from "./homeMainSection/RightSectionMain";
import styles from "./homeRightSection.module.css";
import RightSectionRecommend from "./homeRightSection/RightSectionRecommend";
import RightSectionSearch from "./homeRightSection/RightSectionSearch";

export default function HomeRightSection() {
  return (
    <div className={styles.rightSectionWrapper}>
      <div className={styles.rightSectionInner}>
        <div className={styles.mainSection}>
          <RightSectionMain />
        </div>
        <div className={styles.rightSection}>
          <RightSectionSearch />
          <RightSectionRecommend />
        </div>
      </div>
    </div>
  );
}
