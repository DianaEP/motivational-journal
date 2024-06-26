import './Register.css';
import '../auth-css/Authentication.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useContext, useState } from 'react';
import FormValidation from '../validation/FormValidation';
import { registerUser } from '../../../fetch/fetch';
import useAlert from '../../custom-boxes/alert-box/AlertBox';
import { UserAuthContext } from '../../../App';



export default function Register() {
  const navigate = useNavigate()
  const {setUserAuth} = useContext(UserAuthContext);
  const { showAlert, AlertComponent } = useAlert();


  const [dataRegister, setDataRegister] = useState({
    "firstName" : '',
    "lastName" : '',
    "email" : '',
    "password" : '',
    "confirmPassword" : ''
  })

  const { errors, valid, inputChange, validateData } = FormValidation({ data: dataRegister, setData: setDataRegister });
  

  function userRegister(e){
    e.preventDefault();
    const {confirmPassword, ...restUserData} = dataRegister;

    if( dataRegister.password !== confirmPassword){
      showAlert("Passwords don't match!"); // alert box
      return; 
    }
  
    if(validateData()){
       registerUser(restUserData,setUserAuth, navigate, showAlert).catch((error) =>
         console.error('Error register:', error)
       );
     } 
   }

    return (
      <>
        <div className="wrapper">
          <div className='auth-container  auth-register'>
              
              <div className="welcome-info welcome-register">
                <h2>Welcome to <span>About me</span></h2>
                <p>This journal will stand as a witness of your hopes,your fear, your dreams, your ambitions and your growth. </p>
              </div>

              <div className= 'form-box' >
                  <h2>Register</h2>
                  <form onSubmit={userRegister}>

                    <div className="input-box">
                      <input type="text"
                             placeholder='first name'
                             name='firstName' 
                             value = {dataRegister.firstName}
                             onChange={inputChange}
                              />
                      <FaRegUser />
                      {valid ? <></> : <span className='input-error'>{errors.firstName}</span>}
                    </div>
                    

                    <div className="input-box">
                      <input type="text"
                             placeholder='last name' 
                             name='lastName' 
                             value = {dataRegister.lastName}
                             onChange={inputChange} 
                              />
                      <FaRegUser />
                      {valid ? <></> : <span className='input-error'>{errors.lastName}</span>}
                    </div>
                    

                    <div className="input-box">
                      <input type="email"
                             placeholder='email' 
                             name='email' 
                             value = {dataRegister.email}
                             onChange={inputChange} 
                              />
                      <MdOutlineEmail />
                      {valid ? <></> : <span className='input-error'>{errors.email}</span>}
                    </div>
                    

                    <div className="input-box">
                      <input type="password"  
                             placeholder='password' 
                             name='password' 
                             value = {dataRegister.password}
                             onChange={inputChange} 
                              />
                      <MdLockOutline />
                      {valid ? <></> : <span className='input-error'>{errors.password}</span>}
                    </div>
                    

                    <div className="input-box">
                      <input type="password"  
                             placeholder='confirm password' 
                             name='confirmPassword' 
                             value = {dataRegister.confirmPassword}
                             onChange={inputChange} 
                              />
                      <RiLockPasswordLine />
                      {valid ? <></> : <span className='input-error'>{errors.confirmPassword}</span>}
                    </div>
                    
                    <button className='btn'>Register</button>

                    <div className="link-text">
                      <p>Already have an account? <Link to="/login" >Login</Link></p>
                    </div>
  
                  </form>
              </div>
             
          </div>
          <AlertComponent /> 
        </div>
      </>
    )
  }