"use client";

import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";
import QuillNoSSRWrapper from "../_component/QuillEditor";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";

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
  const [value, setValue] = useState("");
  // 게시물 작성하기
  const handleSubmit = async () => {
    try {
      console.log(value);
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
      // );

      // console.log(response);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const quillInstance = useRef<ReactQuill>(null);
  return (
    <>
      <div className={styles.tabFixed}>
        <BackButton page="/" />
        <div className={styles.title}>작성하기</div>
      </div>{" "}
      이미지는 아직 모르겠는데 글은 setContent, content로 데이터 받아와서 서버
      넘김, 에디터에서 가져오는건 onChange로 가져오는거네
      <QuillNoSSRWrapper
        className={styles.editor}
        forwardedRef={quillInstance}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder={"여기에서 입력하세요."}
        value={value}
        onChange={setValue}
        // style={{ width: "100%", height: "80%" }}
      />
      <button className={styles.logOutButton} onClick={handleSubmit}>
        <div className={styles.navItem}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </g>
          </svg>
        </div>
      </button>
    </>
  );
}
