import { useState } from "react";
import "./MotivationalCards.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import pin from "../../assets/pin.png";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaFont } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";



export default function MotivationalCards() {
  // create card on click button
  const [cards, setCards] = useState([]);


  // create card on click button
  const addNewCard = () => {
    const newCard = {
      id: cards.length + 1,
      name: "",
      text: "",
      showStyleButtons: false, //add the showStyleButtons property
      font: false,
      rotation: false,
      
    };

    setCards([...cards, newCard]);
  };

  const nameChange = (event, cardId) => {
    const updatedName = cards.map((card) =>
      card.id === cardId ? { ...card, name: event.target.value } : card);
    setCards(updatedName);
  };

  const textChange = (event, cardId) => {
    const updatedText = cards.map((card) =>
      card.id === cardId ? { ...card, text: event.target.value } : card);
    setCards(updatedText);
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
              <img id="pin-img" src={pin} alt="pin" />
              <img src="https://picsum.photos/300/200" alt="Card image" />
              <input
                className={card.font ? "card-name-input change-font-input" : "card-name-input" }
                type="text"
                placeholder="Card name"
                value={card.name}
                onChange={(event) => nameChange(event, card.id)}
              />
              <textarea
                className={card.font ? "card-text-input change-font-textarea" : "card-text-input" }
                name="user-text"
                id=""
                cols="30"
                rows="10"
                placeholder="Say something about..."
                value={card.text}
                onChange={(event) => textChange(event, card.id)}
              ></textarea>

              <HiMenuAlt4 onClick={() => toggleButtons(card.id)} />
              <div className="hidden-container">
                <div className={card.showStyleButtons ? "hidden-style activated" : "hidden-style" }>
                  <div className="button-icons">
                    <button onClick={() => toggleFont(card.id)}><FaFont /></button>
                    <button onClick={() => toggleRotation(card.id)}><FaArrowsRotate /></button>
                  </div>
                  <button>Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
