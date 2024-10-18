import styles from "./rightSectionMain.module.css";
import PostForm from "./tab/PostForm";
import Tab from "./tab/Tab";
import TabProvider from "./tab/TabProvider";

export default function RightSectionMain() {
  return (
    <div className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm />
      </TabProvider>
    </div>
  );
}
