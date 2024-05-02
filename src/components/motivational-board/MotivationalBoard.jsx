import { useState } from "react";
import "./MotivationalBoard.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import pin from "../../assets/pin.png";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaFont } from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";
import { HiMenuAlt4 } from "react-icons/hi";

export default function MotivationalBoard() {
  // create card on click button
  const [cards, setCards] = useState([]);
  const [showStyleButtons, setShowStyleButtons] = useState(false);

  const showButtons = () => setShowStyleButtons(!showStyleButtons);

  const addNewCard = () => {
    const newCard = {
      id: cards.length + 1,
      name: "",
      text: "",
    };

    setCards([...cards, newCard]);
  };

  const nameChange = (event, cardId) => {
    const updatedName = cards.map((card) =>
      card.id === cardId ? { ...card, name: event.target.value } : card
    );
    setCards(updatedName);
  };

  const textChange = (event, cardId) => {
    const updatedText = cards.map((card) =>
      card.id === cardId ? { ...card, text: event.target.value } : card
    );
    setCards(updatedText);
  };

  return (
    <>
      <div className="board-wrapper">
        <div className="board-intro">
          <h1>Motivational Board</h1>
          <div className="create">
            <p>
              Life is to <span>short</span> to dream small.
            </p>
            <MdKeyboardDoubleArrowRight />
            <button className="create-btn" onClick={addNewCard}>
              Create a dream
            </button>
          </div>
        </div>

        <div className="display-cards">
          {cards.map((card) => (
            <div key={card.id} className="card-container">
              <img id="pin-img" src={pin} alt="pin" />
              <img src="https://picsum.photos/300/200" alt="Card image" />
              <input
                className="card-name-input"
                type="text"
                placeholder="Card name"
                value={card.name}
                onChange={(event) => nameChange(event, card.id)}
              />
              <textarea
                className="card-text-input"
                name="user-text"
                id=""
                cols="30"
                rows="10"
                placeholder="Say something about..."
                value={card.text}
                onChange={(event) => textChange(event, card.id)}
              ></textarea>

              <HiMenuAlt4 onClick={showButtons} />
              <div className="hidden-container">
                <div
                  className={showStyleButtons ? "hidden-style activated" : "hidden-style"}>
                  <div className="button-icons">
                    <button><FaFont /></button>
                    <button><FaArrowsRotate /></button>
                    <button><IoColorPaletteOutline /></button>
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
