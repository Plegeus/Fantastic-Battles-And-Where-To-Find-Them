import "./NavbarStyles.css";
import NavbarList from "./NavbarList";
import{ VscMenu } from "react-icons/vsc"
import { VscClose } from "react-icons/vsc"
import { useState } from "react";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
// Depending on the state of the MenuIcon we will either render the Hamburger Icon or the Close Icon
// We also pass the function to the NavBarList so it can add the onClick event to each navbar item
    const [MenuIcon,setMenuIcon] = useState(true)

    const hamburgerButton = <VscMenu className="Hamburger" 
                            size="2rem" color="white"
                            onClick={() => setMenuIcon(!MenuIcon)}
                            />
    const closeButton = <VscClose className="Hamburger" 
                            size="2rem" color="white"
                            onClick={() => setMenuIcon(!MenuIcon)}
                            />
                            
    const closeMobileMenu = () => setMenuIcon(true);                        

    return (
        <nav className="MobileNavbar">
            <h1 className="siteName"><Link to="/">Fantastic Battles</Link></h1>
            {MenuIcon ? hamburgerButton : closeButton}   
            {MenuIcon === false && <NavbarList isMobile={true} closeMobileMenu={closeMobileMenu}/>}
        </nav>
    );
}

export default MobileNavbar;