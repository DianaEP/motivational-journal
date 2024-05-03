import './DailyPlanner.css';
import ToDoList from '../to-do-list/ToDoList';

export default function DailyPlanner() {
  

    return (
      <>
        <div className='daily-elem'>
          <h2 className="journal-title">Daily planner</h2>

          <div className='planner-container'>
            
              <div className='list-container'>
                  <ToDoList/>
                </div>

              <form className="form-planner" action="">

                <div className="section-one">
                  <fieldset className="fieldset">
                    <label className="label-text" htmlFor="wins">Daily wins </label>
                    <textarea className=" t-planner" name="wins" id="wins" cols="30" rows="10"></textarea>
                  </fieldset>

                  <fieldset className="fieldset">
                    <label className="label-text" htmlFor="challenges">Daily challenges </label>
                    <textarea className=" t-planner" name="challenges" id="challenges" cols="30" rows="10"></textarea>
                  </fieldset>

                  <fieldset className="fieldset">
                    <label className="label-text" htmlFor="adjustments">Daily adjustments </label>
                    <textarea className=" t-planner" name="adjustments" id="adjustments" cols="30" rows="10"></textarea>
                  </fieldset>
                </div>

                <div className='section-two'>
                    <fieldset className="fieldset">
                      <label className="label-text" htmlFor="reflections">Reflections </label>
                      <textarea className=" t-planner" name="reflections" id="reflections" cols="30" rows="10"></textarea>
                    </fieldset>
                </div>

                <div className="buttons-container">
                    <button className="button-planner">Save</button>
                    <button className="button-planner">Update</button>
                </div>
              
              </form>
          </div> 
        </div>
      </>
    )
  }