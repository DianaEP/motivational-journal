import "../CustomBox.css";
import PropTypes from "prop-types";

export default function AlertBox({message, onClickHide}) {
  
  
  return (
    <>
      <div className="alert-parent">
        <div className= "alert-box animated ">
          <p className="alert-font">{message}</p>
          <button className="alert-btn" onClick={onClickHide}>OK</button>
        </div>
      </div>
    </>
  );
}

AlertBox.propTypes = {
    message: PropTypes.any,
    onClickHide : PropTypes.any,
    
  };
