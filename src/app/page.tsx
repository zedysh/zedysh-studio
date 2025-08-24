"use client";
"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";

const projects = [
  {
    title: "Project 1",
    image: "/projects/1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    tags: ["full-stack", "three.js"],
  },
  {
    title: "Project 2",
    image: "/projects/2.jpg",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tags: ["interior"],
  },
  {
    title: "Project 3",
    image: "/projects/3.jpg",
    description:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: ["exterior", "other"],
  },
  {
    title: "Project 4",
    image: "/projects/4.jpg",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tags: ["full-stack"],
  },
  {
    title: "Project 5",
    image: "/projects/5.jpg",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ["interior", "three.js"],
  },
  {
    title: "Project 6",
    image: "/projects/6.jpg",
    description:
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo.",
    tags: ["exterior"],
  },
  {
    title: "Project 7",
    image: "/projects/7.jpg",
    description:
      "Suspendisse potenti. Etiam cursus leo vel metus. Nulla facilisi. Aenean nec eros.",
    tags: ["other"],
  },
  {
    title: "Project 8",
    image: "/projects/8.jpg",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
    tags: ["full-stack", "interior"],
  },
  {
    title: "Project 9",
    image: "/projects/9.jpg",
    description:
      "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam.",
    tags: ["three.js", "exterior"],
  },
];

const allTags = ["full-stack", "interior", "exterior", "three.js", "other"];

import { useState } from "react";
import Logo from "./components/atoms/Logo";

export default function Home() {
  const [filter, setFilter] = useState<string>("");
  const filteredProjects = filter ? projects.filter((p) => p.tags.includes(filter)) : projects;

  return (
    <div className={styles.page}>
      <Logo />
      <Header />

      <section className={styles.aboutUsContainer}>
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu
          consectetur, lorem ipsum dolor sit amet.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.section}>
        <h2>Projects</h2>

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

              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Request Services Section */}
      <section id="request-services" className={styles.section}>
        <h2>Request Services</h2>
        <form className={styles.requestForm}>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Number (optional)
            <input type="tel" name="number" />
          </label>
          <label>
            What you got in mind
            <textarea name="idea" rows={4} />
          </label>
          <button type="submit" disabled>
            Submit
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
