import './DailyPlanner.css';
import ToDoList from '../to-do-list/ToDoList';


export default function DailyPlanner() {
  

    return (
      <>
        <div className='daily-elem'>
          <h2 className="planner-title">Daily planner</h2>

          <div className='planner-container'>
            
              <div className='list-container'>
                  <ToDoList/>
                </div>

              <form className="form-planner" action="">

                <div className="section">
                  <div className="planner-card">
                    <label className="label-planner" htmlFor="wins">Daily wins </label>
                    <textarea className=" t-planner" name="wins" id="wins" cols="30" rows="10"></textarea>
                  </div>

                  <div className="planner-card">
                    <label className="label-planner" htmlFor="challenges">Daily challenges </label>
                    <textarea className=" t-planner" name="challenges" id="challenges" cols="30" rows="10"></textarea>
                  </div>

                  <div className="planner-card">
                    <label className="label-planner" htmlFor="adjustments">Daily adjustments </label>
                    <textarea className=" t-planner" name="adjustments" id="adjustments" cols="30" rows="10"></textarea>
                  </div>
                </div>


                <div className="section">
                  <div className="planner-card planner-img img1"></div>
                  <div className="planner-card">
                    <label className="label-planner" htmlFor="reflections">Reflections </label>
                    <textarea className=" t-planner" name="reflections" id="reflections" cols="30" rows="10"></textarea>
                  </div>
                  <div className="planner-card planner-img img2"></div>
                </div>
                  
                
                  

                <div className="section btn-cont ">
                    <button className="button-planner">Save</button>
                    <button className="button-planner">Update</button>
                </div>
                

                
                
              
              </form>
          </div> 
        </div>
      </>
    )
  }