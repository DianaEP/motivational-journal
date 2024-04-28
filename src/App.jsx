import { Routes,Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import Journal from "./components/journal/Journal"
import DailyPlanner from "./components/daily-planner/DailyPlanner"
import MotivationalBoard from "./components/motivational-board/MotivationalBoard"
import ListBooks from "./components/list-books/ListBooks"
import HomePage from "./components/home-page/HomePage"
import Header from "./components/header/Header";
import { useState } from "react";




function App() {
  const [showNav, setShowNav] = useState(false);

  const showNavbar = () => setShowNav(!showNav);


  return (
    <>
      <Header showNavbar={showNavbar} showNav={showNav}/>
      <Nav showNav={showNav}/>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        <Route path="/daily-planner" element={<DailyPlanner />}></Route>
        <Route path="/motivational-board" element={<MotivationalBoard />}></Route>
        <Route path="/list-books" element={<ListBooks />}></Route>
        
      </Routes>
      
    </>
  );
}

export default App;
