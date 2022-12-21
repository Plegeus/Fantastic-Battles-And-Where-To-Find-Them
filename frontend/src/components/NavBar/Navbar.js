import "./NavbarStyles.css";
import NavbarList from "./NavbarList";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="Navbar">
            <h1 className="siteName"><Link to="/">Fantastic battles and where to find them</Link></h1>            
            <NavbarList/>
        </nav>
    );
}

export default Navbar;