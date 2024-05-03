import "./Journal.css";
import books from '../../assets/books.png';

export default function Journal() {
  return (
    <>
      <div className="form-elem">
        <div className="title-container">
            <img src={books} alt="tree" className="journal-image" />
            <h1 className="journal-title">Journal</h1>
        </div>
        
        <form className="form-journal" action="">

          <div className="date-container">
              <fieldset className="fieldset">
                <label className="label-text" htmlFor="date">Date</label>
                <input className="input-field" id="date" type="date" />
              </fieldset>
            </div>

          <div className="sections">
            
            <div className="first-section">
              
              <fieldset className="fieldset parent-position">
                <div className="top-left"></div>

                <label className="label-text" htmlFor="grateful">Today I am grateful for</label>
                <textarea className="textarea" name="grateful" id="grateful" cols="30" rows="10"></textarea>
              </fieldset>

              <fieldset className="fieldset parent-position">
                <div className="top-left"></div>

                <label className="label-text" htmlFor="proud">Today I am proud of</label>
                <textarea className="textarea" name="proud" id="proud" cols="30" rows="10"></textarea>
              </fieldset>

              <fieldset className="fieldset parent-position">
                <div className="top-left"></div>

                <label className="label-text" htmlFor="lookForward">Today I look forward for</label>
                <textarea className="textarea" name="lookForward" id="lookForward" cols="30" rows="10"></textarea>
              </fieldset>
            </div>


            <div className="second-section">
            <fieldset className="fieldset parent-position">
              <div className="top-left"></div>

              <label className="label-text" htmlFor="notes">Notes</label>
              <textarea className="textarea t-notes" name="notes" id="notes" cols="30" rows="10" ></textarea>
            </fieldset>
          </div>
          </div>

         

          <div className="buttons-container">
            <button className="button">Save</button>
            <button className="button">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}
