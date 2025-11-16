export type TTag = "3D" | "User Generated Content" | "Other";

export interface ILabel {
  title: string;
  image: string;
}

export type TSocialIcon =
  | "linkedin"
  | "github"
  | "behance"
  | "dribbble"
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube"
  | "spotify"
  | "weibo"
  | "appleMusic"
  | "soundCloud"
  | "website"
  | "tiktok"
  | "amazonMusic"
  | "twitch"
  | "discord"
  | "email";

export interface ISocialLinks {
  type: TSocialIcon;
  link: string;
}
