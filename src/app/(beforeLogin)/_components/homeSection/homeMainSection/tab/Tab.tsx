"use client";

import { useContext } from "react";
import styles from "./tab.module.css";
import { TabContext } from "./TabProvider";

export default function Tab() {
  const { tab, setTab } = useContext(TabContext);

  const onClickAll = () => {
    setTab("all");
  };

  const onClickRec = () => {
    setTab("rec");
  };

  return (
    <div className={styles.tabFixed}>
      <div className={styles.title}>매거진</div>
      <div className={styles.tab}>
        <div onClick={onClickAll}>
          전체
          <div className={styles.tabIndicator} hidden={tab === "rec"}></div>
        </div>
        <div onClick={onClickRec}>
          추천
          <div className={styles.tabIndicator} hidden={tab === "all"}></div>
        </div>
      </div>
    </div>
  );
}
