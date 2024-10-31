import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";
import styles from "./leftSectionLogo.module.css";
import { auth } from "@/auth";

export default async function LeftSectionLogo() {
  const session = await auth();
  return (
    <>
      <div className={styles.logo}>로고</div>
      <LogoutButton me={session} />
    </>
  );
}
