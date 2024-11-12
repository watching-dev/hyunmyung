export default function BannerPage() {
  async function onSubmit(formData: FormData) {
    "use server";

    const params = {
      bannerURL: formData.get("bannerURL"),
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE}/api/banner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = response.json();
    // ...
  }

  return (
    <form action={onSubmit}>
      <main>
        <div>
          <p>BannerURL</p>
          <input type="text" name="bannerURL"></input>
          <hr />
          <button type="submit">저장하기</button>
        </div>
      </main>
    </form>
  );
}
