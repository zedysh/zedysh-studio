import type { Metadata } from "next";
import "./globals.scss";

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
      <body>{children}</body>
    </html>
  );
}
