import styles from "./homeLeftSection.module.css";
import LeftSectionLogo from "./homeLeftSection/LeftSectionLogo";
import LeftSectionMenu from "./homeLeftSection/LeftSectionNavMenu";

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
