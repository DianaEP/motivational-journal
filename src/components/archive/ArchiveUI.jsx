import { useNavigate } from 'react-router-dom';
import './Archive.css';
import PropTypes from "prop-types";

export default function Archive({journalInputs, onClickHide}){
    const navigate = useNavigate()
    function archiveDate(userInput){
        navigate(`/journal/${userInput.id}`)
    }


    return(
        <div className="alert-parent">
            <div className="archive-box animated">
                <h1>Journal archive</h1>
                <ul>
                    {journalInputs.map(userInput =>(
                        <li key={userInput.id} onClick={()=>archiveDate(userInput)} className='archive-list'>{userInput.date}</li>
                    ))}
                </ul>
                <button className="alert-btn archive-btn" onClick={onClickHide}>Close</button>
            </div>
        </div>
        
    );
}


Archive.propTypes = {
    journalInputs: PropTypes.any,
    onClickHide : PropTypes.any,
    
  };