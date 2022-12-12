import "./NavbarStyles.css";
import NavbarList from "./NavbarList";

const Navbar = () => {
    return (
        <nav className="Navbar">
            <h1 className="siteName">Fantastic Battles</h1>
            <NavbarList/>
        </nav>
    );
}

export default Navbar;