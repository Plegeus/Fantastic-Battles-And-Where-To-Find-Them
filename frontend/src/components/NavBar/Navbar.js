import "./NavbarStyles.css";
import NavbarList from "./NavbarList";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="Navbar">
            <h1 className="siteName"><Link to="/">Fantastic Battles</Link></h1>            
            <NavbarList/>
        </nav>
    );
}

export default Navbar;