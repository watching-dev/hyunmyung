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
    queryKey: ["banner"],
    queryFn: getBanner,
    staleTime: 1000 * 60 * 60 * 24 * 1,
    gcTime: 1000 * 10 * 60 * 60 * 24 * 1,
  });

  console.log(data);

  return (
    <div className={styles.banner}>
      {data?.bannerURL === null || data?.bannerURL === undefined ? (
        <>
          <div className={styles.bg} />
        </>
      ) : (
        <>
          <div className={styles.bg}>
            <Image
              src={data.bannerURL}
              width={600}
              height={400}
              alt="banner"
            ></Image>
          </div>
        </>
      )}
    </div>
  );
}
