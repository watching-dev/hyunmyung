import styles from "./rightSectionMain.module.css";
import TabProvider from "./tab/TabProvider";

export default function RightSectionMain() {
  return <div className={styles.main}><TabProvider>
    </TabProvider></div>;
}
