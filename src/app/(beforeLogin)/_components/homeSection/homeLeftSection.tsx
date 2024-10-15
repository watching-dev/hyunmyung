import styles from "./homeLeftSection.module.css";
import LeftSectionLogo from "./homeLeftSection/leftSectionLogo";
import LeftSectionMenu from "./homeLeftSection/leftSectionNavMenu";

export default function HomeLeftSection() {
  return (
    <div className={styles.leftSectionWrapper}>
      <div className={styles.leftSection}>
        <div className={styles.fixed}>
          <LeftSectionLogo />
          <nav>
            <ul>
              <LeftSectionMenu />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
