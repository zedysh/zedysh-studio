import type { Metadata } from "next";
import "./globals.scss";

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
      <body>{children}</body>
    </html>
  );
}
