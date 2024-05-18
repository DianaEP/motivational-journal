import { useContext, useEffect, useState } from "react";
import "./MotivationalCards.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import pin from "../../assets/pin.png";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaFont } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { v4 as uuidv4 } from 'uuid';
import { UserAuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { cardDelete, cardSubmit, cardUpdate, retrieveCards } from "../../fetch/fetch";
import { SlCloudUpload } from "react-icons/sl";



export default function MotivationalCards() {
  
  const {userAuth} = useContext(UserAuthContext);
  const navigate = useNavigate();
 

  // create card on click button
  const [cards, setCards] = useState([]);

  useEffect(()=>{
    if(userAuth){
      const userId = userAuth.userId
      retrieveCards(userId,setCards, userAuth, navigate)
    }
    
  },[userAuth, navigate])


  const inputChange = (e, cardId, name) => {
    const { value } = e.target;
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, [name]: value } : card
    );
    setCards(updatedCards);
  };

  // create card on click button
  const addNewCard = () => {
    const newCard = {
      id: uuidv4(),
      name: "",
      text: "",
      showStyleButtons: false, //add the showStyleButtons property
      font: false,
      rotation: false,
      image: null
    };
    setCards([...cards, newCard]);
  };

  // image with base64
  const imageChange = (e, cardId) => {
    const file = e.target.files[0]; //retrieves the first file selected by the user in the file input
    console.log(e.target.files);
    if (file) { // file was indeed selected by the user
      const reader = new FileReader(); // read the contents of files asynchronously
      reader.onloadend = () => { //event handler that fires when the reading operation is completed
        const updatedCards = cards.map((card) =>
          card.id === cardId ? { ...card, image: reader.result } : card //contains the data URL representing the file's data as a base64 encoded string
        );
        setCards(updatedCards); //updates the state where the specified card's image has been updated
      };
      reader.readAsDataURL(file); //reader to start reading the contents of the specified file as a data URL
    }
  };


  // hide or show the buttons only on the card you pressed the buttons
  const toggleButtons = (cardId) => {
    const updateButtons = cards.map((card) =>
        card.id === cardId? { ...card, showStyleButtons: !card.showStyleButtons }: card); // toggle between false and true
      
    setCards(updateButtons);
  };


  // toggle between fonts 
  
  const toggleFont = (cardId) => {
    const updateFont = cards.map((card) =>
        card.id === cardId? { ...card, font: !card.font }: card); // toggle between false and true
    setCards(updateFont);
  };



  // toggle between rotation card
  const toggleRotation = (cardId) => {
    const updateRotation = cards.map((card) =>
        card.id === cardId? { ...card, rotation: !card.rotation }: card); // toggle between false and true
      
    setCards(updateRotation);
  };

 



// POST
  
  async function saveCard(e, cardId){
    e.preventDefault();
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      // at least one input field is filled
      if (card.name.trim() !== '' || card.text.trim() !== '') {
        await cardSubmit({ ...card, userId: userAuth.userId }, userAuth, setCards);
      } else {
        alert('Please fill at least one input field'); // alert box ERROR
      }
    }
  }




// PUT

async function updateCard(e, cardId){
  e.preventDefault();
  const card = cards.find((c) => c.id === cardId);
  if (card) {
    await cardUpdate({ ...card, userId: userAuth.userId }, userAuth, setCards);
  }
}


// DELETE

async function deleteCard(e, cardId){
  e.preventDefault();
  if (confirm('Are you sure you want to delete the input?')) {
    await cardDelete(cardId, userAuth, setCards);
  }
}

  return (
    <>
      <div className="board-wrapper">
        <div className="board-intro">
          <h1>Motivational Cards</h1>
          <div className="create">
            <p>Life is to <span>short</span> to dream small.</p>
            <MdKeyboardDoubleArrowRight />
            <button className="create-btn" onClick={addNewCard}>Create a dream</button>
          </div>
        </div>

        <div className="display-cards">
          {cards.map((card) => (
            <div key={card.id} className={card.rotation ? "card-container card-rotation" : "card-container" }>
              <div className="image-file">
                <img id="pin-img" src={pin} alt="pin" />
                {card.image ? <img className="upload-img" src={card.image} alt="Card image" /> 
                                : 
                              <div className="upload-msg">
                                  <div className="design-upload">
                                      <SlCloudUpload />
                                      Upload image
                                  </div>
                              </div>} {/* Only show image if it exists */}
                {/* <label htmlFor="file" className="custom-button"><BsUpload /></label> */}
                <input type="file" 
                       title = ''
                       className="input-file" 
                       onChange={(e) => imageChange(e, card.id)} 
                       accept="image/*" /> {/* Image upload input */}
                
                
              </div>
                 
              <input
                className={card.font ? "card-name-input change-font-input" : "card-name-input" }
                type="text"
                placeholder="Card name"
                value={card.name}
                onChange={(e) => inputChange(e, card.id, 'name')}
              />
              <textarea
                className={card.font ? "card-text-input change-font-textarea" : "card-text-input" }
                name="user-text"
                id=""
                cols="30"
                rows="10"
                placeholder="Say something about..."
                value={card.text}
                onChange={(e) => inputChange(e, card.id, 'text')}
              ></textarea>

              <HiMenuAlt4 onClick={() => toggleButtons(card.id)} />
              <div className="hidden-container">
                <div className={card.showStyleButtons ? "hidden-style activated" : "hidden-style" }>
                  <div className="button-icons">
                    <button onClick={() => toggleFont(card.id)}><FaFont /></button>
                    <button onClick={() => toggleRotation(card.id)}><FaArrowsRotate /></button>
                  </div>

                  <button onClick={(e) => saveCard(e, card.id)} >Save</button>
                  <button onClick={(e) => updateCard(e, card.id)}>Update</button>
                  <button onClick={(e) => deleteCard(e, card.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
