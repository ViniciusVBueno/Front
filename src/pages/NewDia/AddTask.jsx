import { useState } from 'react'
import './AddTask.css'
import api from '../../utils/api.utils'
import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
import { Input, Textarea, Button } from '@mui/joy'

function AddTask(props) {
  const { OpenAddTask, shouldRefresh, date } = props
  const [input, setInput] = useState('')
  const [selectedDate, setSelectedDate] = useState(dayjs(date))
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newTask = {
        title: input,
        date: selectedDate.toISOString(),
        userId: 3,
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
      <Input
        placeholder="Nome da Tarefa"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Textarea
        placeholder="Descrição"
        minRows={3}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} onChange={handleDateChange} />
      </LocalizationProvider>
      <div className="button-div">
        <Button variant="outlined" onClick={handleSubmit}>
          Salvar
        </Button>
        <Button variant="outlined" onClick={() => OpenAddTask()}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default AddTask
