import './Login.css';
import '../auth-css/Authentication.css';

import { Link } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";





export default function Login() {
  

    return (
      <>
        <div className="wrapper">
          <div className='auth-container  auth-login'>
               
              <div className= 'form-box' >
                  <h2>Login</h2>
                  <form action="">

                    <div className="input-box">
                      <input type="email" placeholder='email'  required />
                      <MdOutlineEmail />
                    </div>

                    <div className="input-box">
                      <input type="password"  placeholder='password' required />
                      <MdLockOutline />
                    </div>

                    <div className="login-details">
                      <p className='forgot-password'>Forgot password?</p>

                    </div>

                    

                    <button className='btn'>Login</button>

                    <div className="link-text">
                      <p>Not have an account? <Link to="/register"  >Register</Link></p>
                    </div>
  
                  </form>
              </div>
              <div className="welcome-info">
                <h2>Welcome to <span>About me</span></h2>
                <p>This journal will stand as a witness of your hopes,your fear, your dreams, your ambitions and your growth. </p>
              </div>
          </div>
        </div>
      </>
    )
  }