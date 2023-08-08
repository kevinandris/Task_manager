// ! Parent class
import { useState, useRef, useEffect, useReducer } from 'react'
import useLocalStorage from 'use-local-storage'
import './TaskManager.css'
import Task from './Task'
import Alert from '../alert/Alert'
import Confirm from '../confirm/Confirm'

const taskReducer = (state, action) => {
  if (action.type === "EMPTY_FIELD") {
    return {
      ...state, 
      isAlertOpen: true,
      alertContent: "Please enter name and date",
      alertClass: "danger"
    };
  }

  if (action.type === "CLOSE_ALERT") {
    return {
      ...state, 
      isAlertOpen: false,
    };
  }

  if (action.type === "ADD_TASK") {
    // console.log(action.payload)
    const allTasks = [...state.tasks, action.payload]

    return {
        ...state,
        tasks: allTasks, 
        isAlertOpen: true, 
        alertContent: "Task added successfully", 
        alertClass: "success"
    }
  }

  if (action.type === "OPEN_EDIT_MODAL") {
    console.log(action.payload)

    return {...state, 
      taskID: action.payload,
      isEditModalOpen: true, 
      modalTitle: "Edit Task",
      modalMsg: "You are about to edit this task",
      modalActionText: "Edit",
    }
  }

  if (action.type === "EDIT_TASK") {
    return {...state, isEditing: true}
  }
  
  return state;
};

const TaskManagerReducer = () => {
  
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [tasks, setTasks] = useLocalStorage("tasks", [])
  
  const initialState = {
    tasks,
    taskID: null,
    isEditing: false,
    isAlertOpen: false,
    alertContent: "This is an alert",
    alertClass: "danger",

    isEditModalOpen: false,
    isDeleteModalOpen: false,
    modalTitle: "Delete Task",
    modalMsg: "You are about to delete this task",
    modalActionText: "OK"
  }

  const [state, dispatch] = useReducer(taskReducer, initialState)

  const nameInputRef = useRef(null)

  useEffect(() => {
    nameInputRef.current.focus();
  })

  const closeAlert = () => {
    dispatch({
      type: "CLOSE_ALERT"
    })
  }

  const handleSubmit = (e) => {
    // preventing the page from refreshing
    e.preventDefault();

    if (!name || !date) {
      dispatch({
        type: "EMPTY_FIELDS"
      })
    }

    if (name && date) {
      const newTask = {
        id: Date.now(),
        name,
        date,
        complete: false
      }

      dispatch({
        type: "ADD_TASK",
        payload: newTask
      })

      setName("")
      setDate("")
      setTasks([...tasks, newTask])
    }

  };

  const openEditModal = (id) => {
    dispatch({
      type: "OPEN_EDIT_MODAL",
      payload: id
    })
  };

  //* Push (edit) the task to the task and date input when edit icon is clicked
  const editTask = () => {
    console.log(state.taskID);

    const id = state.taskID

    dispatch({
      type: "EDIT_TASK",
      payload: id,
    })

    const thisTask = state.tasks.find((task) => task.id === id)
    
    setName(thisTask.name)
    setDate(thisTask.date)
  }

  // delete function
  const deleteTask = (id) => {
    
  }

  // complete function
  const completeTask = (id) => {
    
  }

  const closeModal = (id) => {
    
  }
  
  return (
    <div className='--bg-primary'>
      {state.isAlertOpen && <Alert alertContent={state.alertContent} alertClass={state.alertClass} onCloseAlert={closeAlert}/> }

      {state.isEditModalOpen && <Confirm  modalTitle={state.modalTitle} modalMsg={state.modalMsg} modalActionText={state.modalActionText} modalAction={editTask} onCloseModal={closeModal}/>}
      
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

          <button className="--btn --btn-success --btn-block">{isEditing? "Edit Task" : "Save Task"}</button>
        </form>

       </div>
      </div>

      {/* //! DISPLAY TASK */}
      <article className='--flex-center --my2'>
        <div className="--width-500px --p">
          <h2 className='--text-light'>Task List</h2>
          <hr style={{ background: "#fff" }}/>

          {/* // ! CONDITION */}
          {state.tasks.length === 0 ? (
            <p className='--text-light'>No task added...</p>
          ) : (
            <div>
              {state.tasks.map((task) => {
                return <Task {...task} 
                  editTask={openEditModal} 
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