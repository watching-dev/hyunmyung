export default function Join() {
  async function onSubmit(formData: FormData) {
    "use server";

    const params = {
      userId: formData.get("userId"),
      userPw: formData.get("userPw"),
      name: formData.get("userName"),
      description: formData.get("userDesc"),
    };
    const __response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        process.env.NEXT_PUBLIC_BASE
      }/api/user/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    // const data = response.json();
    // ...
  }

  return (
    <form action={onSubmit}>
      <main>
        <div>
          <p>ID</p>
          <input type="text" name="userId"></input>
          <p>PASSWORD</p>
          <input type="password" name="userPw"></input>
          <p>이름</p>
          <input type="text" name="userName"></input>
          <p>소개</p>
          <input type="text" name="userDesc"></input>
          <hr />
          <button type="submit">가입하기</button>
        </div>
      </main>
    </form>
  );
}
