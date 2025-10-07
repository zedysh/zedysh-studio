import { Metadata } from "next";

export const myMetadata: Metadata = {
  title: "Zedysh Portfolio",
  description: "Check out my personal front-end web developer portfolio!",
  icons: "/favicon.ico",
  creator: "Zedysh",
  keywords: [
    "zedysh",
    "portfolio",
    "developer",
    "developer portfolio",
    "frontend developer",
    "demetre turabelidze",
    "demetre",
  ],
  openGraph: {
    type: "website",
    url: "https://zedysh.com",
    title: "Zedysh Portfolio",
    description: "Check out my personal developer portfolio!",
    images: [
      {
        url: "https://zedysh.com/your-image.jpg",
        width: 1200,
        height: 630,
        alt: "Developer portfolio",
      },
    ],
  },
  twitter: {
    site: "https://twitter.com/zedysh",
    creator: "@zedysh",
    description: "Zedysh Personal Portfolio Website",
    title: "ZEDYSH PORTFOLIO",
    images: "https://zedysh.com/large-logo.jpg",
  },
};
