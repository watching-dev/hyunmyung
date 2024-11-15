"use client";

import { useState } from "react";
import styles from "./uploadBanner.module.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { storage } from "@/firebase/config";

export default function UploadBanner() {
  const uploadBanner = async () => {
    try {
      console.log("upload==", banner);
      const fileName = `${Date.now().toString()}_${banner.name}`;
      console.log("filename==: ", fileName);
      const storageRef = ref(storage, `images/banner/${fileName}`);
      console.log("storageRef", storageRef);
      const imageFile = new File([banner], fileName, { type: "image/jpeg" });
      console.log("imageFile", imageFile);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressdFile = await imageCompression(imageFile, options);
      console.log("compressedFile", compressdFile);
      const snapshot = await uploadBytes(storageRef, compressdFile);
      console.log("snapshot", snapshot);
      // const snapshot = await uploadBytes(storageRef, compressdFile);
      const url = await getDownloadURL(snapshot.ref);
      console.log("url:", url);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE}/api/banner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );
      console.log(response);
      const res = await response.json(); // 이렇게 해야 내가 원하는 response를 받을수 있구나
      console.log(res);
      // router.replace("/");
    } catch (error) {
      console.error(error);
      alert("업로드 or db 에러");
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
      setBanner(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e) {
        // state에 담아줌
        // setPreviewImg(e.target.result);
        console.log(e.target.result);
        setPreview(e.target.result);
      };
    }
  };
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState(null);

  return (
    <div>
      <form className={styles.upload} action={uploadBanner}>
        <div>
          <p>배너 업로드</p>
          <input
            type="file"
            id="banner"
            name="banner"
            accept="image/*"
            onChange={readURL}
          />
        </div>

        {preview === null ? (
          <></>
        ) : (
          <>
            <img src={preview} width={600} height={400} />
            <button type="submit">업로드</button>
          </>
        )}
      </form>
    </div>
  );
}
