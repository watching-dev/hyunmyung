import Image from "next/image";
import styles from "./recommendPost.module.css";
import { IList } from "@/app/api/posts/route";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import MonthlyMagazine from "../homeMainSection/tab/MonthlyMagazine";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  data: IList;
}
export default function RecommendPost({ data }: Props) {
  console.log("recommend post data: ", data);
  const time = dayjs(
    dayjs(data.createdAt).subtract(9, "hour").format()
  ).fromNow(true);
  return (
    <MonthlyMagazine post={data}>
      <div>
        <li className={styles.cursor}>
          <div className={styles.bg}>
            <Image
              src={data.postImage}
              alt={data.title}
              width={600}
              height={400}
              className={styles.thumbnail}
            />
            <div className={styles.info}>
              <div className={styles.title}>{data.title}</div>
              <div className={styles.date}>{time}</div>
            </div>
          </div>
        </li>
      </div>
    </MonthlyMagazine>
  );
}
