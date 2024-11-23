import { ReactNode } from "react";
import HomeLeftSection from "./_components/homeSection/HomeLeftSection";

import styles from "./layout.module.css";
import HomeRightSection from "./_components/homeSection/HomeRightSection";
import RQProvider from "../(afterLogin)/_component/RQProvider";
import { Metadata } from "next";
import { META } from "./constant/metadata";

export const metadata: Metadata = {
  metadataBase: META.metadataBase,
  alternates: {
    canonical: META.alternates.canonical,
  },
  title: {
    template: `%s / ${META.hyunMyung}`,
    default: `${META.title}`,
  },
  description: META.description,
  icons: META.icons,
  generator: META.generator,
  applicationName: META.applicationName,
  referrer: META.referrer,
  keywords: `${META.keyword}`,
  authors: { name: META.authors.name, url: META.authors.url },
  creator: META.creator,
  publisher: META.publisher,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: {
      template: `%s :: ${META.hyunMyung}`,
      default: META.openGraph.title,
    },
    description: META.openGraph.description,
    url: META.openGraph.url,
    siteName: META.openGraph.siteName,
    locale: META.openGraph.locale,
    type: META.openGraph.type,
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png',
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: 'https://nextjs.org/og-alt.png',
    //     width: 1800,
    //     height: 1600,
    //     alt: 'My custom alt',
    //   },
    // ],
    images: META.ogImage,
  },
  twitter: {
    title: META.twitter.title,
    description: META.twitter.description,
  },
};

export default function BeforeLoginLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div className={styles.container}>
        <HomeLeftSection />
        <RQProvider>
          <HomeRightSection>
            {children}
            {modal}
          </HomeRightSection>
        </RQProvider>
      </div>
    </>
  );
}
