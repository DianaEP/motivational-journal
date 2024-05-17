import { Routes,Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import Journal from "./components/journal/Journal";
import DailyPlanner from "./components/daily-planner/DailyPlanner";
import MotivationalCards from "./components/motivational-board/MotivationalCards";
import ListBooks from "./components/list-books/ListBooks";
import HomePage from "./components/home-page/HomePage";
import Header from "./components/header/Header";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register"
import React, { useEffect, useState } from "react";
import HideNavbar from './components/hide-navbar/HideNavbar';
import UpdateDeleteJournalInput from "./components/journal/UpdateJournal";
import UserDetails from "./components/authentication/user-details/UserDetails";
import PrivateRoute from "../PrivateRoute";



export const UserAuthContext = React.createContext();



function App() {
  // show navbar or not on components
  const [showNav, setShowNav] = useState(false);

  // context for user authentication token and id
  const [userAuth, setUserAuth] = useState(null);

  useEffect(()=>{
    // to not loose the token on refresh ///////////////NOT WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const accessToken = localStorage.getItem("accessToken");

    if(accessToken){
      setUserAuth({token:accessToken})
    }
  },[])

  // useEffect(() => {
  //   const storedUserAuth = localStorage.getItem('userAuth');
  //   if (storedUserAuth) {
  //     setUserAuth(JSON.parse(storedUserAuth));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (userAuth) {
  //     localStorage.setItem('userAuth', JSON.stringify(userAuth));
  //   } else {
  //     localStorage.removeItem('userAuth');
  //   }
  // }, [userAuth]);

  const showNavbar = () => setShowNav(!showNav);

  console.log({userAuth});


  return (
    <>
      <UserAuthContext.Provider value={{userAuth, setUserAuth}}>
          <HideNavbar>
            <Header showNavbar={showNavbar} showNav={showNav}/>
            <Nav showNav={showNav}/>
          </HideNavbar>
      
          <Routes>
            <Route path="/login" element={< Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/" element={<PrivateRoute element={<HomePage />} />}></Route>
            <Route path="/user-details" element={<PrivateRoute element={<UserDetails />} />} />
            <Route path="/journal" element={<PrivateRoute element={<Journal />} />}></Route>
            <Route path="/journal/:id" element={<PrivateRoute element={<UpdateDeleteJournalInput />} />}></Route>
            <Route path="/daily-planner" element={<PrivateRoute element={<DailyPlanner />} />}></Route>
            <Route path="/motivational-cards" element={<PrivateRoute element={<MotivationalCards />} />}></Route>
            <Route path="/list-books" element={<PrivateRoute element={<ListBooks />} />}></Route>  

          </Routes>

      </UserAuthContext.Provider>
      
      
    </>
  );
}

export default App;
