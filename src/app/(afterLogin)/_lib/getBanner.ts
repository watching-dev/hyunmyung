// type Props = { pageParam?: number };
export async function getBanner() {
  const res = await fetch(`http://localhost:3000/api/banner`, {
    next: {
      tags: ["posts", "banner"],
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // const resJson = await res.json(); // 데이터를 가져오고 싶으면 꼭 await 붙여라
  // console.log("resJson", resJson);
  // const { bannerURL } = resJson;
  // console.log("banner==", bannerURL);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
