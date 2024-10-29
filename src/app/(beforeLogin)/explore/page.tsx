import RightSectionSearch from "../_components/homeSection/homeRightSection/RightSectionSearch";

import styles from "./explore.module.css";

export default function Explore() {
  return (
    <>
      <div className={styles.tabFixed}>
        <div className={styles.title}>탐색 하기</div>
        <div className={styles.searchBack}>
          <RightSectionSearch />
        </div>
      </div>
    </>
  );
}
