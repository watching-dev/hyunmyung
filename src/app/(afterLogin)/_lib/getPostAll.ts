export async function getPostAll() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE}/api/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["posts", "all"],
      // revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
