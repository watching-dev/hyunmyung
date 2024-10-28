import styles from "./rightSectionMain.module.css";
import Post from "./_components/homeSection/homeMainSection/tab/Post";
import PostForm from "./_components/homeSection/homeMainSection/tab/PostForm";
import Tab from "./_components/homeSection/homeMainSection/tab/Tab";
import TabProvider from "./_components/homeSection/homeMainSection/tab/TabProvider";

export default function RightSectionMain() {
  return (
    <div className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        {/* <Banner /> */}
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </div>
  );
}
