import Image from "next/image";

const ratio = 2.5;
const width = 250;
const height = width / ratio;

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
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
