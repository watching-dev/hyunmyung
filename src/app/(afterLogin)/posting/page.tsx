"use client";

import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";
import QuillNoSSRWrapper from "../_component/quillEditor";
import { useRef } from "react";
import ReactQuill from "react-quill";
// import React, { useState } from "react";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

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
        modules={modules}
        formats={formats}
        theme="snow"
        // value={value}
        // onChange={setValue}
      />
    </>
  );
}
