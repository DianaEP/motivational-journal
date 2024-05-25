import './DailyPlanner.css';
import ToDoList from '../to-do-list/ToDoList';
import { retrieveTasks, taskDelete, taskSubmit, taskUpdate } from '../../fetch/fetch';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../App';
import { v4 as uuidv4 } from 'uuid';
import useConfirm from '../custom-boxes/confirm-box/ConfirmBox';


export default function DailyPlanner() {
    const [tasks, setTasks] = useState([]);
    const {userAuth} = useContext(UserAuthContext);
    const navigate = useNavigate();
    const { showConfirm, ConfirmComponent } = useConfirm();

    useEffect(()=>{
      if(userAuth){
        const userId = userAuth.userId
        retrieveTasks(userId,setTasks, userAuth, navigate )
      }
      
    },[userAuth, navigate])
  
   function addTask(newTask){
     
        const task = { 
          id : uuidv4(),
          text: newTask.trim(), 
          completed: false,
          userId: userAuth.userId 
        }
        taskSubmit(task, userAuth, setTasks)
           
    }
     
    const updateTask = (taskToUpdate) =>{

      const updatedTasks = tasks.map(task => task.id === taskToUpdate.id ? {...task, completed: !task.completed} : task)
      taskUpdate({ ...taskToUpdate, completed: !taskToUpdate.completed }, userAuth, setTasks, updatedTasks)
      }
  
    
  
    async function deleteTask(taskToDelete) {
      
      try{
        
        const userConfirmedAction = await showConfirm('Are you sure you want to delete the input?') // confirmation box 
        if(userConfirmedAction){
          const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
          await taskDelete(taskToDelete, userAuth, setTasks, updatedTasks)
        }
      }catch(error) {
        if (error !== false) {
          console.error('Error deleting task:', error);
        } else {
          console.log('Task deletion canceled by user.');
        }
        }
      
    }

    function deleteCompletedTask(task){
      deleteTask(task);
    }
  
    
    

    return (
      <>
        <div className='daily-elem'>
          <h2 className="planner-title">Daily planner</h2>

          <div className='planner-container '>

              <div className='list-container'>
                  <ToDoList
                    tasks={tasks.filter(task => !task.completed)} 
                    addTask={addTask} 
                    deleteTask={deleteTask} 
                    updateTask={updateTask} 
                  />
                </div>

                <div className="planner-card">
                    <div className="top-line-planner"></div>
                    <div className='progress'>
                    {tasks.filter(task => task.completed).map(task => (
                      <span key={task.id}  onClick ={()=>deleteCompletedTask(task)}>{task.text}</span>
                    ))}
                    </div>
              </div>

              

              
          </div> 
          <ConfirmComponent/>
        </div>
      </>
    )
  }