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

  const uploadBanner = async () => {
    if (banner !== null || banner !== undefined) {
      try {
        const fileName = `${Date.now().toString()}_${banner!.name}`;
        const storageRef = ref(
          storage,
          `images/banner/${kr_current.getFullYear()}/${
            kr_current.getMonth() + 1
          }/${kr_current.getDate()}/${fileName}`
        );
        const imageFile = new File([banner!], fileName, { type: "image/jpeg" });
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressdFile = await imageCompression(imageFile, options);
        const snapshot = await uploadBytes(storageRef, compressdFile);
        const url = await getDownloadURL(snapshot.ref);
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
        const res = await response.json(); // await 해야 데이터 제대로 확인 가능
        router.replace("/");
      } catch (error) {
        console.error(error);
        alert(`업로드 에러: ${error}`);
      }
    } else {
      // console.log("banner === null || undefined");
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
      setBanner(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e: any) {
        // state에 담아줌
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
