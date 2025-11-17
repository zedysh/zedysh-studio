"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/organisms/Footer";
import Logo from "./components/atoms/Logo";
import style from "./page.module.scss";
import Projects from "./components/organisms/Projects";
import SocialIcons from "./components/molecules/SocialIcons";
import LabelsAndArtists from "./components/molecules/LabelsAndArtists";
import { useEffect } from "react";
import { animateLogo } from "./lib/animateLogo";
import logMadeByZedysh from "./lib/logMadeByZedysh";

export default function Landing() {
  useEffect(() => {
    logMadeByZedysh();

    const dispose = animateLogo();
    return () => {
      if (typeof dispose === "function") dispose();
    };
  }, []);

  return (
    <div className={style.page}>
      <canvas id="threejs" className={style.threejsCanvas} />

      <div id="landing-content" className={style.content}>
        <div className={style.headerContent}>
          <Logo />

          <a href="mailto:studio@zedysh.com" className={`${style.emailButton} cursor-hover-effect`}>
            <FontAwesomeIcon icon={faEnvelope} className={style.emailIcon} />
            Project in Mind?
          </a>
        </div>

        <div className={style.footer}>
          <p className={style.logoText}>Zedysh Studio</p>

          <p className={style.description}>
            We create interactive web experiences, websites and games.
          </p>

          <SocialIcons />
        </div>
      </div>

      <LabelsAndArtists />

      <Projects />

      <Footer />
    </div>
  );
}
