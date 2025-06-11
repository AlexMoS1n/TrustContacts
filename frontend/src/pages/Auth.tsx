import { useState, type FC } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "../styles/Auth.module.scss";

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      
      const data = isLogin 
        ? await AuthService.login({ email, password })
        : await AuthService.registration({ email, password });

      if (data) {
        if (isLogin) {
          setTokenToLocalStorage('token', data.token);
          dispatch(login(data));
          toast.success('Вы успешно вошли в систему');
          navigate('/');
        } else {
          toast.success('Регистрация прошла успешно');
          setIsLogin(true);
        }
      }
    } catch (err: any) {
        console.error('Auth error:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Неизвестная ошибка';
        toast.error(errorMessage);
      } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          {isLogin ? (
            <>
              <FaSignInAlt className={styles.authIcon} />
              <h2>Вход в систему</h2>
              <p>Пожалуйста, войдите в свой аккаунт</p>
            </>
          ) : (
            <>
              <FaUserPlus className={styles.authIcon} />
              <h2>Регистрация</h2>
              <p>Создайте новый аккаунт</p>
            </>
          )}
        </div>

        <form onSubmit={authHandler} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.formInput}
              autoComplete="username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={styles.formInput}
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!isLogin && (
              <p className={styles.passwordHint}>Пароль должен содержать минимум 6 символов</p>
            )}
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                <FaArrowRight className={styles.buttonIcon} />
              </>
            )}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            {isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className={styles.toggleButton}
            >
              {isLogin ? ' Зарегистрироваться' : ' Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
