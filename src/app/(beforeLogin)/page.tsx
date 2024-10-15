import HomeLeftSection from "./_components/homeSection/homeLeftSection";
import HomeRightSection from "./_components/homeSection/homeRightSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div>Home</div>
      <div className={styles.container}>
        <HomeLeftSection />
        <HomeRightSection />
      </div>
    </>
  );
}
