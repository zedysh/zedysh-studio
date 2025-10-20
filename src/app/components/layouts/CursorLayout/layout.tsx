"use client";

import CustomCursor from "../../atoms/CustomCursor";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
