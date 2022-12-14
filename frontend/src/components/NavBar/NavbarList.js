import { NavBarData } from "./NavBarData";
import "./NavbarStyles.css";
import { Link } from "react-router-dom"

const NavbarList = (props) => {

const filteredNavBarData = NavBarData.filter(checkLoginState)

function checkLoginState(data){
    if (true) {
        return data.title != "Account"
      } else {
        return data.title != "Login"
      }
}

    return (
        <ul className="nav-menu">
            { filteredNavBarData.map((value,index) => {
                return (
                    <li key={index} onClick={() => {props.isMobile && props.closeMobileMenu()}}>
                        <Link to={value.url} className={value.cName}>{value.title}</Link>
                    </li>
                );
            })}
        </ul>
    )
}

export default NavbarList;