import './Login.css';
import '../auth-css/Authentication.css';

import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { useContext } from 'react';
import { UserAuthContext } from '../../../App';





export default function Login() {
  const navigate = useNavigate()

  const {setUserAuth} = useContext(UserAuthContext)

  async function userLogin(e){
    e.preventDefault();
    const formElement = e.target;
    const{ email, password} = formElement;

    const user = {
      email : email.value,
      password : password.value,
    };

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    const body = await response.json();
    localStorage.setItem('accessToken', body.accessToken);
    setUserAuth(body.accessToken);
    navigate('/');
  }




    return (
      <>
        <div className="wrapper">
          <div className='auth-container  auth-login'>
               
              <div className= 'form-box' >
                  <h2>Login</h2>
                  <form onSubmit={userLogin}>

                    <div className="input-box">
                      <input type="email" placeholder='email' name='email' required />
                      <MdOutlineEmail />
                    </div>

                    <div className="input-box">
                      <input type="password"  placeholder='password' name='password' required />
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