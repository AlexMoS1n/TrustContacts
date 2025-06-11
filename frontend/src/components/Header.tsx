import { type FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import styles from "../styles/Header.module.scss";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.user.isAuth);

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    toast.success('Вы вышли из системы');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Главная
        </Link>
        <nav className={styles.nav}>
          {isAuth ? (
            <>
              <Link to="/" className={styles.link}>
                Главная
              </Link>
              <Link to="/contacts" className={styles.link}>
                Мои контакты
              </Link>
              <button onClick={logoutHandler} className={styles.button}>
                <FaSignOutAlt />
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className={styles.button}>
                <FaSignInAlt />
                Войти/Зарегистрироваться
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
