import './Login.css';
import '../auth-css/Authentication.css';

import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { useContext, useState } from 'react';
import { UserAuthContext } from '../../../App';
import FormValidationLogin from '../validation/FormValidationLogin';





export default function Login() {
  const navigate = useNavigate()

  const {setUserAuth} = useContext(UserAuthContext);

  const [dataLogin, setDataLogin] = useState({
    "email" : '',
    "password" : ''
  })
  
  const { errors, valid, inputChange, validateData } = FormValidationLogin({ data: dataLogin, setData: setDataLogin });

  async function userLogin(e){
    e.preventDefault();
    // debugger
    if(validateData()){
      try{
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataLogin),
        })

        if (!response.ok) {
          if(response.status === 400){
            alert('Invalid email or password. Please try again.') //!!!!!!!!message box
            throw new Error('Invalid email or password. ');
            
          }
        }

        if(response.ok){
          const body = await response.json();
          localStorage.setItem('accessToken', body.accessToken);
          console.log(body.accessToken, body.user.id);
          setUserAuth({token : body.accessToken, userId: body.user.id});
          navigate('/');
        }

        
      }catch(error){
        console.log('Error logging in:', error.message);
      }
      
    }
    
  }




    return (
      <>
        <div className="wrapper">
          <div className='auth-container  auth-login'>
               
              <div className= 'form-box' >
                  <h2>Login</h2>
                  <form onSubmit={userLogin}>

                    <div className="input-box">
                      <input type="email" 
                             placeholder='email' 
                             name='email' 
                             value={dataLogin.email}
                             onChange={inputChange}
                              />
                      <MdOutlineEmail />
                      {valid ? <></> : <span className='input-error'>{errors.email}</span>}
                    </div>

                    <div className="input-box">
                      <input type="password"  
                             placeholder='password' 
                             name='password'
                             value={dataLogin.password}
                             onChange={inputChange}
                             />
                      <MdLockOutline />
                      {valid ? <></> : <span className='input-error'>{errors.password}</span>}
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