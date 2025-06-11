import type { FC, JSX } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/ProtectedRoute.module.scss";
import { FaLock, FaSignInAlt } from "react-icons/fa";

interface IPropsProtectedRoute {
  children: JSX.Element;
}

const ProtectedRoute: FC<IPropsProtectedRoute> = ({ children }) => {
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      document.title = "Требуется авторизация";
    }
  }, [isAuth]);

  if (isAuth) {
    return children;
  }

  return (
    <div className={styles.container}>
      <div className={styles.authMessage}>
        <FaLock className={styles.icon} />
        <h1 className={styles.title}>Доступ ограничен</h1>
        <p className={styles.description}>
          Эта страница доступна только для авторизованных пользователей
        </p>
        <button 
          className={styles.loginButton}
          onClick={() => navigate("/auth")}
        >
          <FaSignInAlt className={styles.buttonIcon} />
          Войти в систему
        </button>
      </div>
    </div>
  );
};

export default ProtectedRoute;
