import { Routes,Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import Journal from "./components/journal/Journal";
import BraveryPlanner from "./components/bravery-planner/BraveryPlanner";
import MotivationalCards from "./components/motivational-board/MotivationalCards";
import HomePage from "./components/home-page/HomePage";
import Header from "./components/header/Header";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register"
import React, { useEffect, useState } from "react";
import HideNavbar from './components/hide-navbar/HideNavbar';
import UpdateDeleteJournalInput from "./components/journal/UpdateJournal";
import UserDetails from "./components/authentication/user-details/UserDetails";
import PrivateRoute from "../PrivateRoute";
import Footer from "./components/footer/Footer";
import HideFooter from "./components/hide-footer/HideFooter";


export const UserAuthContext = React.createContext();

function App() {
  // show navbar or not on components
  const [showNav, setShowNav] = useState(false);

// checks if the user is already authenticated (from a previous session) and sets the userAuth state based on the saved data.
  const [userAuth, setUserAuth] = useState(() => {
    const token = localStorage.getItem('accessToken');
    const storedUserAuth = localStorage.getItem('userAuth');
    return token && storedUserAuth ? JSON.parse(storedUserAuth) : null;  
  });


//if the page is refreshed, the state is re-initialized from local storage, maintaining user authentication.
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedUserAuth = localStorage.getItem('userAuth');
    if (accessToken && storedUserAuth) {
      setUserAuth(JSON.parse(storedUserAuth));
    }  
  }, []);


// update local storage whenever the userAuth state changes( due to login, logout, or other actions)
  useEffect(() => {
    if (userAuth) {
      localStorage.setItem('accessToken', userAuth.token);
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userAuth');
    }
  }, [userAuth]);


  const showNavbar = () => setShowNav(!showNav);

  return (
    <>
      <UserAuthContext.Provider value={{userAuth, setUserAuth}}>
        <div className="app-container">
          <div className="content-wrap">
            <HideNavbar className='extra'>
              <Header showNavbar={showNavbar} showNav={showNav}/>
              <div id='desktop-hidden'>
                  <Nav showNav={showNav}/>
              </div>  
            </HideNavbar>
            
            <Routes>
              <Route path="/login" element={< Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/" element={<PrivateRoute element={<HomePage />} />}></Route>
              <Route path="/user-details" element={<PrivateRoute element={<UserDetails />} />} />
              <Route path="/journal" element={<PrivateRoute element={<Journal />} />}></Route>
              <Route path="/journal/:id" element={<PrivateRoute element={<UpdateDeleteJournalInput />} />}></Route>
              <Route path="/motivational-cards" element={<PrivateRoute element={<MotivationalCards />} />}></Route>
              <Route path="/bravery-planner" element={<PrivateRoute element={<BraveryPlanner />} />}></Route>
            </Routes>
          </div>
          
          <HideFooter>
              <Footer/>
          </HideFooter>
          
        </div>
      </UserAuthContext.Provider>
    </>
  );
}

export default App;
