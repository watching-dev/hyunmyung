"use client";

import style from "./signupmodal.module.css";
import { useFormState, useFormStatus } from "react-dom";
import onSubmit from "../../_lib/singup";
import { useRouter } from "next/navigation";

function showMessage(message: string | null) {
  console.log("message", message);
  if (message === "no_id") {
    return "아이디를 입력하세요.";
  }
  if (message === "no_name") {
    return "닉네임을 입력하세요.";
  }
  if (message === "no_password") {
    return "비밀번호를 입력하세요.";
  }
  if (message === "no_image") {
    return "이미지를 업로드하세요.";
  }
  if (message === "user_exists") {
    return "이미 사용 중인 아이디입니다.";
  }
  return "";
}

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();
  console.log("state", state);
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            {/* <BackButton /> */}
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
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  required
                  className={style.input}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button
                type="submit"
                className={style.actionButton}
                disabled={pending}
              >
                가입하기
              </button>
              <div className={style.error}>{showMessage(state?.message)}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
