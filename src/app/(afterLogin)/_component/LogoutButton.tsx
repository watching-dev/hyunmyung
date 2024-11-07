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
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </g>
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
