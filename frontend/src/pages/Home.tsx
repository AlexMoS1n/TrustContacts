import type { FC } from "react";
import { useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { FaAddressBook, FaUserPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home: FC = () => {
  useEffect(() => {
    document.title = "Главная | Контакты";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Добро пожаловать в Контакты</h1>
        <p className={styles.subtitle}>Удобное управление вашими контактами</p>
        
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <FaAddressBook className={styles.featureIcon} />
            <h3>Все контакты</h3>
            <p>Храните все контакты в одном месте</p>
          </div>
          
          <div className={styles.featureCard}>
            <FaUserPlus className={styles.featureIcon} />
            <h3>Добавление</h3>
            <p>Быстрое создание новых контактов</p>
          </div>
          
          <div className={styles.featureCard}>
            <FaSearch className={styles.featureIcon} />
            <h3>Поиск</h3>
            <p>Мгновенный поиск по всем полям</p>
          </div>
        </div>
      </div>
      
      <div className={styles.cta}>
        <p>Начните прямо сейчас - это бесплатно!</p>
        <Link to={useAuth()?'/contacts':'/auth'} className={styles.ctaButton}>Попробовать</Link>
      </div>
    </div>
  );
};

export default Home;
