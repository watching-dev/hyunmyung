"use client";

import { useState } from "react";
import styles from "./tab.module.css";

export default function Tab() {
  const [tab, setTab] = useState("rec");

  const onClickRec = () => {
    setTab("rec");
  };

  const onClickFol = () => {
    setTab("fol");
  };

  return (
    <div className={styles.tabFixed}>
      <div className={styles.title}>홈</div>
      <div className={styles.tab}>
        <div onClick={onClickRec}>
          전체
          <div className={styles.tabIndicator} hidden={tab === "fol"}></div>
        </div>
        <div onClick={onClickFol}>
          추천
          <div className={styles.tabIndicator} hidden={tab === "rec"}></div>
        </div>
      </div>
    </div>
  );
}
