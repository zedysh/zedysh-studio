import { TTag } from "./types";

export const projects: {
  title: string;
  image: string;
  description: string;
  tags: TTag[];
  link?: string;
}[] = [
  {
    title: "Elton John's Pinball Game",
    image: "/projects/1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    tags: ["3D"],
    link: "https://dmi.umgapps.com/eltonjohn/pinball",
  },
  {
    title: "Imagine Dragons - 'Loom' Campaign",
    image: "/projects/2.jpg",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tags: ["3D"],
    link: "https://enter.imaginedragonsmusic.com/",
  },
  {
    title: "Ella Fitzgerald's Room - Re-created in 3D",
    image: "/projects/3.jpg",
    description:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: ["3D"],
    link: "https://dmi.umgapps.com/ellafitzgerald",
  },
  {
    title: "NMIXX - 3D Spaceship",
    image: "/projects/4.jpg",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tags: ["3D"],
  },
  {
    title: "VCHA - 3D Fan Letters Globe",
    image: "/projects/5.jpg",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["User Generated Content", "3D"],
    link: "https://umusic.glitch.ge/vcha/map",
  },
];
