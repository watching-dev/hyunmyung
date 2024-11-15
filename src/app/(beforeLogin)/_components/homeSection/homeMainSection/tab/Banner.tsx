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

  const url =
    data?.bannerURL === null
      ? "/img.png"
      : data?.bannerURL === undefined
      ? "/img.png"
      : data!.bannerURL;

  console.log(url);

  return (
    <div className={styles.banner}>
      {/* banner */}
      <Image src={url} width={600} height={400} alt="banner"></Image>
    </div>
  );
}
