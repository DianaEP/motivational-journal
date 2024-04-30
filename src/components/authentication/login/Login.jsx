import './Login.css';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";


export default function Login() {
  

    return (
      <>
        <div className="wrapper">
          <div className='login-container'>
              
              
              <div className='form-box login'>
                  <h2>Login</h2>
                  <form action="">

                    <div className="input-box">
                      <input type="email" placeholder='Email' id='email' required />
                      <FaRegUser />
                    </div>

                    <div className="input-box">
                      <input type="password" id='password' placeholder='Password' required />
                      <MdLockOutline />
                    </div>

                    <button className='btn'>Login</button>

                    <div className="link-text">
                      <p>Not have an account? <Link to="/register">Sign Up</Link></p>
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