import { useContext } from "react";
import { UserAuthContext } from "./src/App";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ element}){
    const { userAuth } = useContext(UserAuthContext);

    return userAuth ? element : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
    element: PropTypes.any,
    
  };