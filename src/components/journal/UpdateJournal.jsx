import "./Journal.css";
import books from '../../assets/books.png';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



export default function UpdateDeleteJournalInput(){

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


    // GET the specific input based on id

    useEffect(() => {
      fetch(`http://localhost:3000/journalInputs/${id}`)
        .then((response) => response.json())
        .then((data) =>{
          setInput(data);
          setEditedInput(data);
        })
        .catch((error) => console.error('Error fetching journal entry:', error));
    }, [id]);
  
  
    const inputChange = (e) => {
      const { name, value } = e.target;
      setEditedInput((prev) => ({
        ...prev,
        [name]: value
      }));
    };


    // PUT update the current input

    const userUpdate = (e) => {
        e.preventDefault(); //prevent refresh
        fetch(`http://localhost:3000/journalInputs/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedInput)
        })
          .then(() => {
            navigate('/journal'); // go back to journal page after update
          })
          .catch((error) => {
            console.error('Error updating journal entry:', error);
            // I NEED AN ALERT HERE!!!!!!!
          });
      };



    //   DELETE the current input

       const userDelete = (id) => {
        const userConfirmedAction = confirm('Are you sure you want to delete the movie?')


        if(userConfirmedAction){
            fetch(`http://localhost:3000/journalInputs/${id}`, {
            method: 'DELETE'
            })
            .then(() => {
                 navigate('/journal');
            })
            .catch((error) => {
                console.error('Error deleting journal entry:', error);
                // I NEED AN ALERT HERE
        })
 
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
              <img src={books} alt="tree" className="journal-image" />
              <h1 className="journal-title">Journal</h1>
          </div>
          
          <form className="form-journal" >
  
            <div className="date-container">
                <fieldset className="fieldset">
                  <label className="label-text" htmlFor="date">Date</label>
                  <input className="input-field"
                         type="date"
                         id="date" 
                         value={editedInput.date} 
                         onChange = {inputChange}
                          />
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
                            value={editedInput.grateful} 
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
                            value={editedInput.proud} 
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
                            value={editedInput.lookForward} 
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
        </div>
      </>
    )
  
  
}