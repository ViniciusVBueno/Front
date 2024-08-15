import { useState, useEffect } from 'react'
import './EditTask.css'
import Loader from '../loader/Loader'
import api from '../../utils/api.utils'
import { useNavigate } from 'react-router-dom'

function EditTask(props) {
  const { openTaskEditor, taskid, shouldRefresh } = props
  const [description, setDescription] = useState('')
  const [taskTitleInput, setTaskTitleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [task, setTask] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await api.get(`/tasks/${taskid}`)
        setTask(response.data.task)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    fetchDados()
  }, [])

  const handleChangeTitle = (event) => {
    setTaskTitleInput(event.target.value)
  }

  const handleChangeDescription = (event) => {
    setDescriptionInput(event.target.value)
  }

  const addDescription = async (event) => {
    console.log(descriptionInput)
    event.preventDefault()
    try {
      const editedTask = {
        id: task.id,
        description: descriptionInput,
        title: taskTitleInput,
      }

      const response = await api.post(`/tasks/${taskid}`, editedTask)

      if (response.status !== 200)
        throw new Error('Erro ao adicionar descrição. Verifique o servidor.')

      setDescriptionInput('')
      openTaskEditor()
    } catch (error) {
      console.error('Erro ao processar a requisição:', error)
    }
    shouldRefresh()
  }

  if (!task) return <Loader />

  return (
    <div className="edit-task">
      <span>Nome da Tarefa: {task.title}</span>
      <input
        type="text"
        value={taskTitleInput}
        onChange={handleChangeTitle}
      />{' '}
      <span>Descrição: {task.description}</span>{' '}
      <textarea
        name="descrição"
        id="descrição"
        value={descriptionInput}
        onChange={handleChangeDescription}
      ></textarea>
      <div>
        <button onClick={addDescription}>Salvar Alterações</button>
        <button onClick={() => openTaskEditor()}>Cancelar</button>
      </div>
    </div>
  )
}

export default EditTask
