import "./Journal.css";
import books from '../../assets/books.png';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Journal() {
  const [journalInputs, setJournalInputs] = useState([]);
  
  const [newInput, setNewInput] = useState({
    "id" : Date.now(),
    "date" : '',
    "grateful": "",
    "proud" : "",
    "lookForward" : "",
    "notes" : ""
  });


  // search for input !! not working
  // const [searchDateInput, setSearchDateInput] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();


  // search for input !! not working
  function searchByDate(date){
    const findDate = journalInputs.find((input) => input.date === date);
    if(findDate){
      setNewInput({...newInput})
    }else{
      setNewInput({
        date: '',
        grateful: '',
        proud: '',
        lookForward: '',
        notes: ''
      });
    }
  }

  // get
  useEffect(() => {
    fetch('http://localhost:3000/journalInputs')
      .then((response) => response.json())
      .then((data) => setJournalInputs(data));
  }, [newInput.date]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setNewInput((prev) => ({
      ...prev,
      [name]: value
    }));
    // console.log('Updated newEntry:', newInput);
  };


  // post
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



// put
  function userUpdate(){
    if (id){
      fetch(`http://localhost:3000/journalInputs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInput)
    })
    .then(() => {
      const updatedInputs = journalInputs.map((input)=>
              input.id === id ? {...input,...newInput} : input);
      setJournalInputs(updatedInputs);
      navigate('/journal');
      })
        .catch((error) =>{
          console.error('Error updating input:', error);
        });
    }
  }


  // delete
  const userDelete = (id) => {
    const userConfirmedAction = confirm('Are you sure you want to delete the movie?')


    if(userConfirmedAction){
      fetch(`http://localhost:3000/journalInputs/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          const updatedInputs = journalInputs.filter((entry) => entry.id !== id);
          setJournalInputs(updatedInputs);

          navigate('/journal');
        });
    }
 
  };



  return (
    <>
      <div className="form-elem">
        <div className="title-container">
            <img src={books} alt="tree" className="journal-image" />
            <h1 className="journal-title">Journal</h1>
        </div>
        
        {/* {searchDateInput && (
          
        )} */}
        <form className="form-journal" onSubmit={userSubmit}>

          <div className="date-container">
              <fieldset className="fieldset">
                <label className="label-text" htmlFor="date">Date</label>
                <input className="input-field"
                       type="date"
                       id="date" 
                       value={newInput.date} 
                       onChange = {(e) => setNewInput({ ...newInput, date: e.target.value })}
                        />
                <button onClick={() => searchByDate(newInput.date)}>Button search</button>
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
            <button className="button" type="submit">Save</button>
            <button className="button" onClick={() => userUpdate(journalInputs.id)}>Update</button>
            <button className="button" onClick={() => userDelete(journalInputs.id)}>Delete</button>
          </div>
        </form>
      </div>
    </>
  );
}
