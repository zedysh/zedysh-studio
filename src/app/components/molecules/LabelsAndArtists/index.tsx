import style from "./LabelsAndArtists.module.scss";
import { musicLabels } from "@/app/lib/labels";
import { artistsList } from "@/app/lib/artistsList";
import Title from "../../atoms/Title";
import Marquee from "react-fast-marquee";

export default function Labels() {
  return (
    <div className={style.container}>
      <Title text="Clients" theme="dark" />

      <Marquee gradient={false} speed={100} className={style.marquee}>
        {musicLabels.map((label, i) => (
          <img src={label.image} alt={label.title} className={style.image} key={i} />
        ))}
      </Marquee>

      <Title text="Artists" theme="dark" />

      <div className={style.artists}>
        {artistsList.map((artist, i) => (
          <span key={i}>{artist.name}</span>
        ))}
      </div>
    </div>
  );
}
