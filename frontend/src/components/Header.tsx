import type { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBtc, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    toast.success('Вы вышли из аккаунта');
    navigate('/');
  }

  return (
    <header>
      <Link to="/" >
        <FaBtc size = {20} />
      </Link>
      {
        isAuth && (
          <nav>
            <ul>
              <li>
              <NavLink to = {'/'} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
              </li>
              <li>
              <NavLink to = {'/contacts'} className={({ isActive }) => isActive ? "active" : ""}>Contacts</NavLink>
              </li>
            </ul>
          </nav>
        )
      }
      {
        isAuth ? (
          <button onClick={logoutHandler}>
            <span>Выйти</span>
            <FaSignOutAlt />
          </button>
        ) : (
          <Link className="" to={'auth'}>
            Войти/Зарегистрироваться
          </Link>
        )
      }
    </header>
  )
}

export default Header