import './DailyPlanner.css';
import minimalist from '../../assets/minimalist.jpeg';
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
        retrieveTasks(userId,setTasks, userAuth, navigate);
      }
      
    },[userAuth, navigate])
    // debugger
    console.log(tasks);

    
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
        
        const userConfirmedAction = await showConfirm('Are you sure you want to delete this task?') // confirmation box 
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
          <img src={minimalist} alt="tree" className="journal-image" />
          <h2 className="planner-title">Daily planner</h2>
          <p className='courage-text'>Having courage means overcoming extraordinary challenges,even though we aren&apos;t necessarily facing tough physical challenges like climbing a mountain,
          we deal with a variety of obstacles and a multitude of fears as a part of our daily lives.Recognizing your bravery, no matter how insignificant the situation may
          seem to you, is empowering.So write every day two things that you&apos;re afraid of or things that you&apos;re not comfortable with, and try to do at least one by the end of the day.
          If you&apos;re not prepared leave it for tomorrow. </p>
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
                    <div className="top-line-planner">Fears you&apos;ve overcome</div>
                    <div className='progress '>
                    {tasks.filter(task => task.completed).map(task => (
                      <div key={task.id}  className='completed-task' onClick ={()=>deleteCompletedTask(task)}>{task.text}</div>
                    ))}
                    </div>
              </div>

              

              
          </div> 
          <ConfirmComponent/>
          
          
        </div>
      </>
    )
  }