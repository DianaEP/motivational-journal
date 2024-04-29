import "./Nav.css";
import logo from '../../assets/logo3.svg';
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuBookLock } from "react-icons/lu";
import { MdOutlineEditCalendar } from "react-icons/md";
import { BsClipboardHeart } from "react-icons/bs";
import { IoIosList } from "react-icons/io";
import PropTypes from "prop-types";

export default function Nav({showNav}) {
  

    return (
      <>
        
          <nav className={showNav ? 'navbar active' : 'navbar'} > 
              <img src={logo} alt="Logo" className="logo" />
              <ul className="nav-links">
                  <li>
                    <Link to="/"><IoHomeOutline />Home</Link>
                  </li>
                  <li>
                    <Link to="/journal"><LuBookLock />Journal</Link>
                  </li>
                  <li>
                    <Link to="/daily-planner"><MdOutlineEditCalendar />Daily Planner</Link>
                  </li>
                  <li>
                    <Link to="/motivational-board"><BsClipboardHeart />Motivational Board</Link>
                  </li>
                  <li>
                    <Link to="/list-books"><IoIosList />Books List</Link>
                  </li>
              </ul>
          </nav>
        
      </>
    )
  }

  Nav.propTypes = {
    showNav: PropTypes.any,
    
  };