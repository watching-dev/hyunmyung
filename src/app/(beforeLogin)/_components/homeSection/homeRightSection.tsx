import { ReactNode } from "react";
import RightSectionMain from "../../page";
import styles from "./homeRightSection.module.css";
import RightSectionRecommend from "./homeRightSection/RightSectionRecommend";
import RightSectionSearch from "./homeRightSection/RightSectionSearch";

export default function HomeRightSection({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.rightSectionWrapper}>
      <div className={styles.rightSectionInner}>
        <div className={styles.mainSection}>{children}</div>
        <div className={styles.rightSection}>
          <RightSectionSearch />
          <RightSectionRecommend />
        </div>
      </div>
    </div>
  );
}
