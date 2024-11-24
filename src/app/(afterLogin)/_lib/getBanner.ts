export async function getBanner() {
  const res = await fetch(
    `${
      // process.env.NEXT_PUBLIC_SITE_URL ??
      // process.env.NEXT_PUBLIC_VERCEL_URL ??
      process.env.NEXT_PUBLIC_BASE
    }/api/banner`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["posts", "banner"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
