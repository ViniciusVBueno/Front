import { useState, useEffect } from 'react'
import './EditTask.css'
import Loader from '../loader/Loader'
import api from '../../utils/api.utils'
import { useNavigate } from 'react-router-dom'
import { Input, Textarea, Button } from '@mui/joy'

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
  }, [taskid])

  const handleChangeTitle = (event) => {
    setTaskTitleInput(event.target.value)
  }

  const handleChangeDescription = (event) => {
    setDescriptionInput(event.target.value)
  }

  const addDescription = async (event) => {
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
      <Input
        placeholder="Nome da Tarefa"
        value={taskTitleInput}
        onChange={handleChangeTitle}
      />
      <span>Descrição: {task.description}</span>
      <Textarea
        placeholder="Descrição"
        minRows={3}
        value={descriptionInput}
        onChange={handleChangeDescription}
      />
      <div className="button-edit">
        <Button variant="outlined" onClick={addDescription}>
          Salvar
        </Button>
        <Button variant="outlined" onClick={() => openTaskEditor()}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default EditTask
