import { NavBarData } from "./NavBarData";
import "./NavbarStyles.css";
import { Link } from "react-router-dom"

const NavbarList = (props) => {
    return (
        <ul className="nav-menu">
            { NavBarData.map((value,index) => {
                return (
                    <li key={index} OnClick={() => {props.isMobile && props.closeMobileMenu()}}>
                        <Link to={value.url} className={value.cName}>{value.title}</Link>
                    </li>
                );
            })}
        </ul>
    )
}

export default NavbarList;