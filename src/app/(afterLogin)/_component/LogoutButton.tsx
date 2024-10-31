"use client";

import style from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";
import { Session } from "@auth/core/types";
import { useRouter } from "next/navigation";
// import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton() {
  //   const queryClient = useQueryClient();

  const { data: me } = useSession();

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
    });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <div className={style.bg}>
      <button className={style.logOutButton} onClick={onLogout}>
        로그아웃
        {/* <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div> */}
      </button>
    </div>
  );
}
