import { useContext } from "react";
import UserContext from "../User.context";
import "./LogoutStyles.css";

const Logout = () => {

    const { setAccestoken, setUsername } = useContext(UserContext);

// We remove the Accestoken and Username when a user presses on the logout button
    const logout = () => {
        setAccestoken(null);
        setUsername(null);
        fetch( "/api/user/logout", {
            "method": "POST"
        })
    }

    return (
        <button type="submit" className="LogoutButton" onClick={logout}>Logout</button>
    )
}

export default Logout