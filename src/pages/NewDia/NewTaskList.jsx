import './NewTaskList.css'
import { useState } from 'react'
import api from '../../utils/api.utils'
import TaskButton from './TaskButton'

function NewTaskList(props) {
  const { tasks, shouldRefresh } = props

  const handleChange = (event, id) => {
    const newStatus = event.target.checked
    updateTaskStatus(id, newStatus)
  }

  const updateTaskStatus = async (id, status, title, description, userId) => {
    try {
      const taskData = {
        id: id,
        userId: userId,
        status: status,
        title: title,
        description: description
      }
      const response = await api.post(`/tasks/${id}/update`, taskData)
      
      shouldRefresh()
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error)
    }
  }
  
  
  return (
    <div>
      <ul>
        {tasks.map((task, id) => (
          <li
            key={id}
            className={task.status ? 'completed-task' : 'incomplete-task'}
          >
            <input
              type="checkbox"
              checked={task.status}
              onChange={(event) => handleChange(event, task.id)}
            />
            {task.title}{' '}
            <TaskButton taskid={task.id} shouldRefresh={shouldRefresh} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewTaskList