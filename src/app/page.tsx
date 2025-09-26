"use client";

import styles from "./page.module.scss";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Image from "next/image";

type TTag =
  | "Full-stack"
  | "Interior"
  | "Exterior"
  | "Three.js"
  | "Blender"
  | "3D"
  | "User Generated Content"
  | "Front-end"
  | "Other";

// all tags should be calculated from all TTag values, not repeated in array like this here.
const allTags: TTag[] = [
  "Full-stack",
  "Interior",
  "Exterior",
  "Three.js",
  "Blender",
  "3D",
  "User Generated Content",
  "Other",
];

const projects: {
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
    tags: ["Full-stack", "Three.js", "3D"],
    link: "https://dmi.umgapps.com/eltonjohn/pinball",
  },
  {
    title: "Imagine Dragons - 'Loom' Campaign",
    image: "/projects/2.jpg",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tags: ["Full-stack", "Three.js", "3D"],
    link: "https://enter.imaginedragonsmusic.com/",
  },
  {
    title: "Ella Fitzgerald's Room - Re-created in 3D",
    image: "/projects/3.jpg",
    description:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: ["Front-end", "Three.js", "3D"],
    link: "https://dmi.umgapps.com/ellafitzgerald",
  },
  {
    title: "NMIXX - 3D Spaceship",
    image: "/projects/4.jpg",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tags: ["Full-stack", "Three.js", "3D"],
  },
  {
    title: "VCHA - 3D Fan Letters Globe",
    image: "/projects/5.jpg",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["Full-stack", "User Generated Content"],
    link: "https://umusic.glitch.ge/vcha/map",
  },
  {
    title: "Project 6",
    image: "/projects/6.jpg",
    description:
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo.",
    tags: ["Exterior"],
  },
  {
    title: "Project 7",
    image: "/projects/7.jpg",
    description:
      "Suspendisse potenti. Etiam cursus leo vel metus. Nulla facilisi. Aenean nec eros.",
    tags: ["Other"],
  },
  {
    title: "Project 8",
    image: "/projects/8.jpg",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
    tags: ["Full-stack", "Interior"],
  },
  {
    title: "Project 9",
    image: "/projects/9.jpg",
    description:
      "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam.",
    tags: ["Three.js", "Exterior"],
  },
];

const musicLabels = [
  {
    title: "Universal Music Group",
    image: "/labels/umg.png",
  },
  {
    title: "Sony Music Entertainment Germany",
    image: "/labels/sony.png",
  },
  {
    title: "Def Jam Recordings",
    image: "/labels/defjam.png",
  },
  {
    title: "Interscope Records",
    image: "/labels/interscope.png",
  },
  {
    title: "Verve Records",
    image: "/labels/verve.png",
  },
];

import StackIcon from "tech-stack-icons";

const techStack = [
  {
    title: "React",
    icon: <StackIcon name="react" />,
  },
  {
    title: "Three.js",
    icon: <StackIcon name="threejs" />,
  },
  {
    title: "Blender",
    icon: <img src="/icons/blender.svg" alt="Blender" />,
  },
  {
    title: "Unity",
    icon: <img src="/icons/unity.svg" alt="Unity" />,
  },
  {
    title: "TypeScript",
    icon: <StackIcon name="typescript" />,
  },
  {
    title: "Next.js",
    icon: <StackIcon name="nextjs2" />,
  },
  {
    title: "Figma",
    icon: <StackIcon name="figma" />,
  },
  {
    title: "AWS",
    icon: <StackIcon name="aws" />,
  },
  {
    title: "Photoshop",
    icon: <StackIcon name="ps" />,
  },
  {
    title: "Illustrator",
    icon: <StackIcon name="ai" />,
  },
  {
    title: "Firebase",
    icon: <StackIcon name="firebase" />,
  },
  {
    title: "MongoDB",
    icon: <StackIcon name="mongodb" />,
  },

  {
    title: "HTML",
    icon: <StackIcon name="html5" />,
  },
  {
    title: "CSS",
    icon: <StackIcon name="css3" />,
  },
  {
    title: "SCSS",
    icon: <StackIcon name="sass" />,
  },
  {
    title: "Tailwind CSS",
    icon: <StackIcon name="tailwindcss" />,
  },
  {
    title: "Vue.js",
    icon: <StackIcon name="vuejs" />,
  },
  {
    title: "Laravel",
    icon: <StackIcon name="laravel" />,
  },
  {
    title: "Express",
    icon: <StackIcon name="expressjs" />,
  },
  {
    title: "Node.js",
    icon: <StackIcon name="nodejs" />,
  },
  {
    title: "MySQL",
    icon: <StackIcon name="mysql" />,
  },
  {
    title: "Vercel",
    icon: <StackIcon name="vercel" />,
  },
  {
    title: "Git",
    icon: <StackIcon name="git" />,
  },
  {
    title: "Jira",
    icon: <StackIcon name="jira" />,
  },
  {
    title: "Postman",
    icon: <StackIcon name="postman" />,
  },
];

