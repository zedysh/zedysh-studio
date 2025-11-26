"use client";

import Footer from "./components/organisms/Footer";
import Logo from "./components/atoms/Logo";
import style from "./page.module.scss";

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
            GET IN TOUCH
          </a>
        </div>

        <div className={style.footer}>
          <div className={style.stats}>
            <div className={style.stat}>
              <h3>[ 11 ]</h3>
              <p>Labels</p>
            </div>

            <div className={style.stat}>
              <h3>[ 58 ]</h3>
              <p>Artists</p>
            </div>

            <div className={style.stat}>
              <h3>[ 126 ]</h3>
              <p>Projects</p>
            </div>

            <div className={style.stat}>
              <h3>[ 8+ ]</h3>
              <p>Years</p>
            </div>
          </div>

          <SocialIcons />
        </div>
      </div>

      <LabelsAndArtists />

      {/* <Projects /> */}

      <Footer />
    </div>
  );
}
