import "./ToDoList.css";
import { useState } from "react";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function inputChange(event) {
    setNewTask(event.target.value)
  }

  function addTask() {
    if(newTask.trim() !== ''){
        setTasks(prev =>[...prev,newTask]);
        setNewTask('');
    }
    
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((elem, i) => i !== index);
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
                    <span>{task}</span>
                    <button className="delete-button" 
                            onClick={() => deleteTask(index)}>
                            Delete</button>
                </li>
                
            )}
        </ul>
      </div>

    </>
  );
}
