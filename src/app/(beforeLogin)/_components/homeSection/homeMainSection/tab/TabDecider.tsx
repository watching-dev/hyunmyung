"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import PostAll from "./PostAll";
import PostRecommends from "./PostRecommends";

export default function TabDecider() {
  const { tab } = useContext(TabContext);

  if (tab === "all") {
    return <PostAll />;
  }
  return <PostRecommends />;
}
