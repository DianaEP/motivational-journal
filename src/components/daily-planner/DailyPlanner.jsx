import './DailyPlanner.css';

export default function DailyPlanner() {
  

    return (
      <>
        <div className='daily-elem'>
        <h2 className="planner-title">Daily planner</h2>
          <form className="form-planner" action="">
            <div className="section-one">
              
              <fieldset className="fieldset">
                <label className="label-text" htmlFor="wins">Daily wins </label>
                <textarea className="textarea-planner" name="wins" id="wins" cols="30" rows="10"></textarea>
              </fieldset>

              <fieldset className="fieldset">
                <label className="label-text" htmlFor="challenges">Daily challenges </label>
                <textarea className="textarea-planner" name="challenges" id="challenges" cols="30" rows="10"></textarea>
              </fieldset>

              <fieldset className="fieldset">
                <label className="label-text" htmlFor="adjustments">Daily adjustments </label>
                <textarea className="textarea-planner" name="adjustments" id="adjustments" cols="30" rows="10"></textarea>
              </fieldset>


            </div>
           

            <div className='section-two'>
              
              <div className='list-container'>
                <label className="label-text" htmlFor="to-do-list">To do list </label>
                <input className="list" id="to-do-list" type="text" />
                <button id='addToDo'>Add</button>
                <div className='to-dos' id="toDoContainer"></div>
              </div>
                
              

              <fieldset className="fieldset">
                <label className="label-text" htmlFor="reflections">Reflections </label>
                <textarea className="textarea-planner" name="reflections" id="reflections" cols="30" rows="10"></textarea>
              </fieldset>
            </div>

            <div className="buttons-planner-container">
                <button className="button-planner">Save</button>
                <button className="button-planner">Update</button>
            </div>
            
            
            
          </form>
        </div>
      </>
    )
  }