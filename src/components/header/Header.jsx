import './Header.css';
import { GiHamburgerMenu } from "react-icons/gi";
import PropTypes from "prop-types";
import Nav from '../nav/Nav';



export default function Header({showNavbar}){
    
    return(
        <header className="header">
                <GiHamburgerMenu className='header-svg' onClick={showNavbar}/>
                <Nav />   
        </header>
    )
}

Header.propTypes = {
    showNavbar: PropTypes.any,
    showNav: PropTypes.any,
  };