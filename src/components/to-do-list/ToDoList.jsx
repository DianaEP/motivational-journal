import "./ToDoList.css";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import PropTypes from "prop-types";



export default function ToDoList({tasks, addTask, updateTask, deleteTask}) {
  
  const [newTask, setNewTask] = useState('');

  function inputChange(event) {
    setNewTask(event.target.value)
  }

  function userAddTask(e){
    e.preventDefault();
    if(newTask.trim() !== ''){ 
      addTask(newTask);
      setNewTask('');
     }
  }

  function userUpdateTask(e, task){
    e.preventDefault();
    updateTask(task)
  }

  function userDeleteTask(e, task){
    e.preventDefault();
    deleteTask(task)
  }

  
  

  return (
    <>
      <div className="to-do-list">
        <label className="label-list-text" htmlFor="to-do-list">Bravery list</label>
        <div className="container-task">
            <input className="list" 
                   id="to-do-list" 
                   type="text" 
                   placeholder="Enter a task..."
                   value = {newTask}
                   onChange={inputChange}
            />
            <button className="add-button" onClick={(e) => userAddTask(e)}>Add</button>
        </div>
       
        <ul className="scrollbar-list">
            {tasks.map((task) => 
                <li className="list-item" key={task.id}>
                    <span  className={task.completed? 'span-item checked': 'span-item'} >{task.text}</span>
                    <div>
                      <IoMdDoneAll  className="item-update update-checked" onClick={(e) => userUpdateTask(e, task)}/>
                      <RiDeleteBin5Line className="item-update update-delete" onClick={(e) => userDeleteTask(e, task)}/>
                    </div>
                    
                </li>
                
            )}
        </ul>
      </div>

    </>
  );
}

ToDoList.propTypes = {
  tasks: PropTypes.any,
  addTask: PropTypes.any,
  updateTask: PropTypes.any,
  deleteTask: PropTypes.any,
  
};
