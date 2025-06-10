import { useState, type FC } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({ email, password });
      if(data) {
        setTokenToLocalStorage('token', data.token);
        dispatch(login(data));
        toast.success('Вы вошли в аккаунт');
        navigate('/');
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  }

  const registrationHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({ email, password });
      if(data) {
        toast.success('Аккаунт создан');
        setIsLogin(!isLogin);
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  }

  return (
    <div>
      <h1>
        {isLogin ? 'Войти' : 'Зарегистрироваться'}
      </h1>
      <form onSubmit={isLogin ? loginHandler : registrationHandler}>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button> Отправить </button>
      </form>
      <div>
        {
          isLogin ? (
            <button onClick={() => setIsLogin(!isLogin)}>
              У вас нет аккаунта?
            </button>
          ) : (
            <button onClick={() => setIsLogin(!isLogin)}>
              У вас уже есть аккаунта?
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Auth