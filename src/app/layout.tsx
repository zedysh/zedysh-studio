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
