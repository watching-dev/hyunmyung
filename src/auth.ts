import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // console.log("auth#1===");
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: credentials.username,
              userPw: credentials.password,
            }),
          }
        );
        const user = await authResponse.json();
        // console.log("==>", authResponse.ok);
        // console.log(user);

        if (!user.result) {
          // return null;
          const credentialsSignin = new CredentialsSignin();
          // console.log("cre", credentialsSignin);
          // console.log("status", authResponse);
          // if (authResponse.status === 404) {
          //   credentialsSignin.code = "no_user";
          // } else if (authResponse.status === 401) {
          //   credentialsSignin.code = "wrong_password";
          // } else if (authResponse.status === 500) {
          //   credentialsSignin.code = "wrong_id";
          // }

          credentialsSignin.code = "500";
          throw credentialsSignin;
        }

        // console.log("user", user);
        return {
          // email: user.id,
          // name: user.nickname,
          // image: user.image,
          // id: "usersuer" 이거 리턴 못받네,
          email: user.id,
          name: user.name,
          image: user.image,
          // ...user,
        };
        // return user;
      },
    }),
  ],
});
