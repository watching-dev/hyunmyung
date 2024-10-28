"use client";

import { ReactNode } from "react";
import RightSectionMain from "../../page";
import styles from "./homeRightSection.module.css";
import RightSectionRecommend from "./homeRightSection/RightSectionRecommend";
import RightSectionSearch from "./homeRightSection/RightSectionSearch";
import { usePathname } from "next/navigation";

export default function HomeRightSection({
  children,
}: {
  children: ReactNode;
}) {
  const pathName = usePathname();

  return (
    <div className={styles.rightSectionWrapper}>
      <div className={styles.rightSectionInner}>
        <div className={styles.mainSection}>{children}</div>
        <div className={styles.rightSection}>
          {pathName === "/profile" ? null : (
            <>
              <RightSectionSearch />
              <RightSectionRecommend />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
