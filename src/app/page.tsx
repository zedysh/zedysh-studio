"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { musicLabels } from "./lib/labels";
import Footer from "./components/organisms/Footer";
import Logo from "./components/atoms/Logo";
import Marquee from "react-fast-marquee";
import style from "./page.module.scss";
import Projects from "./components/organisms/Projects";

export default function Landing() {
  return (
    <div className={style.page}>
      <section className={style.labelsMarqueeSection}>
        <Marquee
          gradient={false}
          style={{ background: "var(--foreground)", padding: "1em 0" }}
          speed={120}
        >
          {musicLabels.map((label) => (
            <div key={label.title} className={style.labelCard}>
              <img src={label.image} alt={label.title} className={style.labelImage} />
              {/* <small className={style.labelTitle}>{label.title}</small> */}
            </div>
          ))}
        </Marquee>
      </section>

      <div className={style.header}>
        <Logo />

        <div className={style.headerRight}>
          <p>
            We make interactive 3D web experiences, web games and applications for music industry.
          </p>

          <a href="mailto:zedysh.studio@gmail.com" className={style.emailButton}>
            <FontAwesomeIcon icon={faEnvelope} className={style.emailIcon} />
            Email Us
          </a>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "0.05em",
          background: "var(--foreground)",
        }}
      />

      <Projects />

      <Footer />

      <div className={style.overlay} />
    </div>
  );
}
