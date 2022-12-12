import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import "./NavbarStyles.css";

const Navigation = () => {
    return (
        <div className="Navigation">
            <Navbar/>
            <MobileNavbar/>
        </div>
    )
}

export default Navigation;