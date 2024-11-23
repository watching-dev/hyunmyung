import PostingButton from "@/app/(afterLogin)/_component/PostingButton";
import styles from "./homeLeftSection.module.css";
import LeftSectionLogo from "./homeLeftSection/LeftSectionLogo";
import LeftSectionMenu from "./homeLeftSection/LeftSectionNavMenu";
import { auth } from "@/auth";

export default async function HomeLeftSection() {
  const session = await auth();
  return (
    <div className={styles.leftSectionWrapper}>
      <div className={styles.leftSection}>
        <div className={styles.fixed}>
          <LeftSectionLogo />
          <nav>
            <ul>
              <div className={styles.fixedBackground}>
                <LeftSectionMenu />
              </div>
              <PostingButton me={session} />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
