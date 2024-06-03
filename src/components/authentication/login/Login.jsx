import './Login.css';
import '../auth-css/Authentication.css';

import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { useContext, useState } from 'react';
import { UserAuthContext } from '../../../App';
import FormValidation from '../validation/FormValidation';
import { loginUser } from '../../../fetch/fetch';
import useAlert from '../../custom-boxes/alert-box/AlertBox';


export default function Login() {
  const navigate = useNavigate()
  const { showAlert, AlertComponent } = useAlert();

  const {setUserAuth} = useContext(UserAuthContext);

  const [dataLogin, setDataLogin] = useState({
    "email" : '',
    "password" : ''
  })
  
  const { errors, valid, inputChange, validateData } = FormValidation({ data: dataLogin, setData: setDataLogin });

  function userLogin(e){
    e.preventDefault();
    if(validateData()){
      loginUser(dataLogin, setUserAuth, navigate, showAlert).catch((error) =>
        console.error('Error login:', error)
      );
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

                    <button className='btn'>Login</button>

                    <div className="link-text">
                      <p>Don&apos;t have an account? <Link to="/register"  >Register</Link></p>
                    </div>
  
                  </form>
              </div>
              <div className="welcome-info">
                <h2>Welcome to <span>About me</span></h2>
                <p>This journal will stand as a witness of your hopes,your fear, your dreams, your ambitions and your growth. </p>
              </div>
          </div>
          <AlertComponent /> 
        </div>
      </>
    )
  }