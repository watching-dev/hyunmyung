"use client";

import Image from "next/image";
import styles from "./banner.module.css";
import { getBanner } from "@/app/(afterLogin)/_lib/getBanner";
import { useQuery } from "@tanstack/react-query";
export interface IBanner {
  bannerURL: string;
}
export default function Banner() {
  const { data } = useQuery<IBanner>({
    queryKey: ["posts", "banner"],
    queryFn: getBanner,
    staleTime: 60 * 1000,
  });

  console.log(data);

  return (
    <div className={styles.banner}>
      {data?.bannerURL === null || data?.bannerURL === undefined ? (
        <></>
      ) : (
        <>
          <Image
            src={data.bannerURL}
            width={600}
            height={400}
            alt="banner"
          ></Image>
        </>
      )}
    </div>
  );
}
