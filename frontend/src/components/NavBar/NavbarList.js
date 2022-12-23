import { NavBarData } from "./NavBarData";
import "./NavbarStyles.css";
import { Link } from "react-router-dom"
import UserContext from "../User.context";
import { useContext, useEffect, useState } from "react";

const NavbarList = (props) => {


    const {
        Accestoken,
        Username
    } = useContext(UserContext);

    const [filteredNavBarData,setfilteredNavBarData] = useState(NavBarData.filter(checkLoginState))

    useEffect(() => {
        setfilteredNavBarData(NavBarData.filter(checkLoginState))
    }, [Accestoken])

    function checkLoginState(data) {
        if (!Accestoken) {
            return data.title != "My Account"
        } else {
            return data.title != "Login" && data.title != "Accounts" 
        }
    }

    // Creation of the dynamic list for the Navbar
    // If we are in mobile view and we click on 1 of the navbar items then we want to close the Mobile Navbar 

    // If the user is logged in we don't want to have an empty account page url under the navbar item, instead we want the url to point to the account of the user
    return (
        <ul className="nav-menu">
            {filteredNavBarData.map((value, index) => {
                return (
                    <li key={index} onClick={() => { props.isMobile && props.closeMobileMenu() }}>
                        {Accestoken && value.title === "My Account" ? 
                        <Link to={value.url + Username} className={value.cName}>{value.title}</Link> : 
                        <Link to={value.url} className={value.cName}>{value.title}</Link>
                        }
                        
                    </li>
                );
            })}
        </ul>
    )
}

export default NavbarList;