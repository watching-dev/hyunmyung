"use client";

import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";
import QuillNoSSRWrapper from "../_component/QuillEditor";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DOMPurify from "dompurify";

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
  "align",
  "image",
  "video",
];

export default function Posting() {
  const quillRef = useRef(null);

  const imageHandler = () => {
    console.log("imageHandler");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    console.log("input", input);

    input.addEventListener("change", async () => {
      const file = input.files[0];

      try {
        console.log("file: ", file);
        // const res = await imageApi({ img: file });
        // const imgUrl = res.data.imgUrl;
        // const editor = quillRef.current.getEditor();
        // const range = editor.getSelection();
        // editor.insertEmbed(range.index, "image", imgUrl);
        // editor.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
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
        handlers: { image: imageHandler },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }),
    []
  );

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
  const sanitizer = DOMPurify.sanitize;
  const cleanContent = sanitizer(content);

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

      <form className={styles.form} action={handleSubmit}>
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
      <div className={styles.preview}>
        <div className={styles.saveText}>{content}</div>
        <div className={styles.previewText}>
          <span
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        </div>
      </div>
      <div className={styles.bottom} />
    </>
  );
}
