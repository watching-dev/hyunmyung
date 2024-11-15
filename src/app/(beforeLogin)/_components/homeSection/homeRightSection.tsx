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
  console.log("rightSection: ", `/post/${pathNames[1]}`);
  // 특수문자로 생기는 문제 -> 디코딩해서 정상 URL로 변환
  const decodePathName = decodeURIComponent(pathNames[1]);
  console.log("decode:", decodePathName);

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

  // ${pathNames[0]으로 한번에 해도 되지 않을까 그럼 /post 안해도 되잖아}
  if (pathName === `/post/${decodePathName}`) {
    return (
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionPost}>
          <div className={styles.mainSectionPost}>{children}</div>
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
