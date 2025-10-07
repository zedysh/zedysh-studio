import Image from "next/image";
import style from "./Logo.module.scss";

const ratio = 2.5;
const width = 300;
const height = width / ratio;

export default function Logo() {
  return (
    <div className={style.logoWrapper}>
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
    </div>
  );
}
