// import React from "react";
// import styles from "./AdminPage.module.css";
// import { Outlet } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import Chat from "../../components/Chat/Chat";
// import ChatHistory from "../../components/Chat/ChatHistory";

// const AdminPage: React.FC = () => {
//   return (
//     <div className={styles.adminPageContainer}>
//       <h1 className={styles.adminPageTitle}>Admin Dashboard</h1>
//       <div className={styles.linkSection}>
//         <NavLink
//           to="users"
//           className={({ isActive }) =>
//             isActive
//               ? `${styles.adminLink} ${styles.activeAdminLink}`
//               : styles.adminLink
//           }
//         >
//           Manage Students
//         </NavLink>
//         <NavLink
//           to="bookings"
//           className={({ isActive }) =>
//             isActive
//               ? `${styles.adminLink} ${styles.activeAdminLink}`
//               : styles.adminLink
//           }
//         >
//           Manage Bookings
//         </NavLink>
//         <NavLink
//           to="documents"
//           className={({ isActive }) =>
//             isActive
//               ? `${styles.adminLink} ${styles.activeAdminLink}`
//               : styles.adminLink
//           }
//         >
//           Manage Documents
//         </NavLink>
//       </div>
//       <div className={styles.outletSection}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

import React from "react";
import styles from "./AdminPage.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import ChatHistory from "../../components/Chat/ChatHistory";

const AdminPage: React.FC = () => {
  return (
    <div className={styles.adminPageContainer}>
      <h1 className={styles.adminPageTitle}>Admin Dashboard</h1>

      {/* Навигационные ссылки */}
      <div className={styles.linkSection}>
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive
              ? `${styles.adminLink} ${styles.activeAdminLink}`
              : styles.adminLink
          }
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
        >
          Manage Documents
        </NavLink>
      </div>

      {/* Секция чата */}
      <div className={styles.chatSection}>
        <div className={styles.chatContainer}>
          <ChatHistory />
          <Chat />
        </div>
      </div>

      {/* Основная секция для маршрутов */}
      <div className={styles.outletSection}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
