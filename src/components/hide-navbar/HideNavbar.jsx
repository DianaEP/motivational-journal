import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import './HideNavbar.css'

const HideNavbar = ({children})=>{
    const path = useLocation();
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        if(path.pathname === '/login' || path.pathname === '/register'){
            setShowNavbar(false);
        }else{
            setShowNavbar(true);
        }
    },[path])

    return(
        <div className="sticky">{showNavbar && children}</div>
    )
};

export default HideNavbar;

HideNavbar.propTypes = {
    children: PropTypes.any,
    
  };