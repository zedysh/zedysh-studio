"use client";

import CustomCursor from "../../atoms/CustomCursor";

export default function CursorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
