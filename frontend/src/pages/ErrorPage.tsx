import type { FC } from "react";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
  return (
    <div>
      <Link to={'/'}>На главную страницу</Link>
    </div>
  )
}

export default ErrorPage