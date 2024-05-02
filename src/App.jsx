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
import { useState } from "react";
import HideNavbar from './components/hide-navbar/HideNavbar';




function App() {
  // show navbar or not on components
  const [showNav, setShowNav] = useState(false);

  const showNavbar = () => setShowNav(!showNav);




  return (
    <>
      
      <HideNavbar>
        <Header showNavbar={showNavbar} showNav={showNav}/>
        <Nav showNav={showNav}/>
      </HideNavbar>
        
     

       
      
      
      <Routes>
        <Route path="/login" element={< Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        <Route path="/daily-planner" element={<DailyPlanner />}></Route>
        <Route path="/motivational-cards" element={<MotivationalCards />}></Route>
        <Route path="/list-books" element={<ListBooks />}></Route>  

        
      </Routes>
      
    </>
  );
}

export default App;
