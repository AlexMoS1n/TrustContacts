import type { FC, JSX } from "react"
import { useAuth } from "../hooks/useAuth"

interface IPropsProtectedRoute {
  children: JSX.Element
}

const ProtectedRoute: FC<IPropsProtectedRoute> = ({ children }) => {
  const isAuth = useAuth()
  return <>
    {isAuth ? (
      children
      ) : ( 
      <div>
        <h1>Эта страница доступна только для авторизованных пользователей</h1>
      </div>
      )}
  </>
}

export default ProtectedRoute