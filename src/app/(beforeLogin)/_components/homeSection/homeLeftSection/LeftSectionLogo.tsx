import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";
import styles from "./leftSectionLogo.module.css";
import { auth } from "@/auth";

export default async function LeftSectionLogo() {
  const session = await auth();
  return (
    <div className={styles.bg}>
      <a href="/">
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M7.323 2h11.443l-3 5h6.648L6.586 22.83 7.847 14H2.523l4.8-12zm1.354 2l-3.2 8h4.676l-.739 5.17L17.586 9h-5.352l3-5H8.677z"></path>
            </g>
          </svg>
        </div>
      </a>
      <LogoutButton me={session} />
    </div>
  );
}
