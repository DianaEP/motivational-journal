import './Header.css';
import { GiHamburgerMenu } from "react-icons/gi";
import PropTypes from "prop-types";



export default function Header({showNavbar}){
    

    
    return(
        <header className="header">
                <GiHamburgerMenu onClick={showNavbar}/> 
                
                <button className='logout'>Log Out</button> 
        </header>
    )
}

Header.propTypes = {
    showNavbar: PropTypes.any,
    
  };