"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/organisms/Footer";
import Logo from "./components/atoms/Logo";
import style from "./page.module.scss";
import Projects from "./components/organisms/Projects";
import SocialIcons from "./components/molecules/SocialIcons";
import ThreeJSCanvas from "./components/ThreeJSCanvas";
import Image from "next/image";
import LabelsMarquee from "./components/molecules/LabelsMarquee";

export default function Landing() {
  return (
    <div className={style.page}>
      <LabelsMarquee />

      <div className={style.header}>
        <div className={style.logoContainer}>
          <Logo />

          <h1 className={style.logoText}>ZEDYSH STUDIO</h1>
        </div>

        <div className={style.headerRight}>
          <h3>Digital Studio | Music Fan Engagement & Audience Development</h3>

          <p>Worked for 30+ of artists across major & independent labels</p>

          <a
            href="mailto:zedysh.studio@gmail.com"
            className={`${style.emailButton} cursor-hover-effect`}
          >
            <FontAwesomeIcon icon={faEnvelope} className={style.emailIcon} />
            Email Us
          </a>
        </div>
      </div>

      <ThreeJSCanvas />

      <div className={style.socials}>
        <SocialIcons />
      </div>

      <div
        style={{
          width: "100vw",
          height: "0.025em",
          background: "#ffffff40",
        }}
      />

      <Projects />

      <Image
        src="/overlay.jpg"
        alt="Overlay"
        layout="fill"
        objectFit="cover"
        className={style.overlayImage}
      />

      <Footer />
    </div>
  );
}
