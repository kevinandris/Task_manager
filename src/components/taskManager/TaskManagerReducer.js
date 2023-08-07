// ! Parent class
import { useState, useRef, useEffect } from 'react'
import useLocalStorage from 'use-local-storage'
import './TaskManager.css'
import Task from './Task'
import Alert from '../alert/Alert'

const TaskManagerReducer = () => {

  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [tasks, setTasks] = useLocalStorage("tasks", [])
  
  const [taskID, setTaskID] = useState(null)
  const [isEditing, setIsEditing] = useState(false);

  const nameInputRef = useRef(null)

  useEffect(() => {
    nameInputRef.current.focus();
  })

  const handleSubmit = (e) => {
    // preventing the page from refreshing
    e.preventDefault();

    // To check if values are stored
    console.log(name)
    console.log(date)

    if (!name && !date || !name || !date) {
      alert("Please enter task name and date");
    } else if (name && date && isEditing) {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskID) {
            return {...task, name, date, complete: false}
          }

          return task;
        })
      )
      setName("")
      setDate("")
      setIsEditing(false)
      setTaskID(null)
    } else {
      const newTask = {
        id: Date.now(),
        name,
        date,
        complete: false,
      }

      console.log(newTask);

      setTasks([...tasks,newTask])
      setName("")
      setDate("")
    }
  };

  //* Push (edit) the task to the task and date input when edit icon is clicked
  const editTask = (id) => {
    const thisTask = tasks.find((task) => task.id === id)
    setIsEditing(true)
    setTaskID(id)
    setName(thisTask.name)
    setDate(thisTask.date)
  }

  // delete function
  const deleteTask = (id) => {
    // to check the id for every data
    console.log(id);

    if (window.confirm("Delete this task") === true) {
      const newTask = tasks.filter((task) => task.id !== id)
      setTasks(newTask);
    }
  }

  // complete function
  const completeTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {...task, complete: true}
        }

        return task;
      })
    )
  }
  
  return (
    <div className='--bg-primary'>
      <Alert />
      <h2 className='--text-center --text-light'>Task Manager Reducer</h2>

      <div className='--flex-center --p'>
       <div className="--card --bg-light --width-500px --p --flex-center">

        {/* //! FORM */}
        <form onSubmit={handleSubmit} className='form --form-control'>
          <div>
            <label htmlFor="name">Task:</label>
            <input ref={nameInputRef} type="text" placeholder='Task name' name='name' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          
          <div>
            <label htmlFor="name">Date:</label>
            <input type="date" placeholder='Task name' name='date' value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>

          <button className="--btn --btn-success --btn-block">{isEditing ? "Edit Task" : "Save Task"}</button>
        </form>

       </div>
      </div>

      {/* //! DISPLAY TASK */}
      <article className='--flex-center --my2'>
        <div className="--width-500px --p">
          <h2 className='--text-light'>Task List</h2>
          <hr style={{ background: "#fff" }}/>

          {/* // ! CONDITION */}
          {tasks.length === 0 ? (
            <p className='--text-light'>No task added...</p>
          ) : (
            <div>
              {tasks.map((task) => {
                return <Task{...task} 
                  editTask={editTask} 
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                />
              })}
            </div>
          )}

        </div>
      </article>

    </div>
  )
}

export default TaskManagerReducer;