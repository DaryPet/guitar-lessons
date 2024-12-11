import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import GifAnimation from "../../components/GifAnimation/GifAnimation";

const AdminPage: React.FC = () => {
  const [isGifVisible, setIsGifVisible] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleMenuClick = () => {
    setIsGifVisible(false);
  };

  return (
    <div className={styles.adminPageContainer}>
      <h1 className={styles.adminPageTitle}>Admin Dashboard</h1>
      <div className={styles.linkSection}>
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive
              ? `${styles.adminLink} ${styles.activeAdminLink}`
              : styles.adminLink
          }
          onClick={handleMenuClick}
        >
          Manage Students
        </NavLink>
        <NavLink
          to="bookings"
          className={({ isActive }) =>
            isActive
              ? `${styles.adminLink} ${styles.activeAdminLink}`
              : styles.adminLink
          }
          onClick={handleMenuClick}
        >
          Manage Bookings
        </NavLink>
        <NavLink
          to="documents"
          className={({ isActive }) =>
            isActive
              ? `${styles.adminLink} ${styles.activeAdminLink}`
              : styles.adminLink
          }
          onClick={handleMenuClick}
        >
          Manage Documents
        </NavLink>
        <NavLink
          to="chat"
          className={({ isActive }) =>
            isActive
              ? `${styles.adminLink} ${styles.activeAdminLink}`
              : styles.adminLink
          }
          onClick={handleMenuClick}
        >
          Admin Chat
        </NavLink>
      </div>
      {isGifVisible && <GifAnimation />}
      <div className={styles.outletSection}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
