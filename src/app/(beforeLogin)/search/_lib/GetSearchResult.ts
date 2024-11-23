import { QueryFunction } from "@tanstack/query-core";
import { IList } from "@/app/api/posts/route";

export const getSearchResult: QueryFunction<
  IList[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]
> = async ({ queryKey }) => {
  const [__1, __2, searchParams] = queryKey;
  const __urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_VERCEL_URL ??
      process.env.NEXT_PUBLIC_BASE
    }/api/search?q=${searchParams.q}`,
    {
      next: {
        tags: ["posts", "search", searchParams.q],
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
