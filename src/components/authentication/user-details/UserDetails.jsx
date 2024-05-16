import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import "../auth-css/Authentication.css";
import "./UserDetails.css";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../../App";
import FormValidation from "../validation/FormValidation";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {

  const { userAuth, setUserAuth } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstName: userAuth.firstName,
    lastName: userAuth.lastName,
    email: userAuth.email,
    password: ''
  })

  const { errors, valid, inputChange, validateData } = FormValidation({ data: userDetails, setData: setUserDetails });



  // PUT update user details

  async function updateUserDetails(e){
    e.preventDefault();

    if(validateData()){
     
      try {
        // console.log("Updating user with data:", userDetails);
        const response = await fetch(`http://localhost:3000/users/${userAuth.userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userAuth.token}`
          },
          body: JSON.stringify(userDetails),
        });
  
        if (response.ok) {
          const updatedUser = await response.json();
          // console.log("Server response with updated user:", updatedUser);
          setUserAuth(updatedUser); // Update context with new user data
          alert('Your changes have been successfully saved! ')
          navigate('/')
        } 
        }catch (error) {
        console.error('Error updating user details:', error); 
      }
    }
  }

  // DELETE delete user account
  async function deleteUserAccount(e){
    e.preventDefault();

    const userConfirmedAction = confirm('Are you sure you want to delete your account?') // confirmation box ERROR

    if(userConfirmedAction){
      try {
        
        const response = await fetch(`http://localhost:3000/users/${userAuth.userId}`,{
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userAuth.token}`
          }
        });
  
        if (response.ok) {
          navigate('/register')
        } 
        }catch (error) {
        console.error('Error deleting user account:', error); 
      }
    }
  }
 
  return (
    <>
      <div className="wrapper user_details-wrapper">
        <div className="auth-container user_details-container">
          <div className="form-box user_details-form-box ">
            <h2>About me</h2>
            <form >
              <div className="input-box user_details-input-box">
                <label htmlFor="first-name">First name</label>
                <input
                  type="text"
                  name="firstName"
                  id="first-name"
                  value = {userDetails.firstName}
                  onChange={inputChange}
                />
                <FaRegUser />
              </div>
              {valid ? <></> : <span className='input-error'>{errors.firstName}</span>}

              <div className="input-box user_details-input-box">
                <label htmlFor="last-name">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  value = {userDetails.lastName}
                  onChange={inputChange}
                />
                <FaRegUser />
              </div>
              {valid ? <></> : <span className='input-error'>{errors.lastName}</span>}

              <div className="input-box user_details-input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value = {userDetails.email}
                  onChange={inputChange}
                />
                <MdOutlineEmail />
              </div>
              {valid ? <></> : <span className='input-error'>{errors.email}</span>}


              <div className="input-box user_details-input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*Please input your password before pressing the update button"
                  value = {userDetails.password}
                  onChange={inputChange}
                />
                <MdOutlineEmail />
              </div>
              {valid ? <></> : <span className='input-error'>{errors.password}</span>}

              <div className="buttons-user_details">
                <button className="btn user_details-btn" onClick={updateUserDetails}>Update</button>
                <button className="btn user_details-btn" onClick={deleteUserAccount}>Delete account</button>
              </div>
              

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
