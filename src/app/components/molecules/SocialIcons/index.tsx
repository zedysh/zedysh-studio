import { socialLinks } from "@/app/lib/socials";
import SocialMediaButton from "../../atoms/SocialMediaButton";
import style from "./SocialIcons.module.scss";
import classNames from "classnames";

const SocialIcons = () => (
  <div className={classNames(style.container)}>
    {socialLinks.map((socialLinks, i) => (
      <SocialMediaButton type={socialLinks.type} link={socialLinks.link} key={i} />
    ))}
  </div>
);

export default SocialIcons;
