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
        <Marquee gradient={false} style={{ background: "#fff", padding: "1.5em 0" }} speed={120}>
          {musicLabels.map((label, idx) => (
            <div key={label.title} className={style.labelCard}>
              <img src={label.image} alt={label.title} className={style.labelImage} />
              <small className={style.labelTitle}>{label.title}</small>
            </div>
          ))}
        </Marquee>
      </section>

      <Logo />

      <section className={style.aboutUsContainer}>
        <p>
          We make interactive 3D web experiences, web games and applications for music industry.
        </p>
      </section>

      <section className={style.getInTouchSection}>
        <a href="mailto:hello@zedysh.com" className={style.emailButton}>
          <FontAwesomeIcon icon={faEnvelope} className={style.emailIcon} />
          Email Us
        </a>
      </section>

      <Projects />

      <Footer />
    </div>
  );
}
