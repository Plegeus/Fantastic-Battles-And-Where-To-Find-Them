import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"
import UserContext from "./User.context";

const LoggedOutRoutes = () => {

  const {
    Accestoken,
    setAccestoken
  } = useContext(UserContext);


  //If the user is logged in, then we don't allow them to render certain components ( Such as login or register )
  return (
    !Accestoken ? <Outlet /> : <Navigate to="/" />
  )
}

export default LoggedOutRoutes