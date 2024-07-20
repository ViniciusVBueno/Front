import { useState } from 'react'
import api from '../../utils/api.utils'

function NewTask(props) {
  const { date, shouldRefresh } = props
  const [input, setInput] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const newTask = {
        title: input,
        status: false,
        date: date,
        user: 'rapha',
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
  return (
    <div className="new-task">
      <form role="group" onSubmit={handleSubmit}>
        <input
          type="text"
          name="tarefa"
          id="tarefa"
          value={input}
          onChange={event => setInput(event.target.value)}
        />
        <button type="submit">+</button>
      </form>
    </div>
  )
}

export default NewTask
