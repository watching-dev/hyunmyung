export async function getRecommend() {
  const response = await fetch(`http://localhost:3000/api/recommend`);

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
