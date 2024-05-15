import { useContext } from "react";
import "./HomePage.css";
import { UserAuthContext } from "../../App";

export default function HomePage() {
  
  const { userAuth } = useContext(UserAuthContext);
   
    return (
      <>
        <div className="elem-container"> 
              <p className="home-p welcome-msg ">Welcome <span>{userAuth.firstName}</span> !</p>
              <p className="home-p quote">&apos;Journal writing, when it becomes a ritual for transformation, is not only life-changing but life-expanding.&apos; — Jennifer Williamson</p>
              
        </div>
      </>
    )
  }