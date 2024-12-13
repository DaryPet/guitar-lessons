// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUsers, fetchCurrentUser } from "../../redux/operations";
// import { AppDispatch, RootState } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import styles from "../FormPage.module.css";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";

// const validationSchema = Yup.object({
//   username: Yup.string().required("Username is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const LoginPage: React.FC = () => {
//   // const [username, setUsername] = useState("");
//   // const [password, setPassword] = useState("");
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const { status, error } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleSubmit = async (values: {
//     username: string;
//     password: string;
//   }) => {
//     try {
//       // Отправляем данные на сервер для логина
//       await dispatch(loginUsers(values)).unwrap();
//       const userResponse = await dispatch(fetchCurrentUser()).unwrap();

//       // Переход в зависимости от роли пользователя
//       if (userResponse.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/user-profile");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error("Login failed. Please check your credentials.");
//     }
//   };
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Login</h2>
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <Form className={styles.form}>
//           <Field
//             type="text"
//             name="username"
//             placeholder="Username"
//             className={styles.input}
//           />
//           <ErrorMessage
//             name="username"
//             component="div"
//             className={styles.error}
//           />

//           <Field
//             type="password"
//             name="password"
//             placeholder="Password"
//             className={styles.input}
//           />
//           <ErrorMessage
//             name="password"
//             component="div"
//             className={styles.error}
//           />

//           <button
//             type="submit"
//             disabled={status === "loading"}
//             className={styles.button}
//           >
//             {status === "loading" ? "Logging in..." : "Login"}
//           </button>
//           {error && <p className={styles.error}>{error}</p>}
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUsers, fetchCurrentUser } from "../../redux/operations";
// import { AppDispatch, RootState } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import styles from "../FormPage.module.css";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";

// const validationSchema = Yup.object({
//   username: Yup.string().required("Username is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const LoginPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { status, error } = useSelector((state: RootState) => state.auth);

//   // useEffect для проверки токена при перезагрузке страницы
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       // Если токен есть, пробуем получить пользователя
//       const fetchUser = async () => {
//         try {
//           const userResponse = await dispatch(fetchCurrentUser()).unwrap();
//           // Сохраняем роль в localStorage (если она не была сохранена при логине)
//           localStorage.setItem("user_role", userResponse.role);

//           // Переход в зависимости от роли
//           if (userResponse.role === "admin") {
//             navigate("/admin");
//           } else {
//             navigate("/user-profile");
//           }
//         } catch (err) {
//           console.error("Error fetching current user:", err);
//           toast.error("Error fetching user data");
//         }
//       };
//       fetchUser();
//     }
//   }, [dispatch, navigate]);

//   const handleSubmit = async (values: {
//     username: string;
//     password: string;
//   }) => {
//     try {
//       // Отправляем данные на сервер для логина
//       const response = await dispatch(loginUsers(values)).unwrap();
//       const userResponse = await dispatch(fetchCurrentUser()).unwrap();

//       // Сохраняем роль в localStorage
//       localStorage.setItem("user_role", userResponse.role);
//       localStorage.setItem("access_token", response.access_token); // сохраняем токен

//       // Переход в зависимости от роли
//       if (userResponse.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/user-profile");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Login</h2>
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <Form className={styles.form}>
//           <Field
//             type="text"
//             name="username"
//             placeholder="Username"
//             className={styles.input}
//           />
//           <ErrorMessage
//             name="username"
//             component="div"
//             className={styles.error}
//           />

//           <Field
//             type="password"
//             name="password"
//             placeholder="Password"
//             className={styles.input}
//           />
//           <ErrorMessage
//             name="password"
//             component="div"
//             className={styles.error}
//           />

//           <button
//             type="submit"
//             disabled={status === "loading"}
//             className={styles.button}
//           >
//             {status === "loading" ? "Logging in..." : "Login"}
//           </button>
//           {error && <p className={styles.error}>{error}</p>}
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUsers, fetchCurrentUser } from "../../redux/operations";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import styles from "../FormPage.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние для загрузки

  const { status, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Проверка токена при загрузке страницы
    const token = localStorage.getItem("access_token");
    if (token) {
      // Если токен есть, сразу проверяем роль
      dispatch(fetchCurrentUser())
        .unwrap()
        .then((userResponse) => {
          if (userResponse.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user-profile");
          }
        })
        .catch(() => {
          setIsLoading(false); // Если не получилось проверить пользователя, устанавливаем isLoading в false
        });
    } else {
      setIsLoading(false); // Если токена нет, сразу устанавливаем isLoading в false
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      // Отправляем данные на сервер для логина
      await dispatch(loginUsers(values)).unwrap();
      const userResponse = await dispatch(fetchCurrentUser()).unwrap();

      // Переход в зависимости от роли пользователя
      if (userResponse.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user-profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  // Если идет проверка токена, не показываем форму логина
  if (isLoading) {
    return <div>Loading...</div>; // Можно добавить спиннер или что-то еще, чтобы скрыть страницу логина
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <Field
            type="text"
            name="username"
            placeholder="Username"
            className={styles.input}
          />
          <ErrorMessage
            name="username"
            component="div"
            className={styles.error}
          />

          <Field
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className={styles.button}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
