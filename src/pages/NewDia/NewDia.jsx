import './NewDia.css'
import NewTaskList from './NewTaskList'
import Sidebar from './SideBar'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api.utils'
import Loader from '../loader/Loader'
import { showDate } from '../../utils/date.utils'
import { getLabel } from '../../utils/date.utils'
import Calendario from './Calendario'
import AddTask from './AddTask'

function NewDia() {
  const {
    date = new Date()
      .toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      .split('/')
      .reverse()
      .join('-'),
  } = useParams()
  const [tasks, setTasks] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [input, setInput] = useState('')
  const shouldRefresh = () => setRefresh((prev) => !prev)
  const [addTaskOpen, SetAddTaskOpen] = useState(false)

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newTask = {
        title: input,
        status: false,
        date: date,
        user: 'rapha@mail.com',
      }

      const response = await api.post('/tasks/add', newTask)

      if (response.status !== 200)
        throw Error('Erro ao adicionar tarefa. Verifique o servidor.')
      setInput('')
      shouldRefresh()
    } catch (error) {
      console.error('Erro ao processar a requisição:', error)
    }
  }

  function OpenAddTask() {
    SetAddTaskOpen(!addTaskOpen)
  }

  if (!tasks) return <Loader />

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <hgroup>
            <h1>Good Morning, Sullivan!</h1>{' '}
            <h2>{`${getLabel(date)}${showDate(date)}`}</h2>
          </hgroup>
          <Calendario date={date} />
        </div>
        <NewTaskList tasks={tasks} shouldRefresh={shouldRefresh} />
        <div className="add-task-div">
          <button onClick={() => OpenAddTask()}>+ Adicionar Tarefa</button>
          {addTaskOpen && (
            <AddTask
              OpenAddTask={OpenAddTask}
              date={date}
              shouldRefresh={shouldRefresh}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default NewDia
