import React, { useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import GifAnimation from "../../components/GifAnimation/GifAnimation";

const UserPage: React.FC = () => {
  const [isGifVisible, setIsGifVisible] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMenuClick = () => {
    setIsGifVisible(false);
  };
  return (
    <div className={styles.userPageContainer}>
      <h1 className={styles.userPageTitle}>Student Dashboard</h1>
      <div className={styles.linkSection}>
        <NavLink
          to="documents"
          className={({ isActive }) =>
            isActive
              ? `${styles.userLink} ${styles.activeUserLink}`
              : styles.userLink
          }
          onClick={handleMenuClick}
        >
          My Documents & Notes
        </NavLink>
        <NavLink
          to="chat"
          className={({ isActive }) =>
            isActive
              ? `${styles.userLink} ${styles.activeUserLink}`
              : styles.userLink
          }
          onClick={handleMenuClick}
        >
          Chat with Teacher
        </NavLink>
      </div>

      <div className={styles.outletSection}>
        {isGifVisible && <GifAnimation />}
        <div className={styles.outletSection}></div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
