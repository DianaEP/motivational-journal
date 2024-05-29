import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const HideFooter = ({children})=>{
    const path = useLocation();
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        if(path.pathname === '/login' || path.pathname === '/register'){
            setShowFooter(false);
        }else{
            setShowFooter(true);
        }
    },[path])

    return(
        <div>{showFooter && children}</div>
    )
};

export default HideFooter;

HideFooter.propTypes = {
    children: PropTypes.any,
    
  };
