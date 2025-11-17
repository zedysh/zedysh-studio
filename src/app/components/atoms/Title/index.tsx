import style from "./Title.module.scss";

interface TitleProps {
  text: string;
  theme?: "light" | "dark";
}

export default function Title({ text, theme = "light" }: TitleProps) {
  return <h1 className={`${style.title} ${style[theme]}`}>{text}</h1>;
}
