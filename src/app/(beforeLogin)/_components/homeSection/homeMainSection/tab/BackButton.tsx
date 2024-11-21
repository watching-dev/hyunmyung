"use client";

import { useRouter } from "next/navigation";
import style from "./backButton.module.css";

interface Props {
  page: string;
}
export default function BackButton({ page }: Props) {
  const router = useRouter();
  const onClick = () => {
    // router.back(); replace하면 다시 앞으로 갈 수가 없는데 상황에 따라 back or replace 로 정리
    router.replace(page);
  };
  return (
    <button className={style.backButton} onClick={onClick}>
      <svg
        width={24}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
      >
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </g>
      </svg>
    </button>
  );
}
