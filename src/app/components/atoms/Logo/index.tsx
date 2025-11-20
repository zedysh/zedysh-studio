import Image from "next/image";

const ratio = 2.5;
const width = 100;
const height = width / ratio;

export default function Logo() {
  return (
    <Image
      src="/icons/studio-logo.svg"
      alt="Zedysh Studio logo"
      width={width}
      height={height}
      style={{
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
}
