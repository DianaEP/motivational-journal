import "./ToDoList.css";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function inputChange(event) {
    setNewTask(event.target.value)
  }

 function addTask(){
    if(newTask.trim() !== ''){
        setTasks([...tasks,{text: newTask.trim(), title: false}]);
        setNewTask('');
    }
    
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((elem, i) => i !== index);
    setTasks(updatedTasks);
  }

  const toggleTask = (index) =>{
    const updatedTasks = [...tasks];
    updatedTasks[index].title = !updatedTasks[index].title;
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
                    <span title={task.title}  className={task.title? 'span-item checked': 'span-item'} >{task.text}</span>
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