import { useState } from "react";
// Helper function to swap letters for leet effect
function toLeet(text: string) {
  return text
    .replace(/A/g, "4")
    .replace(/E/g, "3")
    .replace(/I/g, "1")
    .replace(/O/g, "0")
    .replace(/S/g, "5")
    .replace(/B/g, "8");
}
import Logo from "./components/atoms/Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import Marquee from "react-fast-marquee";

export default function Home() {
  const [filter, setFilter] = useState<TTag | "">("");
  const filteredProjects = filter ? projects.filter((p) => p.tags.includes(filter)) : projects;

  // Hover states for typewriter titles
  const [aboutHover, setAboutHover] = useState(false);
  const [touchHover, setTouchHover] = useState(false);
  const [projectsHover, setProjectsHover] = useState(false);

  return (
    <div className={styles.page}>
      <Logo />

      <Header />

      <section className={styles.aboutUsContainer}>
        <h1
          onMouseEnter={() => setAboutHover(true)}
          onMouseLeave={() => setAboutHover(false)}
          className="cursor-hover-effect"
        >
          {aboutHover ? toLeet("ABOUT US") : "ABOUT US"}
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu
          consectetur, lorem ipsum dolor sit amet.
        </p>
      </section>

      <section className={styles.getInTouchSection}>
        <h2
          onMouseEnter={() => setTouchHover(true)}
          onMouseLeave={() => setTouchHover(false)}
          className="cursor-hover-effect"
        >
          {touchHover ? toLeet("GET IN TOUCH") : "GET IN TOUCH"}
        </h2>
        <a href="mailto:hello@zedysh.com" className={styles.emailButton}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.emailIcon} />
          Email Us
        </a>
      </section>

      {/* Moving labels marquee */}
      <section className={styles.labelsMarqueeSection}>
        <Marquee gradient={false} style={{ background: "#fff", padding: "1.5em 0" }} speed={120}>
          {musicLabels.map((label, idx) => (
            <div key={label.title} className={styles.labelCard}>
              <img src={label.image} alt={label.title} className={styles.labelImage} />
              <small style={{ color: "#222" }} className={styles.labelTitle}>
                {label.title}
              </small>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.section}>
        <h2
          onMouseEnter={() => setProjectsHover(true)}
          onMouseLeave={() => setProjectsHover(false)}
          className="cursor-hover-effect"
        >
          {projectsHover ? toLeet("PROJECTS") : "PROJECTS"}
        </h2>

        <div className={styles.filterBar}>
          <span>Filter by tag:</span>

          {allTags.map((tag) => (
            <button
              key={tag}
              className={filter === tag ? styles.activeFilter : ""}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
          <button onClick={() => setFilter("")}>All</button>
        </div>

        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div key={project.title} className={styles.projectCard}>
              <Image
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
                width={400}
                height={300}
              />

              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.tagsRow}>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkOut}
                    title={`Visit ${project.title}`}
                  >
                    <FontAwesomeIcon icon={faExternalLink} /> Visit
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.labelsContainer}>
        <div className={styles.labelsGrid}>
          {techStack.map((tech) => (
            <div key={tech.title} className={styles.labelCard}>
              <div className={styles.labelImage}>{tech.icon}</div>
              <small style={{ color: "#222" }} className={styles.labelTitle}>
                {tech.title}
              </small>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
