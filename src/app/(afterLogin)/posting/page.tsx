"use client";

import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";
import QuillNoSSRWrapper from "../_component/quillEditor";
import { useRef } from "react";
import ReactQuill from "react-quill";
// import React, { useState } from "react";

export default function Posting() {
  // const [value, setValue] = useState("");
  const quillInstance = useRef<ReactQuill>(null);
  return (
    <>
      <div className={styles.tabFixed}>
        <BackButton page="/" />
        <div className={styles.title}>작성하기</div>
      </div>
      <QuillNoSSRWrapper
        className={styles.editor}
        forwardedRef={quillInstance}
        // modules={modules}
        // formats={formats}
        theme="snow"
        // value={value}
        // onChange={setValue}
      />
    </>
  );
}
