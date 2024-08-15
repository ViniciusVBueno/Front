import { useState } from 'react'
import './AddTask.css'
import DatePicker from 'react-datepicker'
import api from '../../utils/api.utils'
import { useNavigate } from 'react-router-dom'
import { parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function AddTask(props) {
  const { OpenAddTask, shouldRefresh, date } = props
  const [input, setInput] = useState('')
  const [selectedDate, setSelectedDate] = useState(parseISO(date))
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newTask = {
        title: input,
        date: selectedDate,
        userId: 1,
      }

      const response = await api.post('/tasks/add', newTask)

      if (response.status !== 200)
        throw Error('Erro ao adicionar tarefa. Verifique o servidor.')
      setInput('')
      shouldRefresh()
    } catch (error) {
      console.error('Erro ao processar a requisição:', error)
    }
    OpenAddTask()
  }

  const handleDateChange = (date) => {
    const dataTratada = date.toISOString().slice(0, 10)
    setSelectedDate(date)
    navigate(`/${dataTratada}`)
  }

  return (
    <div className="add-task-screen">
      <input
        type="text"
        placeholder="Nome da Tarefa"
        onChange={(event) => setInput(event.target.value)}
      />
      <textarea
        name="descrição"
        id="descrição"
        placeholder="Descrição"
      ></textarea>
      <DatePicker
        open={true}
        className="calendario"
        selected={selectedDate}
        onChange={handleDateChange}
        locale={ptBR}
      />
      <div className="button-div">
        <button onClick={handleSubmit}>Salvar</button>
        <button onClick={() => OpenAddTask()}>Cancelar</button>
      </div>
    </div>
  )
}

export default AddTask
