import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import style from "./Projects.module.scss";
import { allTags } from "@/app/lib/tags";
import { useState } from "react";
import { TTag } from "@/app/lib/types";
import { projects } from "@/app/lib/projects";

export default function Projects() {
  const [filter, setFilter] = useState<TTag | "">("");
  const filteredProjects = filter ? projects.filter((p) => p.tags.includes(filter)) : projects;

  return (
    <div className={style.projects}>
      <p>Projects</p>

      <div className={style.filterBar}>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={filter === tag ? style.activeFilter : ""}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
        <button onClick={() => setFilter("")}>All</button>
      </div>

      <div className={style.projectsGrid}>
        {filteredProjects.map((project) => (
          <div key={project.title} className={style.projectCard}>
            <Image
              src={project.image}
              alt={project.title}
              className={style.projectImage}
              width={400}
              height={300}
            />

            <h3 className={style.projectTitle}>{project.title}</h3>
            <p className={style.projectDescription}>{project.description}</p>

            <div className={style.tagsRow}>
              <div className={style.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={style.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={style.linkOut}
                title={`Visit ${project.title}`}
              >
                Visit <FontAwesomeIcon icon={faExternalLink} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
