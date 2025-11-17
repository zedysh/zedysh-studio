import style from "./Artists.module.scss";
import Title from "../../atoms/Title";

export default function Artists() {
  return (
    <div className={style.container}>
      <Title text="Clients" theme="dark" />

      <div className={style.artists}></div>
    </div>
  );
}
