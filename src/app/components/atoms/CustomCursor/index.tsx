// Cursor.js

import React, { useState, useEffect } from "react";
import style from "./CustomCursor.module.scss";
import classNames from "classnames";

const Cursor = () => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ left: e.pageX, top: e.pageY });

      const distanceFromEdges = 2;
      const isNearTop = e.pageY < distanceFromEdges;
      const isNearBottom = e.pageY > window.innerHeight - distanceFromEdges;
      const isNearLeft = e.pageX < distanceFromEdges;
      const isNearRight = e.pageX > window.innerWidth - distanceFromEdges;

      setIsVisible(!(isNearTop || isNearBottom || isNearLeft || isNearRight));

      const isHoveringTextElement =
        e.target instanceof HTMLElement && e.target.classList.contains("cursor-hover-effect");
      setIsHoveringText(isHoveringTextElement);
    };

    document.addEventListener("mousemove", handleMouseMove);

    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={style.container}>
      <div
        className={classNames(
          style.cursor,
          !isVisible ? style.hidden : "",
          isHoveringText ? style.hoveringText : ""
        )}
        style={{ left: position.left + "px", top: position.top + "px" }}
      />
    </div>
  );
};

export default Cursor;
