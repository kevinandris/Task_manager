import React from 'react'
import './TaskManager.css'

const TaskManager = () => {
  return (
    <div className='--bg-primary'>
      <h1 className='--text-center --text-light'>Tasks Manager</h1>
      <div className='--flex-center --p'>
       <div className="--card --bg-light --width-500px --p --flex-center">

        <form className='form --form-control'>
          <div>
            <label htmlFor="name">Task:</label>
            <input type="text" placeholder='Task name' name='name'/>
          </div>
          
          <div>
            <label htmlFor="name">Task:</label>
            <input type="date" placeholder='Task name' name='date'/>
          </div>

          <button className="--btn --btn-success --btn-block">Save Task</button>
        </form>

       </div>
      </div>
    </div>
  )
}

export default TaskManager