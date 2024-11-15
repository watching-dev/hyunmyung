"use client";

import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";
import QuillNoSSRWrapper from "../_component/QuillEditor";
import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DOMPurify from "dompurify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import imageCompression from "browser-image-compression";
import { ImageActions } from "@xeger/quill-image-actions";

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
  "width",
  "height",
  "float",
];

export default function Posting() {
  Quill.register("modules/imageActions", ImageActions);
  const quillRef = useRef(null);
  const [content, setContent] = useState("");
  const router = useRouter();
  const session = useSession();
  console.log("session:", session);
  const title = "title";
  const quillInstance = useRef<ReactQuill>(null);
  const sanitizer = DOMPurify.sanitize;
  const cleanContent = sanitizer(content);

  const imageHandler = () => {
    console.log("imageHandler");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // input.setAttribute("accept", "image/jpg,image/png,image/jpeg");
    // input.setAttribute("multiple", "multiple");
    input.click();
    console.log("input", input);

    input.addEventListener("change", async () => {
      const file = input.files[0];

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        console.log("file: ", file);
        console.log("file name", file.name);
        const fileName = `${Date.now().toString()}_${file.name}`;
        console.log("filename==: ", fileName);
        const storageRef = ref(storage, `images/${fileName}`);
        console.log("storageRef", storageRef);
        const imageFile = new File([file], fileName, { type: "image/jpeg" });
        console.log("imageFile", imageFile);
        const compressdFile = await imageCompression(imageFile, options);
        console.log("compressedFile", compressdFile);
        const snapshot = await uploadBytes(storageRef, compressdFile);
        console.log("snapshot", snapshot);
        // const snapshot = await uploadBytes(storageRef, compressdFile);
        const url = await getDownloadURL(snapshot.ref);
        console.log("url:", url);
        // const res = await imageApi({ img: file });
        // const imgUrl = res.data.imgUrl;
        const editor = quillInstance.current.getEditor();
        console.log("editor", editor);
        const range = editor.getSelection();
        console.log("range", range);
        editor.insertEmbed(range.index, "image", url);
        editor.setSelection(range.index + 1);

        //     (const fileName = `${Date.now().toString()}_${blob.name}`;
        //     const storageRef = ref(storage, `images/${fileName}`);
        //     const imageFile = new File([blob], fileName, { type: 'image/jpeg' });

        //     const options = {
        //       maxSizeMB: 1,
        //       maxWidthOrHeight: 1920,
        //       useWebWorker: true,
        //     }

        //     try {
        //       const compressdFile = await imageCompression(imageFile, options)
        //       const snapshot = await uploadBytes(storageRef, compressdFile);
        //       const url = await getDownloadURL(snapshot.ref);
        //       images.current = Array.isArray(images.current) ? [...images.current, {fileName: fileName, url: url.replaceAll(/&/g, '&amp;')}] : [{fileName: fileName, url: url.replaceAll(/&/g, '&amp;')}]

        // )
      } catch (error) {
        console.log(error);
        alert("이미지 업로드 실패");
      }
    });
  };

  const modules = useMemo(
    () => ({
      imageActions: {},
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
          [{ align: "" }, { align: "center" }, { align: "right" }],
          [{ color: [] }, "image"],
          ["link"],
        ],
        handlers: { image: imageHandler },
        ImageResize: {
          modules: ["Resize"],
        },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }),
    []
  );

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

  const uploadThumbnail = async (formData: FormData) => {
    try {
      console.log("upload==", thumb);
    } catch (error) {
      console.error(error);
      alert("업로드 에러");
    }
  };

  // 파일의 url 가져옴, input의 onChange에 실행
  const readURL = (e) => {
    // 업로드한 파일이 있는지 체크
    if (e.target.files.length) {
      // 있으면 FileReader 객체 생성
      const reader = new FileReader();
      // reader에게 파일 url 읽으라고 함
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files.length);
      console.log(e.target.files[0]);
      setThumb(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e) {
        // state에 담아줌
        // setPreviewImg(e.target.result);
        console.log(e.target.result);
        setPreview(e.target.result);
      };
    }
  };
  const [thumb, setThumb] = useState(null);
  const [preview, setPreview] = useState(null);
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

      <div className={styles.section}>
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
        <form className={styles.upload} action={uploadThumbnail}>
          <div>
            <p>썸네일 업로드</p>
            <input
              type="file"
              id="thumb"
              name="thumb"
              accept="image/*"
              // onClick={imageHandler}
              onChange={readURL}
            />
          </div>

          {preview === null ? (
            <></>
          ) : (
            <>
              <img src={preview} width={100} height={50} />
              <button type="submit">업로드</button>
            </>
          )}
        </form>
      </div>
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
