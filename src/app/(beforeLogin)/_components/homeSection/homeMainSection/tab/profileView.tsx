"use client";

import styles from "./profileView.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import imageCompression from "browser-image-compression";
import Image from "next/image";

export interface IProfile {
  User: {
    user_id: string;
    userId: string;
    userName: string;
  };

  description: string;
  profileImage: string;
  backgroundImage: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  name: string | null;
  description: string | null;
  backgroundImage: string | null;
  profileImage: string | null;
}

export default function ProfileView({
  name,
  description,
  backgroundImage,
  profileImage,
}: Props) {
  const [previewBg, setPreviewBg] = useState<string>();
  const [previewPf, setPreviewPf] = useState<string>();
  const [backgroundImg, setBackgroundImg] = useState<File>();
  const [profileImg, setProfileImg] = useState<File>();
  const sessionUse = useSession();
  const [session, setSession] = useState(sessionUse);
  // // const router = useRouter();
  // setSession(sessionUse);
  useEffect(() => {
    setSession(sessionUse);
  }, [sessionUse]);

  // console.log("seeeeesion==", session);
  // console.log(
  //   "name",
  //   name,
  //   "description",
  //   description,
  //   "backgroundImage",
  //   backgroundImage,
  //   "profileImage",
  //   profileImage
  // );

  const readBgURL = (e: any) => {
    // 업로드한 파일이 있는지 체크
    if (e.target.files.length) {
      // 있으면 FileReader 객체 생성
      const reader = new FileReader();
      // reader에게 파일 url 읽으라고 함
      reader.readAsDataURL(e.target.files[0]);

      setBackgroundImg(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e: any) {
        // state에 담아줌
        setPreviewBg(e.target.result);
      };
    }
  };

  const readPfURL = (e: any) => {
    // 업로드한 파일이 있는지 체크
    if (e.target.files.length) {
      // 있으면 FileReader 객체 생성
      const reader = new FileReader();
      // reader에게 파일 url 읽으라고 함
      reader.readAsDataURL(e.target.files[0]);

      setProfileImg(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e: any) {
        // state에 담아줌

        setPreviewPf(e.target.result);
      };
    }
  };

  const uploadImages = async () => {
    // 이미지 한개만 업로드 했을때 처리 / 로그인 했을때만 업로드 나오도록
    if (
      (profileImg !== null && backgroundImg !== null) ||
      (profileImg !== undefined && backgroundImg !== undefined)
    ) {
      try {
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

        const profileName = `${Date.now().toString()}_${profileImg!.name}`;
        const backgroundName = `${Date.now().toString()}_${
          backgroundImg!.name
        }`;
        const profileStorageRef = ref(
          storage,
          `images/profile/${kr_current.getFullYear()}/${
            kr_current.getMonth() + 1
          }/${kr_current.getDate()}/profile/${profileName}`
        );
        const backgroundStorageRef = ref(
          storage,
          `images/profile/${kr_current.getFullYear()}/${
            kr_current.getMonth() + 1
          }/${kr_current.getDate()}/background/${backgroundName}`
        );
        const profileImageFile = new File([profileImg!], profileName, {
          type: "image/jpeg",
        });
        const backgroundImageFile = new File([backgroundImg!], backgroundName, {
          type: "image/jpeg",
        });
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const profileCompressdFile = await imageCompression(
          profileImageFile,
          options
        );
        const backgroundCompressdFile = await imageCompression(
          backgroundImageFile,
          options
        );
        const profileSnapshot = await uploadBytes(
          profileStorageRef,
          profileCompressdFile
        );
        const backgroundSnapshot = await uploadBytes(
          backgroundStorageRef,
          backgroundCompressdFile
        );
        const profileUrl = await getDownloadURL(profileSnapshot.ref);
        const backgroundUrl = await getDownloadURL(backgroundSnapshot.ref);
        const userInfo = session.data?.user?.email;

        const __response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE}/api/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profileUrl,
              backgroundUrl,
              userInfo,
            }),
          }
        );
        // const res = await response.json(); // await 해야 제대로 볼 수 있음
        alert("저장 완료");
        // router.replace("/");
        // router.refresh();

        if (
          (profileImg === null && backgroundImg === null) ||
          (profileImg === undefined && backgroundImg === undefined)
        ) {
          // console.log("pforileImage && backgroundImage 업로드 되지 않음");
          alert("업로드 되지 않음");
        }
      } catch (error) {
        console.error(error);
        alert("업로드 에러");
      }
    }
  };

  return (
    <>
      <div className={styles.tabFixed}>
        <div className={styles.title}>프로필</div>
        {session.data === null || session.data === undefined ? (
          <></>
        ) : (
          <div className={styles.edit}>
            <div className={styles.bg}>
              배경 이미지 수정
              <input
                type="file"
                id="background"
                name="background"
                accept="image/*"
                onChange={readBgURL}
              />
            </div>
            <div className={styles.pf}>
              프로필 수정
              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/*"
                onChange={readPfURL}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.backgroundImage}>
        {session.data === null || session.data === undefined ? (
          backgroundImage === null || backgroundImage === undefined ? (
            <></>
          ) : (
            <Image
              src={backgroundImage}
              alt="background image"
              width={600}
              height={400}
              className={styles.previewBg}
              priority
              // placeholder="blur"
              // blurDataURL={blurDataURL}
            />
          )
        ) : previewBg === null ||
          previewBg === undefined ||
          previewBg === "" ? (
          backgroundImage === null ||
          backgroundImage === undefined ||
          backgroundImage === "" ? (
            <></>
          ) : (
            <Image
              src={backgroundImage}
              alt="background image"
              width={600}
              height={400}
              className={styles.previewBg}
              priority
              // placeholder="blur"
              // blurDataURL={blurDataURL}
            />
          )
        ) : (
          <Image
            src={previewBg}
            alt="background image"
            width={600}
            height={400}
            className={styles.previewBg}
            priority
            // placeholder="blur"
            // blurDataURL={blurDataURL}
          />
        )}
      </div>
      <div className={styles.profileBackground}>
        <div className={styles.profileImage}>
          {session.data === null || session.data === undefined ? (
            profileImage === null || profileImage === undefined ? (
              <></>
            ) : (
              <Image
                src={profileImage}
                alt="profile image"
                fill
                sizes="100px"
                priority
                // placeholder="blur"
                // blurDataURL={blurDataURL}
              />
            )
          ) : previewPf === null || previewPf === undefined ? (
            profileImage === null || profileImage === undefined ? (
              <></>
            ) : (
              <Image
                src={profileImage}
                alt="profile image"
                fill
                sizes="100px"
                priority
                // placeholder="blur"
                // blurDataURL={blurDataURL}
              />
            )
          ) : (
            <Image
              src={previewPf}
              alt="profile image"
              fill
              priority
              // placeholder="blur"
              // blurDataURL={blurDataURL}
            />
          )}
        </div>
      </div>
      <div className={styles.name}>
        {session.data === null || session.data === undefined
          ? name === null || name === undefined
            ? "HyunMyung"
            : name === "HyunMyung" || name === "hyunmyung"
            ? "HyunMyung"
            : `HyunMyung(${name})`
          : name}
      </div>
      <div className={styles.description}>
        {session.data === null || session.data === undefined
          ? description === null || description === undefined
            ? "지금까지 알게된 모든 것을 공유합니다."
            : name === "HyunMyung" || name === "hyunmyung"
            ? "지금까지 알게된 모든 것을 공유합니다."
            : `HyunMyung(${description})`
          : description}
      </div>
      {session.data === null || session.data === undefined ? (
        <></>
      ) : (
        <form className={styles.form} action={uploadImages}>
          <button type="submit">저장</button>
        </form>
      )}
    </>
  );
}
