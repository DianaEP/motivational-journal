import './Register.css';
import '../auth-css/Authentication.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";




export default function Register() {
  const navigate = useNavigate()

  function userRegister(e){
    e.preventDefault();
    const formElement = e.target;
    const{firstName, lastName, email, password, confirmPassword} = formElement;

    if(password.value !== confirmPassword.value){
      console.warn("Password and confirm password don't match");
      return;
    }
    const user = {
      firstName : firstName.value,
      lastName : lastName.value,
      email : email.value,
      password : password.value,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => navigate('/login'))
      .catch((error) => {
          console.error('Error adding entry:', error);
    });
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
                      <input type="text" placeholder='first name' name='firstName' required />
                      <FaRegUser />
                    </div>

                    <div className="input-box">
                      <input type="text" placeholder='last name' name='lastName'  required />
                      <FaRegUser />
                    </div>

                    <div className="input-box">
                      <input type="email" placeholder='email' name='email'  required />
                      <MdOutlineEmail />
                    </div>

                    <div className="input-box">
                      <input type="password"  placeholder='password' name='password' required />
                      <MdLockOutline />
                    </div>

                    <div className="input-box">
                      <input type="password"  placeholder='confirm password' name='confirmPassword' required />
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