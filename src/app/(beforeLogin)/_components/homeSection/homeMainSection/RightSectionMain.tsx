import styles from "./rightSectionMain.module.css";
import Tab from "./tab/Tab";
import TabProvider from "./tab/TabProvider";

export default function RightSectionMain() {
  return (
    <div className={styles.main}>
      <TabProvider>
        <Tab />
      </TabProvider>
    </div>
  );
}
