import { useState } from 'react'
import './TaskButton.css'

function TaskButton() {
  const [isOpen, setIsOpen] = useState(false)

  function openOptions() {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {' '}
      {
        //problema está nessa div
      }
      <button onClick={() => openOptions()}>...</button>{' '}
      {isOpen && (
        <div className="task-options">
          <div>Deletar</div>
          <div>Editar</div>
        </div>
      )}{' '}
    </div>
  )
}

export default TaskButton
