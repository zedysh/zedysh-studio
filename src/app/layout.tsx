import type { Metadata } from "next";
import "./globals.scss";
import CursorLayout from "./components/layouts/CursorLayout/layout";

export const metadata: Metadata = {
  title: "Zedysh Studio",
  // favicon ./logo.svg
  icons: {
    icon: "./logo2.svg",
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
        <CursorLayout>{children}</CursorLayout>
      </body>
    </html>
  );
}
