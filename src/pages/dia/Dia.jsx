import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../../src/App.css'
import Header from './Header'
import NewTask from './NewTask'
import TaskList from './TaskList'
import Loader from '../loader/Loader'
import api from '../../utils/api.utils'

function Dia() {
  const [tasks, setTasks] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const { date = new Date().toISOString().slice(0, 10) } = useParams()
  const navigate = useNavigate()
  const shouldRefresh = () => setRefresh((prev) => !prev)

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await api.get('/tasks', {
          params: { date },
        })
        setTasks(response.data.resposta)
        console.log(response.data.resposta)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    fetchDados()
  }, [date, refresh])

  const routeDescription = (taskId, date) => {
    navigate(`/${date}/${taskId}`)
  }

  const handleChange = (event, id) => {
    const newStatus = event.target.checked
    updateTaskStatus(id, newStatus)
  }

  const updateTaskStatus = async (id, status) => {
    try {
      const newStatus = { id: id, status: status }
      await api.post(`/tasks/${id}`, newStatus)
      shouldRefresh()
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      console.log(id)
      await api.delete(`/tasks/${id}`)
      const updatedTasks = tasks.filter((task) => task.id !== id)
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  if (!tasks) return <Loader />

  return (
    <main className="container">
      <article>
        <Header date={date} />
        <NewTask date={date} shouldRefresh={shouldRefresh} />
        <TaskList
          tasks={tasks}
          handleChange={handleChange}
          routeDescription={routeDescription}
          handleDelete={handleDelete}
          date={date}
        />
      </article>
    </main>
  )
}

export default Dia
