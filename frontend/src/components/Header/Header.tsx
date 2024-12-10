import React from "react";
import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.css";
import logo from "../../assets/icons/guitar_lessons_logo_transparent (1).png";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">
          <img
            src={logo}
            alt="Guitar Lessons Logo"
            className={styles.logoImage}
          />
          Lex Ivanenko
        </a>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
