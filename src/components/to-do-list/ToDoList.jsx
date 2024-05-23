import "./ToDoList.css";
import { useContext, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import { retrieveTasks, taskSubmit } from "../../fetch/fetch";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../App";
import { v4 as uuidv4 } from 'uuid';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const {userAuth} = useContext(UserAuthContext);
  const navigate = useNavigate();

  function inputChange(event) {
    setNewTask(event.target.value)
  }

  useEffect(()=>{
    if(userAuth){
      const userId = userAuth.userId
      retrieveTasks(userId,setTasks, userAuth, navigate )
    }
    
  },[userAuth, navigate])

 function addTask(){
    if(newTask.trim() !== ''){
        // setTasks([...tasks,{text: newTask.trim(), title: false}]);
        // setNewTask('');
        const task = { 
          id : uuidv4(),
          text: newTask.trim(), 
          completed: false }
        taskSubmit({ ...task, userId: userAuth.userId }, userAuth, setTasks, setNewTask)
    }
    
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((elem, i) => i !== index);
    setTasks(updatedTasks);
  }

  const toggleTask = (index) =>{
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  

  return (
    <>
      <div className="to-do-list">
        <label className="label-list-text" htmlFor="to-do-list">To do list</label>
        <div className="container-task">
            <input className="list" 
                id="to-do-list" 
                type="text" 
                placeholder="Enter a task..."
                value = {newTask}
                onChange={inputChange}
            />
            <button className="add-button" onClick={addTask}>Add</button>
        </div>
       
        <ul>
            {tasks.map((task, index) => 
                <li className="list-item" key={index}>
                    <span title={task.completed.toString()}  className={task.completed? 'span-item checked': 'span-item'} >{task.text}</span>
                    <div>
                      <IoMdDoneAll  className="item-update update-checked" onClick={() => toggleTask(index)}/>
                      <RiDeleteBin5Line className="item-update update-delete" onClick={() => deleteTask(index)}/>
                    </div>
                    
                </li>
                
            )}
        </ul>
      </div>

    </>
  );
}
