import React from "react";
import { Link } from "react-router-dom";
import notFound from "../assets/background/notFound_2.webp";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        Go back to main page
      </Link>
      <img src={notFound} alt="Page Not Found" className={styles.image} />
    </div>
  );
};

export default NotFoundPage;
