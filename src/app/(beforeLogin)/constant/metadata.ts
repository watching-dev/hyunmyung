import { Metadata } from "next";

export const META = {
  hyunMyung: "HyunMyung",
  metadataBase: new URL(
    `${
      // process.env.NEXT_PUBLIC_SITE_URL ??
      // process.env.NEXT_PUBLIC_VERCEL_URL ??
      process.env.NEXT_PUBLIC_BASE
    }`
  ),
  alternates: {
    canonical: `${
      // process.env.NEXT_PUBLIC_SITE_URL ??
      // process.env.NEXT_PUBLIC_VERCEL_URL ??
      process.env.NEXT_PUBLIC_BASE
    }`,
  },
  title: "Magazine / HyunMyung",
  description: "HyunMyung 블로그",
  siteName: "HyunMyung",
  icons: "../favicon.ico",
  generator: "Next.js",
  applicationName: "HyunMyung",
  referrer: "origin-when-cross-origin",
  keyword: [
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "front-end",
    "front",
    "web",
    "back-end",
    "developer",
    "기술블로그",
    "블로그",
    "blog",
    "ios",
    "react-native",
  ],
  authors: {
    name: "HyunMyung",
    url: `${
      // process.env.NEXT_PUBLIC_SITE_URL ??
      // process.env.NEXT_PUBLIC_VERCEL_URL ??
      process.env.NEXT_PUBLIC_BASE
    }`,
  },
  creator: "HyunMyung",
  publisher: "HyunMyung",
  openGraph: {
    title: "Magazine / HyunMyung",
    description: "HyunMyung 블로그",
    siteName: "Magazine / HyunMyung",
    locale: "ko_KR",
    type: "website",
    url: `${
      // process.env.NEXT_PUBLIC_SITE_URL ??
      // process.env.NEXT_PUBLIC_VERCEL_URL ??
      process.env.NEXT_PUBLIC_BASE
    }`,
    // images: {
    //   url: OG_IMAGE,
    // },
  },
  verification: {
    // google: META.googleVerification,
    // other: {
    //   'naver-site-verification': META.naverVerification,
    // },
  },
  twitter: {
    title: "Magazine / HyunMyung",
    description: "HyunMyung 블로그",
    // images: {
    //   url: OG_IMAGE,
    // },
  },
  url: `${process.env.NEXT_PUBLIC_BASE}`,
  type: "website",
  googleVerification: "xxx",
  naverVerification: "xxx",
  ogImage: "/opengraph-image.png",
} as const;

// export const getMetadata = (metadataProps?: generateMetadataProps) => {
//   const { title, description, asPath, ogImage } = metadataProps || {};

//   const TITLE = title ? `${title} | 반디부디` : META.title;
//   const DESCRIPTION = description || META.description;
//   const PAGE_URL = asPath ? asPath : "";
//   const OG_IMAGE = ogImage || META.ogImage;

//   const metadata: Metadata = {
//     metadataBase: new URL(META.url),
//     alternates: {
//       canonical: PAGE_URL,
//     },
//     title: TITLE,
//     description: DESCRIPTION,
//     keywords: [...META.keyword],
//     openGraph: {
//       title: TITLE,
//       description: DESCRIPTION,
//       siteName: TITLE,
//       locale: "ko_KR",
//       type: "website",
//       url: PAGE_URL,
//       images: {
//         url: OG_IMAGE,
//       },
//     },
//     verification: {
//       google: META.googleVerification,
//       other: {
//         "naver-site-verification": META.naverVerification,
//       },
//     },
//     twitter: {
//       title: TITLE,
//       description: DESCRIPTION,
//       images: {
//         url: OG_IMAGE,
//       },
//     },
//   };

//   return metadata;
// };
