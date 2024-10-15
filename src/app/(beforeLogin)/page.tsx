import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div>Home</div>
      <div className={styles.container}>
        <div className={styles.leftSectionWrapper}>
          <div className={styles.leftSection}></div>
        </div>
        <div className={styles.rightSectionWrapper}>
          <div className={styles.rightSectionInner}>
            <div className={styles.mainSection}></div>
            <div className={styles.rightSection}></div>
          </div>
        </div>
      </div>
    </>
  );
}
