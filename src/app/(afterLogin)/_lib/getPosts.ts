export interface IPage {
  pageParam?: any;
}
export async function getPosts(pageParam: IPage) {
  console.log("IPAGE=====", pageParam);
  const res = await fetch(
    // `http://localhost:9090/api/posts/r  ecommends?cursor=${pageParam}`,
    // `http://localhost:3000/api/posts?cursor=${pageParam}`,
    `http://localhost:3000/api/infinitePost?page=${pageParam}`,
    {
      next: {
        tags: ["posts", "all"],
        revalidate: 30,
      },
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
