"use client";

import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";
import QuillNoSSRWrapper from "../_component/QuillEditor";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const [content, setContent] = useState("");
  const router = useRouter();
  const session = useSession();
  console.log("session:", session);
  const title = "title";

  // 게시물 작성하기
  const handleSubmit = async (formData: FormData) => {
    try {
      console.log("handle");
      console.log(content);

      const params = {
        postImage: formData.get("image"),
      };
      console.log(params);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE}/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, title, params }),
      });
      console.log(response);
      const res = await response.json(); // 이렇게 해야 내가 원하는 response를 받을수 있구나
      console.log(res);
      // router.replace("/");
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
      </div>
      <QuillNoSSRWrapper
        className={styles.editor}
        forwardedRef={quillInstance}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder={"여기에서 입력하세요."}
        value={content}
        onChange={setContent}
        // style={{ width: "100%", height: "80%" }}
      />

      <form action={handleSubmit}>
        <div>
          <p>post image url</p>
          <input type="text" name="image"></input>
        </div>
        <button
          type="submit"
          className={styles.logOutButton} /* onClick={handleSubmit}*/
        >
          <div className={styles.navItem}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
              </g>
            </svg>
          </div>
        </button>
      </form>
    </>
  );
}
