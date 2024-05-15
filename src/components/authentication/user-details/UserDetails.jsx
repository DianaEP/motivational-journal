import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import "../auth-css/Authentication.css";
import "./UserDetails.css";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../../App";

export default function UserDetails() {
  const { userAuth } = useContext(UserAuthContext);
  // const [userData, setUserData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: ''
  // });

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/users/${userAuth.userId}`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${userAuth.token}`,
  //         },
  //       });

  //       if (response.ok) {
  //         const userData = await response.json();
  //         setUserData(userData);
  //       } else {
  //         throw new Error('Failed to fetch user data');
  //       }
  //     } catch (error) {
  //       console.log('Error fetching user data:', error);
  //     }
  //   };

  //   if (userAuth && userAuth.token) {
  //     fetchUserData();
  //   }
  // }, [userAuth]); // Fetch data when userAuth changes
  return (
    <>
      <div className="wrapper user_details-wrapper">
        <div className="auth-container user_details-container">
          <div className="form-box user_details-form-box ">
            <h2>About me</h2>
            <form>
              <div className="input-box user_details-input-box">
                <label htmlFor="fist-name">First name</label>
                <input
                  type="text"
                  name="firstName"
                  id="first-name"
                  value = {userAuth.firstName}
                  //  onChange={inputChange}
                />
                <FaRegUser />
                {/* {valid ? <></> : <span className='input-error'>{errors.firstName}</span>} */}
              </div>

              <div className="input-box user_details-input-box">
                <label htmlFor="last-name">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  value = {userAuth.lastName}
                  //  onChange={inputChange}
                />
                <FaRegUser />
                {/* {valid ? <></> : <span className='input-error'>{errors.lastName}</span>} */}
              </div>

              <div className="input-box user_details-input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value = {userAuth.email}
                  //  onChange={inputChange}
                />
                <MdOutlineEmail />
                {/* {valid ? <></> : <span className='input-error'>{errors.email}</span>} */}
              </div>

              <button className="btn user_details-btn">Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
