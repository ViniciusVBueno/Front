import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { formatarDataParaExibicao, obterLabelDia } from '../../utils/Data'
import '../../../src/App.css'
import Header from '../dia/components/Header'
import NewTask from '../dia/components/NewTask'
import TaskList from '../dia/components/TaskList'

function Dia() {
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState(null)
  const { date = new Date().toISOString().slice(0, 10) } = useParams()
  const navigate = useNavigate()

  const formattedDate = formatarDataParaExibicao(date)

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get(
          'https://bueno-devs-todo-api.fly.dev/tasks',
          {
            params: { date },
          }
        )
        setTasks(response.data.resposta)
        console.log(response.data.resposta)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    fetchDados()
  }, [date])

  const routeDescription = (taskId, date) => {
    navigate(`/${date}/${taskId}`)
  }

  const handlePrevDay = () => {
    const prevDate = new Date(date)
    prevDate.setDate(prevDate.getDate() - 1)
    navigate(`/${prevDate.toISOString().slice(0, 10)}`)
  }

  const handleNextDay = () => {
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)
    navigate(`/${nextDate.toISOString().slice(0, 10)}`)
  }

  const handleChange = (event, id) => {
    const newStatus = event.target.checked
    updateTaskStatus(id, newStatus)
  }

  const updateTaskStatus = async (id, status) => {
    try {
      console.log(status)
      const newStatus = { id: id, status: status }
      await axios.post(
        `https://bueno-devs-todo-api.fly.dev/tasks/${id}`,
        newStatus
      )
      console.log(id)
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
      const sortedTasks = updatedTasks.sort((a, b) => a.status - b.status)
      setTasks(sortedTasks)
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const newTask = {
        title: input,
        status: false,
        date: date,
        user: 'rapha',
      }

      const response = await axios.post(
        'https://bueno-devs-todo-api.fly.dev/tasks/add',
        newTask
      )
      console.log(newTask)
      if (response.status === 200) {
        const updatedTasks = [...tasks, newTask] //bug
        setTasks(updatedTasks)
        setInput('')
      } else {
        console.error('Erro ao adicionar tarefa. Verifique o servidor.')
      }
    } catch (error) {
      console.error('Erro ao processar a requisição:', error)
    }
  }

  const handleDelete = async id => {
    try {
      console.log(id)
      await axios.delete(`https://bueno-devs-todo-api.fly.dev/tasks/${id}`)
      const updatedTasks = tasks.filter(task => task.id !== id)
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  return (
    <main className="container">
      {tasks ? (
        <article>
          <Header
            handlePrevDay={handlePrevDay}
            handleNextDay={handleNextDay}
            dateLabel={obterLabelDia(date)}
            formattedDate={formattedDate}
          />
          <NewTask
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
          />
          <TaskList
            tasks={tasks}
            handleChange={handleChange}
            routeDescription={routeDescription}
            handleDelete={handleDelete}
            date={date}
          />
        </article>
      ) : (
        <p>Carregando..</p>
      )}
    </main>
  )
}

export default Dia
