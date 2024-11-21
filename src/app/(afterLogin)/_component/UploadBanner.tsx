"use client";

import { useState } from "react";
import styles from "./uploadBanner.module.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { storage } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function UploadBanner() {
  const [banner, setBanner] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const router = useRouter();

  const uploadBanner = async () => {
    if (banner !== null || banner !== undefined) {
      try {
        console.log("upload==", banner);
        const fileName = `${Date.now().toString()}_${banner!.name}`;
        console.log("filename==: ", fileName);
        const storageRef = ref(storage, `images/banner/${fileName}`);
        console.log("storageRef", storageRef);
        const imageFile = new File([banner!], fileName, { type: "image/jpeg" });
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
        const res = await response.json(); // await 해야 데이터 제대로 확인 가능
        console.log(res);
        router.replace("/");
      } catch (error) {
        console.error(error);
        alert(`업로드 에러: ${error}`);
      }
    } else {
      console.log("banner === null || undefined");
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
      console.log(e.target.files.length);
      console.log(e.target.files[0]);
      setBanner(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e: any) {
        // state에 담아줌
        // setPreviewImg(e.target.result);
        console.log(e.target.result);
        setPreview(e.target.result);
      };
    }
  };

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

        {preview === null || preview === undefined || preview === "" ? (
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
