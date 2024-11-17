"use client";

import { QueryClient } from "@tanstack/react-query";
import styles from "./profileView.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import Image from "next/image";

export interface IProfile {
  User: {
    user_id: String;
    userId: String;
    userName: String;
  };

  description: String;
  profileImage: String;
  backgroundImage: String;
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
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   // queryKey: ["users", username],

  //   queryKey: ["user", "hyunmyung"],
  //   // queryFn: getUser,
  // });
  // const dehydrateState = dehydrate(queryClient);

  // const { data } = useQuery<IPost[]>({
  //   queryKey: ["posts", "all"],
  //   queryFn: getPostAll,
  //   staleTime: 60 * 1000,
  // });
  // return data?.map((post) => <Post key={post.postId} post={post} />);

  // const url =
  //   "https://pbs.twimg.com/profile_images/1849727333617573888/HBgPUrjG_400x400.jpg";
  // const imgData = await fetch(url, {
  //   next: {
  //     revalidate: 3,
  //   },
  // });
  // const arrayBufferData = await imgData.arrayBuffer();
  // const lqipData = await lqip(Buffer.from(arrayBufferData));
  // const blurDataURL = lqipData.metadata.dataURIBase64;
  const [previewBg, setPreviewBg] = useState(null);
  const [previewPf, setPreviewPf] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const sessionUse = useSession();
  const [session, setSession] = useState(sessionUse);
  const router = useRouter();

  console.log("seeeeesion==", session);
  console.log(
    "name",
    name,
    "description",
    description,
    "backgroundImage",
    backgroundImage,
    "profileImage",
    profileImage
  );

  const readBgURL = (e) => {
    // 업로드한 파일이 있는지 체크
    if (e.target.files.length) {
      // 있으면 FileReader 객체 생성
      const reader = new FileReader();
      // reader에게 파일 url 읽으라고 함
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files.length);
      console.log(e.target.files[0]);
      setBackgroundImg(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e) {
        // state에 담아줌
        // setPreviewImg(e.target.result);
        console.log(e.target.result);
        setPreviewBg(e.target.result);
      };
    }
  };

  const readPfURL = (e) => {
    // 업로드한 파일이 있는지 체크
    if (e.target.files.length) {
      // 있으면 FileReader 객체 생성
      const reader = new FileReader();
      // reader에게 파일 url 읽으라고 함
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files.length);
      console.log(e.target.files[0]);
      setProfileImg(e.target.files[0]);

      // 읽기 동작이 성공적으로 load됐을때 발생할 이벤트 핸들러
      reader.onload = function (e) {
        // state에 담아줌
        // setPreviewImg(e.target.result);
        console.log(e.target.result);
        setPreviewPf(e.target.result);
      };
    }
  };

  const uploadImages = async () => {
    // 이미지 한개만 업로드 했을때 처리 / 로그인 했을때만 업로드 나오도록
    console.log("저장");
    console.log("pf :", profileImg);
    console.log("bg :", backgroundImg);
    try {
      console.log("upload==", profileImg);
      const profileName = `${Date.now().toString()}_${profileImg.name}`;
      console.log("upload==", backgroundImg);
      const backgroundName = `${Date.now().toString()}_${backgroundImg.name}`;
      console.log("profilename==: ", profileName);
      console.log("backgroundname==: ", backgroundName);
      const profileStorageRef = ref(storage, `images/profile/${profileName}`);
      console.log("profileStorageRef", profileStorageRef);
      const backgroundStorageRef = ref(
        storage,
        `images/profile/${backgroundName}`
      );
      console.log("backgroundStorageRef", backgroundStorageRef);
      const profileImageFile = new File([profileImg], profileName, {
        type: "image/jpeg",
      });
      const backgroundImageFile = new File([backgroundImg], backgroundName, {
        type: "image/jpeg",
      });
      console.log("profileImageFile", profileImageFile);
      console.log("backgroundImageFile", backgroundImageFile);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const profileCompressdFile = await imageCompression(
        profileImageFile,
        options
      );
      console.log("profileCompressedFile", profileCompressdFile);
      const backgroundCompressdFile = await imageCompression(
        backgroundImageFile,
        options
      );
      console.log("backgroundCompressedFile", backgroundCompressdFile);
      const profileSnapshot = await uploadBytes(
        profileStorageRef,
        profileCompressdFile
      );
      console.log("profileSnapshot", profileSnapshot);
      const backgroundSnapshot = await uploadBytes(
        backgroundStorageRef,
        backgroundCompressdFile
      );
      console.log("backgroundSnapshot", backgroundSnapshot);
      const profileUrl = await getDownloadURL(profileSnapshot.ref);
      const backgroundUrl = await getDownloadURL(backgroundSnapshot.ref);
      console.log("profileUrl:", profileUrl);
      console.log("backgroundUrl:", backgroundUrl);

      console.log("session:", session);
      const userInfo = session.data?.user?.email;
      console.log("userInfo", userInfo);

      console.log("before response");
      const response = await fetch(
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
      console.log(response);
      const res = await response.json(); // 이렇게 해야 내가 원하는 response를 받을수 있구나
      console.log(res);
      // router.replace("/");

      if (profileImg === null && backgroundImg === null) {
        console.log("pforileImage && backgroundImage 업로드 되지 않음");
      }

      // router.refresh();
    } catch (error) {
      console.error(error);
      alert("업로드 or db 에러");
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
              // placeholder="blur"
              // blurDataURL={blurDataURL}
            />
          )
        ) : previewBg === null || previewBg === undefined ? (
          backgroundImage === null || backgroundImage === undefined ? (
            <></>
          ) : (
            <Image
              src={backgroundImage}
              alt="background image"
              width={600}
              height={400}
              className={styles.previewBg}
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
            // placeholder="blur"
            // blurDataURL={blurDataURL}
          />
        )}
      </div>
      <div className={styles.profileBackground}>
        <div className={styles.profileImage}>
          {/* <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
            </g>
          </svg> */}
          {/* <Image
            src={url}
            alt="elon musk"
            fill
            placeholder="blur"
            blurDataURL={blurDataURL}
          /> */}
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
