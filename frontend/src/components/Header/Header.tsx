import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.css";
import logo from "../../assets/icons/guitar_lessons_logo_transparent (1).png";
import { FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">
          <img
            src={logo}
            alt="Guitar Lessons Logo"
            className={styles.logoImage}
          />
          <div className="logoText">Lex Ivanenko</div>
        </a>
      </div>
      {/* <Navigation /> */}
      <button className={styles.burger} onClick={toggleNav}>
        <FaBars />
      </button>

      <Navigation isOpen={isNavOpen} toggleNav={toggleNav} />
    </header>
  );
};

export default Header;
