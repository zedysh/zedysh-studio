import { socialLinks } from "@/app/lib/socials";
import SocialMediaButton from "../../atoms/SocialMediaButton";
import style from "./SocialIcons.module.scss";
import classNames from "classnames";

interface Props {
  usage: "layout" | "footer";
}

const SocialIcons = ({ usage }: Props) => (
  <div
    className={classNames(
      usage === "footer" && style.horizontallyAlignedForFooter,
      usage === "layout" && style.verticallyAlignedForLayout
    )}
  >
    {socialLinks.map((socialLinks, i) => (
      <SocialMediaButton type={socialLinks.type} link={socialLinks.link} key={i} />
    ))}
  </div>
);

export default SocialIcons;
