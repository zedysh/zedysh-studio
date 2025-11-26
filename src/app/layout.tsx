import type { Metadata } from "next";
import "./globals.scss";
import CursorLayout from "./components/layouts/CursorLayout/layout";
import { Suspense } from "react";
import LoadingScreen from "./components/molecules/LoadingScreen";

export const metadata: Metadata = {
  title: "Zedysh Studio",
  icons: {
    icon: "/icons/z-logo.svg",
  },
  description: "Zedysh Studio - Creating Interactive Web Experiences and Games for Music Industry",
  keywords: [
    "Zedysh",
    "Zedysh Studio",
    "Creative Studio",
    "Design Agency",
    "Web Design",
    "Web Development",
    "Digital Agency",
  ],
  openGraph: {
    title: "Zedysh Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zedysh Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zedysh Studio",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<LoadingScreen />}>
          <CursorLayout>{children}</CursorLayout>
        </Suspense>
      </body>
    </html>
  );
}
