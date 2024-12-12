import React, { useEffect } from "react";
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
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { status, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleLogin = async () => {
  //   try {
  //     // console.log("Запуск handleLogin");
  //     await dispatch(loginUsers({ username, password })).unwrap();
  //     const userResponse = await dispatch(fetchCurrentUser()).unwrap();
  //     // console.log("Логин прошел успешно");
  //     if (userResponse.role === "admin") {
  //       navigate("/admin");
  //     } else {
  //       navigate("/user-profile");
  //     }
  //   } catch (err) {
  //     console.error("Ошибка при логине:", err);
  //   }
  // };
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
