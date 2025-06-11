import type { FC } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ErrorPage.module.scss";

const ErrorPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Страница не найдена</p>
      <Link className={styles.link} to={'/'}>На главную страницу</Link>
    </div>
  )
}

export default ErrorPage