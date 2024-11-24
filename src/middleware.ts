import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(
      `${
        // process.env.NEXT_PUBLIC_SITE_URL ??
        // process.env.NEXT_PUBLIC_VERCEL_URL ??
        process.env.NEXT_PUBLIC_BASE
      }/login`
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: ["/profile"], /profile이면 로그인 창 뜸
  matcher: ["/posting", "/banner", "/user/join"],
};
