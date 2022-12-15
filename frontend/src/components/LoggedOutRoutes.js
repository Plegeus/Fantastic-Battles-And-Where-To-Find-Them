import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"
import UserContext from "./User.context";

const LoggedOutRoutes = () => {

    const {
        Accestoken,
        setAccestoken
    } = useContext(UserContext);

  return (
    !Accestoken ? <Outlet/> : <Navigate to="/"/>
  )
}

export default LoggedOutRoutes