"use client";

import Footer from "./components/organisms/Footer";
import Logo from "./components/atoms/Logo";
import style from "./page.module.scss";

import SocialIcons from "./components/molecules/SocialIcons";
import LabelsAndArtists from "./components/molecules/LabelsAndArtists";
import { useEffect } from "react";
import { animateLogo } from "./lib/animateLogo";
import logMadeByZedysh from "./lib/logMadeByZedysh";
import Stats from "./components/atoms/Stats";
import SpiderAbyss from "./components/atoms/SpiderAbyss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

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

      <SpiderAbyss />

      <div className={style.content}>
        <div className={style.headerContent}>
          <Logo />

          <button
            onClick={() => window.open("mailto:studio@zedysh.com", "_blank")}
            className={`${style.glowOnHover} cursor-hover-effect`}
          >
            <FontAwesomeIcon icon={faEnvelope} className={style.emailIcon} />
            <span>GET IN TOUCH</span>
          </button>
        </div>

        <div className={style.footer}>
          <p className={style.mobileTitle}>
            We create interactive web experiences, games and websites for music industry
          </p>

          <Stats />

          <SocialIcons />
        </div>
      </div>

      <LabelsAndArtists />

      {/* <Projects /> */}

      <Footer />
    </div>
  );
}
