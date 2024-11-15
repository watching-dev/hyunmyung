import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";

import UploadBanner from "../_component/UploadBanner";
import styles from "./bannerPage.module.css";

export default function BannerPage() {
  return (
    <>
      <div className={styles.tabFixed}>
        <BackButton page="/" />
        <div className={styles.title}>배너 이미지 업로드 하기</div>
      </div>
      <UploadBanner />
    </>
  );
}
