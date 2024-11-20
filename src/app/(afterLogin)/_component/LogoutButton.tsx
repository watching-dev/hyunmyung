"use client";

import style from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";
import { Session } from "@auth/core/types";
import { useRouter } from "next/navigation";
// import { useQueryClient } from "@tanstack/react-query";

type Props = {
  me: Session | null;
};
export default function LogoutButton({ me }: Props) {
  //   const queryClient = useQueryClient();

  // const { data: me } = useSession();

  const router = useRouter();

  const onLogout = () => {
    // queryClient.invalidateQueries({
    //   queryKey: ["posts"],
    // });
    // queryClient.invalidateQueries({
    //   queryKey: ["users"],
    // });
    // signOut({ callbackUrl: "/" });
    signOut({ redirect: false }).then(() => {
      router.replace("/");
      router.refresh();
    });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <div className={style.bg}>
      <button className={style.logOutButton} onClick={onLogout}>
        <div className={style.navItem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </div>
      </button>
      {/* <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div> */}
    </div>
  );
}
