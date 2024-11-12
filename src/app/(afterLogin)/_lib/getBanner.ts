// type Props = { pageParam?: number };
export async function getBanner() {
  const res = await fetch(`http://localhost:3000/api/banner`, {
    next: {
      tags: ["posts", "banner"],
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
