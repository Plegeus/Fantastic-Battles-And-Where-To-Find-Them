import "./NavbarStyles.css";
import NavbarList from "./NavbarList";
import{ VscMenu } from "react-icons/vsc"
import { VscClose } from "react-icons/vsc"
import { useState } from "react";

const MobileNavbar = () => {

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
            <h1 className="siteName">Fantastic Battles</h1>
            {MenuIcon ? hamburgerButton : closeButton}   
            {MenuIcon === false && <NavbarList isMobile={true} closeMobileMenu={closeMobileMenu}/>}
        </nav>
    );
}

export default MobileNavbar;