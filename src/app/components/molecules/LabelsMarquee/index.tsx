import Marquee from "react-fast-marquee";
import style from "./LabelsMarquee.module.scss";
import { musicLabels } from "@/app/lib/labels";
import Image from "next/image";

export default function LabelsMarquee() {
  return (
    <Marquee gradient={false} className={style.marquee} speed={120}>
      {musicLabels.map((label) => (
        <div key={label.title} className={style.card}>
          <Image
            src={label.image}
            alt={label.title}
            className={style.image}
            height={100}
            width={100}
          />
        </div>
      ))}
    </Marquee>
  );
}
