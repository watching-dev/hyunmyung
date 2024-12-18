"use client";

import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useRouter } from "next/navigation";
// import DOMPurify from "dompurify";
import DOMPurify from "isomorphic-dompurify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import DynamicQuillEditor from "../_component/QuillEditor";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";

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
  const [content, setContent] = useState("");
  const router = useRouter();

  const quillInstance = useRef<ReactQuill>(null);
  const sanitizer = DOMPurify.sanitize;
  const cleanContent = sanitizer(content);

  const [thumb, setThumb] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [thumbURL, setThumbURL] = useState("");
  const [title, setTitle] = useState("");
  const titleChange = (e: any) => {
    setTitle(e.target.value);
    // console.log("title:", e.target.value);
    // console.log("setTitle:", title);
  };

  const session = useSession(); // userId auth() -> useSession 으로 변경하여 props로 전달

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // input.setAttribute("accept", "image/jpg,image/png,image/jpeg");
    // input.setAttribute("multiple", "multiple");
    input.click();

    input.addEventListener("change", async () => {
      if (input.files![0] !== null || input.files![0] === undefined) {
        const file: File = input.files![0];
        // input.files?.[0] 과 동일한지 체크 필요

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const current = new Date();
        const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
        // ----> 서버가 아니라 브라우저에서 시간 계산이 돼서 그런지 9시간 더해져서 나옴, 2배 -> 1배로 변경
        // 배포 후에는 각각 시간 어떻게 적용되는지 파악해야 할듯, utc로 하든지 등등
        const kr_current = new Date(utc + KR_TIME_DIFF);
        // console.log(
        //   "kr",
        //   kr_current,
        //   "year",
        //   kr_current.getFullYear(),
        //   "mon",
        //   kr_current.getMonth() + 1, // month는 0부터 시작하기 때문에 1 더해줘야 함
        //   "next",
        //   kr_current.getMonth() + 2,
        //   "day",
        //   kr_current.getDate()
        // );

        try {
          const fileName = `${Date.now().toString()}_${file.name}`;
          const storageRef = ref(
            storage,
            `images/images/${kr_current.getFullYear()}/${
              kr_current.getMonth() + 1
            }/${kr_current.getDate()}/images/${fileName}`
          );
          const imageFile = new File([file], fileName, { type: "image/jpeg" });
          const compressdFile = await imageCompression(imageFile, options);
          const snapshot = await uploadBytes(storageRef, compressdFile);
          const url = await getDownloadURL(snapshot.ref);
          const editor = quillInstance.current?.getEditor();
          const range = editor?.getSelection();
          const rangeIndex =
            range?.index === null || range?.index === undefined
              ? 0
              : range.index;
          const rangeLength =
            range?.length === null || range?.length === undefined
              ? 0
              : range.length;
          editor?.insertEmbed(rangeIndex, "image", url);
          editor?.setSelection(rangeIndex + 1, rangeLength);
          alert("업로드 성공");
        } catch (error) {
          console.log(error);
          alert("이미지 업로드 실패");
        }
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
        matchVisual: false,
      },
    }),
    []
  );

  // 게시물 작성하기
  const handleSubmit = async (formData: FormData) => {
    try {
      const params = {
        postImage: formData.get("image"),
      };

      const recommended = false;
      const __response = await fetch(
        `${
          // process.env.NEXT_PUBLIC_SITE_URL ??
          // process.env.NEXT_PUBLIC_VERCEL_URL ??
          process.env.NEXT_PUBLIC_BASE
        }/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
            title,
            params,
            thumbURL,
            recommended,
            session,
          }),
        }
      );
      // const res = await response.json(); // awati 해야 제대로 볼 수 있음
      router.replace("/");
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const uploadThumbnail = async (__formData: FormData) => {
    if (thumb !== null || thumb !== undefined) {
      const current = new Date();
      const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
      // ----> 서버가 아니라 브라우저에서 시간 계산이 돼서 그런지 9시간 더해져서 나옴, 2배 -> 1배로 변경
      // 배포 후에는 각각 시간 어떻게 적용되는지 파악해야 할듯, utc로 하든지 등등
      const kr_current = new Date(utc + KR_TIME_DIFF);
      // console.log(
      //   "kr",
      //   kr_current,
      //   "year",
      //   kr_current.getFullYear(),
      //   "mon",
      //   kr_current.getMonth() + 1, // month는 0부터 시작하기 때문에 1 더해줘야 함
      //   "next",
      //   kr_current.getMonth() + 2,
      //   "day",
      //   kr_current.getDate()
      // );
      try {
        const fileName = `${Date.now().toString()}_${thumb!.name}`;
        const storageRef = ref(
          storage,
          `images/images/${kr_current.getFullYear()}/${
            kr_current.getMonth() + 1
          }/${kr_current.getDate()}/thumbnail/${fileName}`
        );
        const imageFile = new File([thumb!], fileName, { type: "image/jpeg" });
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressdFile = await imageCompression(imageFile, options);
        const snapshot = await uploadBytes(storageRef, compressdFile);
        const url = await getDownloadURL(snapshot.ref);
        setThumbURL(url);
        alert("썸네일 저장 완료");
      } catch (error) {
        console.error(error);
        alert("업로드 에러");
      }
    }
  };

  // 파일의 url 가져옴, input의 onChange에 실행
  const readURL = (e: any) => {
    // 업로드한 파일이 있는지 체크
    if (e.target.files.length) {
      // 있으면 FileReader 객체 생성
      const reader = new FileReader();
      // reader에게 파일 url 읽으라고 함
      reader.readAsDataURL(e.target.files[0]);
      // console.log(e.target.files.length);
      // console.log(e.target.files[0]);
      setThumb(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e: any) {
        // state에 담아줌
        setPreview(e.target.result);
      };
    }
  };

  return (
    <>
      <div className={styles.tabFixed}>
        <BackButton page="/" />
        <div className={styles.title}>작성하기</div>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.titleInput}
          onChange={titleChange}
          type="text"
          placeholder="제목"
        />
        {/* <QuillNoSSRWrapper
          className={styles.editor}
          forwardedRef={quillInstance}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder={"여기에서 입력하세요."}
          value={content}
          onChange={setContent}
          // style={{ width: "100%", height: "80%" }}
        /> */}
        <DynamicQuillEditor
          className={styles.editor}
          // forwardedRef={quillInstance}
          reactQuillRef={quillInstance}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder={"여기에서 입력하세요."}
          value={content}
          onChange={setContent}
        />
      </div>
      <div className={styles.section}>
        <form className={styles.form} action={handleSubmit}>
          <div>
            <p>post image url</p>
            <input type="text" name="image"></input>
          </div>
          <button
            type="submit"
            className={styles.logOutButton}
            // onClick={handleSubmit}
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

          {preview === null || preview === undefined || preview === "" ? (
            <></>
          ) : (
            <>
              <Image src={preview} width={100} height={50} alt="preview" />
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
