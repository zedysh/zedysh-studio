"use client";
"use client";
import styles from "./page.module.scss";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";

const projects = [
  {
    title: "Project 1",
    image: "/projects/1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    tags: ["Full-stack", "Three.js"],
    link: "https://project1.com",
  },
  {
    title: "Project 2",
    image: "/projects/2.jpg",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tags: ["Interior"],
    link: "https://project2.com",
  },
  {
    title: "Project 3",
    image: "/projects/3.jpg",
    description:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: ["Exterior", "Other"],
    link: "https://project3.com",
  },
  {
    title: "Project 4",
    image: "/projects/4.jpg",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tags: ["Full-stack"],
  },
  {
    title: "Project 5",
    image: "/projects/5.jpg",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["Interior", "Three.js"],
    link: "https://project5.com",
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

const allTags = ["Full-stack", "Interior", "Exterior", "Three.js", "Other"];

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

import { useEffect, useState } from "react";
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
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Marquee from "react-fast-marquee";

export default function Home() {
  const [filter, setFilter] = useState<string>("");
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
        <Marquee gradient={false} style={{ background: "#fff", padding: "1.5em 0" }} speed={60}>
          {musicLabels.map((label, idx) => (
            <div key={label.title} className={styles.labelCard}>
              <img src={label.image} alt={label.title} className={styles.labelImage} />
              <small style={{ color: "#222" }}>{label.title}</small>
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
          {filteredProjects.map((project, idx) => (
            <div key={idx} className={styles.projectCard}>
              <img src={project.image} alt={project.title} className={styles.projectImage} />

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
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
