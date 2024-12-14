import React, { useEffect } from "react";
import styles from "./GifAnimation.module.css";

const GifAnimation: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.gifContainer}>
      <div
        className="tenor-gif-embed"
        data-postid="20667355"
        data-share-method="host"
        data-aspect-ratio="0.621875"
        data-width="100%"
      >
        <a href="https://tenor.com/view/peabody-playing-guitar-mr-mr-peabody-gif-20667355">
          Peabody Playing GIF
        </a>
      </div>
    </div>
  );
};

export default GifAnimation;
