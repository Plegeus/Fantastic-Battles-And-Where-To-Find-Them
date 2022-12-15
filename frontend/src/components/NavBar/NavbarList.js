import { NavBarData } from "./NavBarData";
import "./NavbarStyles.css";
import { Link } from "react-router-dom"
import UserContext from "../User.context";
import { useContext, useEffect, useState } from "react";

const NavbarList = (props) => {


    const {
        Accestoken,
        setAccestoken
    } = useContext(UserContext);

    const [filteredNavBarData,setfilteredNavBarData] = useState(NavBarData.filter(checkLoginState))

    useEffect(() => {
        setfilteredNavBarData(NavBarData.filter(checkLoginState))
    }, [Accestoken])

    function checkLoginState(data) {
        if (!Accestoken) {
            return data.title != "Account"
        } else {
            return data.title != "Login"
        }
    }

    return (
        <ul className="nav-menu">
            {filteredNavBarData.map((value, index) => {
                return (
                    <li key={index} onClick={() => { props.isMobile && props.closeMobileMenu() }}>
                        <Link to={value.url} className={value.cName}>{value.title}</Link>
                    </li>
                );
            })}
        </ul>
    )
}

export default NavbarList;