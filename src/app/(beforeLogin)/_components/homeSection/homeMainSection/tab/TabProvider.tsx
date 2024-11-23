"use client";

import { createContext, ReactNode, useState } from "react";

export const TabContext = createContext({
  tab: "all",
  setTab: (__value: "all" | "rec") => {},
});

type Props = { children: ReactNode };

export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("all");

  return (
    <div>
      <TabContext.Provider value={{ tab, setTab }}>
        {children}
      </TabContext.Provider>
    </div>
  );
}
