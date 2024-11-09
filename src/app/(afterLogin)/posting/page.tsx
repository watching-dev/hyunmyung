"use client";

import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Posting() {
  const [value, setValue] = useState("");
  return (
    <>
      <div className={styles.tabFixed}>
        <BackButton />
        <div className={styles.title}>작성하기</div>
      </div>
      <ReactQuill
        className={styles.editor}
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </>
  );
}
