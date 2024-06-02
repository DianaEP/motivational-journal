import "./Journal.css";
import minimalist from '../../assets/minimalist.jpeg';
import {  useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { retrieveJournalInputs, submitJournalInput } from "../../fetch/fetch";
import { UserAuthContext } from "../../App";
import useAlert from "../custom-boxes/alert-box/AlertBox";
import useArchive from "../archive/Archive";




export default function Journal() {
  const { showAlert, AlertComponent } = useAlert();

  const { showArchiveComponent, ArchiveComponent } = useArchive();
  
  const {userAuth} = useContext(UserAuthContext);

  const [journalInputs, setJournalInputs] = useState([]);
  
  const [newInput, setNewInput] = useState({
    "id" : uuidv4(),
    "date" : '',
    "grateful": "",
    "proud" : "",
    "lookForward" : "",
    "notes" : ""
  });

  const navigate = useNavigate();




  useEffect(()=>{
    if(userAuth){
      const userId = userAuth.userId
      retrieveJournalInputs(userId,setJournalInputs, userAuth, navigate).catch((error) =>
        console.log(`Error journal inputs ${error}`)
      );
    }
    
  },[userAuth, navigate])

 


  // Search for existing input by date if exist 
  const dateChange = (e) => {
    const date = e.target.value;
    setNewInput((prev) => ({
      ...prev,
      date: date
    }));

    const existingInput = journalInputs.find((input) => input.date === date);
    if (existingInput) {
      navigate(`/journal/${existingInput.id}`);
    }
  };


  const inputChange = (e) => {
    const { name, value } = e.target;
    setNewInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  // POST a new input 

  const userSubmit = (e) => {
    e.preventDefault();
    if(newInput.date === ''){
      showAlert("Please add today's date!"); // alert box
      return;
    }

    submitJournalInput(userAuth, newInput, setJournalInputs);
    setNewInput({
      date: '',
      grateful: '',
      proud: '',
      lookForward: '',
      notes: '',
    });
  };



  if (!journalInputs) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  return (
    <>
      <div className="form-elem">
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
                       name="date"
                       id="date"
                       value={newInput.date} 
                       onChange = {dateChange}
                       />
                
              </fieldset>
              
            </div>

          <div className="sections">
            
            <div className="first-section">
              
              <fieldset className="fieldset ">
                

                <label className="label-text" htmlFor="grateful">Today I am grateful for</label>
                <textarea className="textarea"
                          name="grateful" 
                          id="grateful" 
                          cols="30" 
                          rows="10"
                          value={newInput.grateful} 
                          onChange = {inputChange}></textarea>
              </fieldset>

              <fieldset className="fieldset ">
                <label className="label-text" htmlFor="proud">Today I am proud of</label>
                <textarea className="textarea" 
                          name="proud"
                          id="proud" 
                          cols="30" 
                          rows="10"
                          value={newInput.proud} 
                          onChange = {inputChange}></textarea>
              </fieldset>

              <fieldset className="fieldset ">
                

                <label className="label-text" htmlFor="lookForward">Today I look forward to</label>
                <textarea className="textarea" 
                          name="lookForward" 
                          id="lookForward" 
                          cols="30" 
                          rows="10"
                          value={newInput.lookForward} 
                          onChange = {inputChange}></textarea>
              </fieldset>
            </div>


            <div className="second-section">
            <fieldset className="fieldset">
              <label className="label-text" htmlFor="notes">Notes</label>
              <textarea className="textarea t-notes" 
                        name="notes" 
                        id="notes" 
                        cols="30" 
                        rows="10"
                        value={newInput.notes} 
                        onChange = {inputChange} ></textarea>
            </fieldset>
          </div>
          </div>

         

          <div className="buttons-container">
            <button className="button" type="submit" onClick={userSubmit}>Save</button> 
          </div>
        </form>

        <div className="button-archive">
            <button onClick={showArchiveComponent} className="button">Show Archive</button>
        </div>


        
        <AlertComponent/>
        <ArchiveComponent journalInputs={journalInputs} />
      </div>
    </>
  );
}
