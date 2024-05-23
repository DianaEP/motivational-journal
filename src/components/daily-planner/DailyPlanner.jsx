import './DailyPlanner.css';
import ToDoList from '../to-do-list/ToDoList';


export default function DailyPlanner() {
  

    return (
      <>
        <div className='daily-elem'>
          <h2 className="planner-title">Daily planner</h2>

          <div className='planner-container '>
              <div className="planner-card">
                  <div className="top-line-planner"></div>
                  <div className='progress '></div>
              </div>
              

              <div className='list-container'>
                  <ToDoList/>
                </div>

                <div className="planner-card">
                    <div className="top-line-planner"></div>
                    <div className='progress'></div>
              </div>

              

              
          </div> 
        </div>
      </>
    )
  }