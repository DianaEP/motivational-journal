import './Register.css';
import '../auth-css/Authentication.css';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";




export default function Register() {
  
    return (
      <>
        <div className="wrapper">
          <div className='auth-container  auth-login'>
              
              <div className="welcome-info welcome-register">
                <h2>Welcome to <span>About me</span></h2>
                <p>This journal will stand as a witness of your hopes,your fear, your dreams, your ambitions and your growth. </p>
              </div>

              <div className= 'form-box' >
                  <h2>Register</h2>
                  <form action="">

                    <div className="input-box">
                      <input type="text" placeholder='full name'  required />
                      <FaRegUser />
                    </div>

                    <div className="input-box">
                      <input type="email" placeholder='email'  required />
                      <MdOutlineEmail />
                    </div>

                    <div className="input-box">
                      <input type="password"  placeholder='password' required />
                      <MdLockOutline />
                    </div>

                    <div className="input-box">
                      <input type="password"  placeholder='confirm password' required />
                      <RiLockPasswordLine />
                    </div>

                    <button className='btn'>Register</button>

                    <div className="link-text">
                      <p>Already have an account? <Link to="/login" >Login</Link></p>
                    </div>
  
                  </form>
              </div>
             
          </div>
        </div>
      </>
    )
  }