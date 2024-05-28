import "./Nav.css";
import logo from '../../assets/a.svg';
import logo2 from '../../assets/mLogo.svg';
import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuBookLock } from "react-icons/lu";
import { MdOutlineEditCalendar } from "react-icons/md";
import { TbCards } from "react-icons/tb";
import { IoIosList } from "react-icons/io";
import { RiUserHeartLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserAuthContext } from "../../App";


export default function Nav({showNav}) {
  const {setUserAuth} = useContext(UserAuthContext);

    const navigate = useNavigate();

    function logout(){
  
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userAuth');
      setUserAuth(null);
      navigate('/login');
    }
    
    return (
      <>
        
          <nav className={showNav ? 'navbar active' : 'navbar'} > 
              <div>
                <div className="logos">
                  <img src={logo} alt="Logo" className="logo-one" />
                  <img src={logo2} alt="Logo" className="logo-two" />
                </div>
                
                <ul className="nav-links">
                    <li>
                      <Link to="/"><IoHomeOutline />Home</Link>
                    </li>
                    <li>
                      <Link to="/user-details"><RiUserHeartLine />About Me</Link>
                    </li>
                    <li>
                      <Link to="/journal"><LuBookLock />Journal</Link>
                    </li>
                    <li>
                      <Link to="/daily-planner"><MdOutlineEditCalendar />Daily Planner</Link>
                    </li>
                    <li>
                      <Link to="/motivational-cards"><TbCards />Motivational Cards</Link>
                    </li>
                    <li>
                      <Link to="/list-books"><IoIosList />Books List</Link>
                    </li>
                </ul>
              </div>
              
              <button className='logout' onClick={logout}>Log Out</button> 
          </nav>
        
      </>
    )
  }

  Nav.propTypes = {
    showNav: PropTypes.any,
    
  };