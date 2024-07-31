import './NewTaskList.css'
import { useState } from 'react'

function NewTaskList(props) {
  const { tasks } = props

  return (
    <div>
      <ul>
        {tasks.map((tasks, index) => (
          <li key={index}>
            <input type="checkbox" />
            {tasks.title} <button>...</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewTaskList
