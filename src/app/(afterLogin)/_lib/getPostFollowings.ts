export async function getPostfollowings() {
  // const res = await fetch(`http://localhost:9090/api/followingPosts`, {
  const res = await fetch(`http://localhost:3000/api/posts`, {
    next: {
      tags: ["posts", "followings"],
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
