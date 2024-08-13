import { useRef, useState, useEffect } from 'react'
import api from '../../utils/api.utils'
import './TaskButton.css'
import EditTask from './EditTask'
import { IoMdMore } from 'react-icons/io'

function TaskButton(props) {
  const { taskid, shouldRefresh } = props
  const [isOpen, setIsOpen] = useState(false)
  const [editTaskOpen, setEditTaskOpen] = useState(false)
  const taskButtonRef = useRef(null)

  function openOptions() {
    setIsOpen(!isOpen)
  }

  function openTaskEditor() {
    setEditTaskOpen(!editTaskOpen)
  }

  const handleDelete = async (id) => {
    try {
      console.log(id)
      await api.delete(`/tasks/${id}`)
      shouldRefresh()
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        taskButtonRef.current &&
        !taskButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="task-options-div">
      <button onClick={() => openOptions()}>
        <IoMdMore />
      </button>{' '}
      {isOpen && (
        <div className="task-options" ref={taskButtonRef}>
          <div onClick={() => handleDelete(taskid)}>Deletar</div>
          <div onClick={() => openTaskEditor(taskid)}>Editar</div>
        </div>
      )}{' '}
      {editTaskOpen && (
        <EditTask openTaskEditor={openTaskEditor} taskid={taskid} />
      )}{' '}
      {editTaskOpen && <div className="overlay"></div>}
    </div>
  )
}

export default TaskButton
