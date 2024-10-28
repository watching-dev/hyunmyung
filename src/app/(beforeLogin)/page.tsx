import HomeLeftSection from "./_components/homeSection/HomeLeftSection";
import HomeRightSection from "./_components/homeSection/HomeRightSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* <div>Home</div> */}
      <div className={styles.container}>
        <HomeLeftSection />
        <HomeRightSection />
      </div>
    </>
  );
}
