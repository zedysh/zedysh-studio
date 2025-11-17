import Marquee from "react-fast-marquee";
import style from "./LabelsMarquee.module.scss";
import { musicLabels } from "@/app/lib/labels";
import Title from "../../atoms/Title";

export default function LabelsMarquee() {
  return (
    <div className={style.container}>
      <Title text="Clients" theme="dark" />

      <div className={style.labels}>
        {musicLabels.map((label, i) => (
          <img src={label.image} alt={label.title} className={style.image} key={i} />
        ))}
      </div>
    </div>
  );
}
