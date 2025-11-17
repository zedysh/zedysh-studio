import style from "./Labels.module.scss";
import { musicLabels } from "@/app/lib/labels";
import Title from "../../atoms/Title";

export default function Labels() {
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
