import { NavBarData } from "./NavBarData";
import "./NavbarStyles.css";

const NavbarList = (props) => {
    return (
        <ul className="nav-menu">
            { NavBarData.map((value,index) => {
                return (
                    <li key={index} OnClick={() => props.isMobile && props.closeMobileMenu()}>
                        <a href={value.url} className={value.cName}>{value.title}</a>
                    </li>
                );
            })}
        </ul>
    )
}

export default NavbarList;