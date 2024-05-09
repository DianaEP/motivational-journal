import "./Journal.css";
import books from '../../assets/books.png';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export default function Journal() {
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


  // Search for existing input by date

  function searchByDate(date){
    const findDate = journalInputs.find((input) => input.date === date);
    if(findDate){
      console.log(findDate.id) 
      navigate(`/journal/${findDate.id}`); //navigate to that specific id
    }else{
      alert('there are no inputs with this date');
    }
  }

  const handleSearch = () => {
    searchByDate(newInput.date);
  };


  // GET all the journal inputs

  useEffect(() => {
    fetch('http://localhost:3000/journalInputs')
      .then((response) => response.json())
      .then((data) => setJournalInputs(data));
  }, []);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setNewInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  // POST a new input 

  function userSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/journalInputs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInput)
    })
      .then((response) => response.json())
      .then((data) => {
        setJournalInputs([...journalInputs, data]);
        console.log('New entry submitted:', newInput.date);
        setNewInput({
          date: '',
          grateful: '',
          proud: '',
          lookForward: '',
          notes: ''
        });
      })
      .catch((error) => {
        console.error('Error adding entry:', error);
      });
  }


  return (
    <>
      <div className="form-elem">
        <div className="title-container">
            <img src={books} alt="tree" className="journal-image" />
            <h1 className="journal-title">Journal</h1>
        </div>
        
        
        <form className="form-journal" >

          <div className="date-container">
              <fieldset className="fieldset">
                <label className="label-text" htmlFor="date">Date</label>
                <input className="input-field"
                       type="date"
                       name="date"
                       id="date" 
                       value={newInput.date} 
                       onChange = {(e) => setNewInput({ ...newInput, date: e.target.value })}
                       required />
                <button className="button button-search" onClick={()=>handleSearch()}>Search</button>
              </fieldset>
            </div>

          <div className="sections">
            
            <div className="first-section">
              
              <fieldset className="fieldset parent-position">
                

                <label className="label-text" htmlFor="grateful">Today I am grateful for</label>
                <div className="top-line"></div>
                <textarea className="textarea"
                          name="grateful" 
                          id="grateful" 
                          cols="30" 
                          rows="10"
                          value={newInput.grateful} 
                          onChange = {inputChange}></textarea>
              </fieldset>

              <fieldset className="fieldset parent-position">
                <label className="label-text" htmlFor="proud">Today I am proud of</label>
                <div className="top-line"></div>
                <textarea className="textarea" 
                          name="proud"
                          id="proud" 
                          cols="30" 
                          rows="10"
                          value={newInput.proud} 
                          onChange = {inputChange}></textarea>
              </fieldset>

              <fieldset className="fieldset parent-position">
                

                <label className="label-text" htmlFor="lookForward">Today I look forward for</label>
                <div className="top-line"></div>
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
            <fieldset className="fieldset parent-position">
              <label className="label-text" htmlFor="notes">Notes</label>
              <div className="top-line"></div>
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
      </div>
    </>
  );
}
