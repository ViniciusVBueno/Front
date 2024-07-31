import './NewDia.css'
import NewTaskList from './NewTaskList'
import Sidebar from './SideBar'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api.utils'
import Loader from '../loader/Loader'
import { showDate } from '../../utils/date.utils'
import { getLabel } from '../../utils/date.utils'

function NewDia() {
  const { date = new Date().toISOString().slice(0, 10) } = useParams()
  const [tasks, setTasks] = useState(null)
  const [refresh, setRefresh] = useState(false)

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

  if (!tasks) return <Loader />

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <div className="greetings">
            <h2>Bom dia, Rapha Vieira</h2>{' '}
            <p>{`${getLabel(date)}${showDate(date)}`}</p>
          </div>
          <button>day</button>
        </div>
        <NewTaskList tasks={tasks} />
        <div className="add-task-div">
          <input
            type="text"
            className="input"
            placeholder="Crie uma nova tarefa"
          />
          <button className="add-task">+</button>
        </div>
      </div>
    </div>
  )
}

export default NewDia
