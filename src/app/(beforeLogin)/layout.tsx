import { ReactNode } from "react";
import HomeLeftSection from "./_components/homeSection/HomeLeftSection";

import styles from "./layout.module.css";
import HomeRightSection from "./_components/homeSection/HomeRightSection";

export default function BeforeLoginLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {/* <div>before login layout</div> */}
      <div className={styles.container}>
        <HomeLeftSection />
        <HomeRightSection>
          {children}
          {modal}
        </HomeRightSection>
      </div>
    </>
  );
}
