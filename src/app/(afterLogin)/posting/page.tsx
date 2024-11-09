import BackButton from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/BackButton";
import styles from "./posting.module.css";

export default function Posting() {
  return (
    <div className={styles.tabFixed}>
      <BackButton />
      <div className={styles.title}>작성하기</div>
    </div>
  );
}
