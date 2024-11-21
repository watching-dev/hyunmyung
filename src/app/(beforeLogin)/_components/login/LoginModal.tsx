"use client";

import { useRouter } from "next/navigation";
import style from "./loginModal.module.css";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });

      // if (!response?.error) {
      //   // setMessage("아이디와 비번이 일치하지 않음");
      //   setMessage("!response?.error");
      // } else {
      //   setMessage("!response?.error else");
      //   // router.replace("/");
      //   // router.back();
      // }
      // 이게 왜 틀렸냐면 response status가 200인건 당연한거임
      // response?.error는 문자열이니까 무조건 true로 떨어지지..
      // 통신 자체는 성공 한거고(status 200, ok true) 그 안에서 이름, 비번이 틀린걸 검증했어야 했던 것
      // 서버에서 날라오는게 이상하게 되어 있어서 그런거.. error가 왜 저따구로 와서 햇갈리게 하냐

      // ====>>>> fetch api 통일성 있게 템플릭화 필요
      if (
        response?.code === "500" ||
        (response?.code === null && response?.url === null)
      ) {
        setMessage("아이디와 비번이 일치하지 않음");
      } else {
        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      setMessage("에러");
    }
  };
  const onClickClose = () => {
    router.back();
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onClickClose}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={style.input}
                value={id}
                onChange={onChangeId}
                type="text"
                placeholder=""
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder=""
              />
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!id && !password}>
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
