"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/organisms/Footer";
import Logo from "./components/atoms/Logo";
import style from "./page.module.scss";
import Projects from "./components/organisms/Projects";
import SocialIcons from "./components/molecules/SocialIcons";
import LabelsMarquee from "./components/molecules/LabelsMarquee";
import { useEffect } from "react";
import { animateLogo } from "./lib/animateLogo";

export default function Landing() {
  useEffect(() => {
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
            Email Us
          </a>
        </div>

        <div className={style.footer}>
          {/* <small>
            Music Fan Engagement
            <br />
            & Audience Development
            <br />
            Digital Studio
          </small>` */}
          <p className={style.logoText}>Zedysh Studio</p>
          <SocialIcons />
        </div>
      </div>

      <LabelsMarquee />

      <Projects />

      <Footer />
    </div>
  );
}
