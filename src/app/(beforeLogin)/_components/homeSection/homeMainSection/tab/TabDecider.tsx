"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import PostRecommends from "./PostAll";
import PostFollowings from "./PostRecommends";

export default function TabDecider() {
  const { tab } = useContext(TabContext);

  if (tab === "rec") {
    return <PostRecommends />;
  }
  return <PostFollowings />;
}
