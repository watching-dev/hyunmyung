"use client";

import { ReactNode } from "react";
import RightSectionMain from "../../page";
import styles from "./homeRightSection.module.css";
import RightSectionRecommend from "./homeRightSection/RightSectionRecommend";
import RightSectionSearch from "./homeRightSection/RightSectionSearch";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import HomeRightSectionProfileImage from "../profileSection/HomeRightSectionProfileImage";

export default function HomeRightSection({
  children,
}: {
  children: ReactNode;
}) {
  const pathName = usePathname();
  const pathNames = useSelectedLayoutSegments();
  console.log("right", pathName);
  console.log("rights", pathNames);

  if (pathName === "/profile") {
    return (
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          <div className={styles.mainSection}>{children}</div>
          <div className={styles.rightSection}>
            <RightSectionSearch />
            {/* <HomeRightSectionProfileImage /> */}
          </div>
        </div>
      </div>
    );
  }

  if (pathName === "/explore" || pathName === "/search") {
    return (
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          <div className={styles.mainSection}>{children}</div>
          <div className={styles.rightSection}>
            <RightSectionRecommend />
          </div>
        </div>
      </div>
    );
  }

  if (pathName === `/post/${pathNames[1]}`) {
    return (
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          <div className={styles.mainSection}>{children}</div>
        </div>
      </div>
    );
  }

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
