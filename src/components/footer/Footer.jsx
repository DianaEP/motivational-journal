import './Footer.css';
import logo from '../../assets/a.svg';
import logo2 from '../../assets/mLogo.svg';
import { Link } from "react-router-dom";
import { IoHomeOutline } from 'react-icons/io5';
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

export default function Footer(){

    return(
        <>
            <footer className='footer'>
                <div className="app-info">
                    
                    <Link to="/"><IoHomeOutline />Home</Link>
                </div>

                <div className="contact">
                    <span>Contact us</span>
                    <span>aboutme@gmail.com</span>
                    <div className="social-media">
                        <a href="https://www.facebook.com" target="_blank" >
                            <FaSquareFacebook />
                        </a>
                
                        <a href="https://www.instagram.com" target="_blank" >
                            <FaInstagramSquare />
                        </a>
                    </div>
                </div>

                <div className="footer-details">
                    <div className="logos">
                        <img src={logo} alt="Logo" className="logo-one" />
                        <img src={logo2} alt="Logo" className="logo-two" />
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} About Me App. All rights reserved.</p>
                    </div>
                    
                </div>
            </footer>
        </>
    )
}