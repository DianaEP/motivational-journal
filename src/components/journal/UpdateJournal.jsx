import "./Journal.css";
import minimalist from '../../assets/minimalist.jpeg';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuthContext } from "../../App";
import { deleteJournalInput, retrieveOneJournalInput, updateJournalInput } from "../../fetch/fetch";
import useConfirm from "../custom-boxes/confirm-box/ConfirmBox";



export default function UpdateDeleteJournalInput(){
    const {userAuth} = useContext(UserAuthContext);
    const { showConfirm, ConfirmComponent } = useConfirm();


    const navigate = useNavigate();
    const { id } = useParams();
  
    const [input, setInput] = useState(null);
    const [editedInput, setEditedInput] = useState({
      date: '',
      grateful: '',
      proud: '',
      lookForward: '',
      notes: ''
    });



    useEffect(() => {
      if(userAuth){
        retrieveOneJournalInput(id, setInput, setEditedInput, userAuth, navigate )
            .catch((error) => console.error('Error fetching journal entry:', error));
      }
        
    }, [id,userAuth,navigate]);
  
  
    const inputChange = (e) => {
      const { name, value } = e.target;
      setEditedInput((prev) => ({
        ...prev,
        [name]: value
      }));
    };

    function goBack(e){
      e.preventDefault();
      navigate('/journal');
    }


    // PUT update the current input

    const userUpdate = (e) => {
        e.preventDefault(); //prevent refresh
        updateJournalInput(id, editedInput, userAuth, navigate).catch((error) =>
          console.error('Error updating journal entry:', error)
        );
      };



    //   DELETE the current input

    const userDelete = async (id) => {
      try{
          const userConfirmedAction = await showConfirm('Are you sure you want to delete this journal page?') // confirmation box 
          if(userConfirmedAction){
            await deleteJournalInput(id, userAuth, navigate);
          } 
        }catch(error) {
          if (error !== false) {
            console.error('Error deleting journal entry:', error);
          } else {
            console.log('Entry deletion canceled by user.');
          }
          }
            
        }
     


    const userDeleteClick = (id, e) => {
        e.preventDefault(); //prevent refresh
        userDelete(id);
      };
  
    if (!input) {
      return <p>Loading...</p>; // Display loading message while fetching data
    }
  
    
  
    return(
      <>
        <div className="form-elem" >
          <div className="title-container">
              <img src={minimalist} alt="tree" className="journal-image" />
              <h1 className="journal-title">Journal</h1>
          </div>
          
          <form className="form-journal" >
  
            <div className="date-container">
                <fieldset className="fieldset-date">
                  <label className="label-text" htmlFor="date">Date</label>
                  <input className="input-field"
                         type="date"
                         id="date" 
                         value={editedInput.date} 
                         readOnly
                          />
                  <button className="button button-search" onClick={(e)=>goBack(e)}>Back to journal</button>
                </fieldset>
              </div>
  
            <div className="sections">
              
              <div className="first-section">
                
                <fieldset className="fieldset parent-position">
                  
  
                  <label className="label-text" htmlFor="grateful">Today I am grateful for</label>
                  <textarea className="textarea"
                            name="grateful" 
                            id="grateful" 
                            cols="30" 
                            rows="10"
                            value={editedInput.grateful} 
                            onChange = {inputChange}></textarea>
                </fieldset>
  
                <fieldset className="fieldset parent-position">
                  <label className="label-text" htmlFor="proud">Today I am proud of</label>
                  <textarea className="textarea" 
                            name="proud"
                            id="proud" 
                            cols="30" 
                            rows="10"
                            value={editedInput.proud} 
                            onChange = {inputChange}></textarea>
                </fieldset>
  
                <fieldset className="fieldset parent-position">
                  
  
                  <label className="label-text" htmlFor="lookForward">Today I look forward to</label>
                  <textarea className="textarea" 
                            name="lookForward" 
                            id="lookForward" 
                            cols="30" 
                            rows="10"
                            value={editedInput.lookForward} 
                            onChange = {inputChange}></textarea>
                    
                </fieldset>
              </div>
  
  
              <div className="second-section">
              <fieldset className="fieldset parent-position">
                <label className="label-text" htmlFor="notes">Notes</label>
                <textarea className="textarea t-notes" 
                          name="notes" 
                          id="notes" 
                          cols="30" 
                          rows="10"
                          value={editedInput.notes} 
                          onChange = {inputChange} ></textarea>
              </fieldset>
            </div>
            </div>
  
           
  
            <div className="buttons-container">
            <button className="button" onClick={userUpdate}>Update</button>
            <button className="button" onClick={(e)=>userDeleteClick(id,e)}>Delete</button>
            </div>
          </form>
          <ConfirmComponent/>
        </div>
      </>
    )
  
  
}