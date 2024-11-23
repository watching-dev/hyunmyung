export interface IPage {
  pageParam?: any;
}
export async function getPosts(pageParam: IPage) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_VERCEL_URL ??
      process.env.NEXT_PUBLIC_BASE
    }/api/infinitePost?page=${pageParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["posts", "all"],
        // revalidate: 30,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
