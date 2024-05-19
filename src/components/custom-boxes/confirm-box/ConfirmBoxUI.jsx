import "../CustomBox.css";
import "./ConfirmBox.css"
import PropTypes from "prop-types";

export default function ConfirmBox({message, onCancel, onConfirm}) {
  
  return (
    <>
      <div className="alert-parent">
        <div className="alert-box confirm-box">
          <p className="alert-font confirm-font">{message}</p>
          <div className="confirm-style-btn">
                <button className="alert-btn confirm-btn" onClick={onConfirm}>OK</button>
                <button className="alert-btn confirm-btn" onClick={onCancel}>Cancel</button>
          </div>
          
        </div>
      </div>
    </>
  );
}

ConfirmBox.propTypes = {
    message: PropTypes.any,
    onCancel : PropTypes.any,
    onConfirm : PropTypes.any,
    
  };