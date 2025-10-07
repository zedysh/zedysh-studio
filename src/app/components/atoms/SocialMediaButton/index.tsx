"use client";

import {
  faLinkedin,
  faGithub,
  faDribbble,
  faInstagram,
  faXTwitter,
  faYoutube,
  faSoundcloud,
  faTiktok,
  faAmazon,
  faTwitch,
  faDiscord,
  faSpotify,
  faFacebook,
  faSquareBehance,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./SocialMediaButton.module.scss";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { TSocialIcon } from "../../../lib/types";
import classNames from "classnames";

export interface Props {
  type: TSocialIcon;
  link?: string;
  className?: string;
  iconClassName?: string;
}

const SocialLinkButton = ({ type, className = "", iconClassName = "", link }: Props) => {
  function getIcon() {
    switch (type) {
      case "linkedin":
        return faLinkedin;
      case "github":
        return faGithub;
      case "behance":
        return faSquareBehance;
      case "dribbble":
        return faDribbble;
      case "facebook":
        return faFacebook;
      case "twitter":
        return faXTwitter;
      case "instagram":
        return faInstagram;
      case "twitch":
        return faTwitch;
      case "discord":
        return faDiscord;
      case "youtube":
        return faYoutube;
      case "website":
        return faLink;
      case "soundCloud":
        return faSoundcloud;
      case "tiktok":
        return faTiktok;
      case "amazonMusic":
        return faAmazon;
      case "spotify":
        return faSpotify;
      default:
        return faLink;
    }
  }

  return (
    <a
      className={classNames(className, style.container, "cursor-hover-effect")}
      href={link}
      target="_blank"
      aria-label={type}
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        className={iconClassName || style.icon}
        icon={getIcon() as import("@fortawesome/fontawesome-svg-core").IconProp}
      />
    </a>
  );
};

export default SocialLinkButton;
