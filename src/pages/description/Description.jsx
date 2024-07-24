import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Description.css'
import api from '../../utils/api.utils'
import Loader from '../loader/Loader'

function Description() {
  const { taskId, date } = useParams()
  const [input, setInput] = useState('')
  const [taskData, setTaskData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await api.get(`/tasks/${taskId}`)
        setTaskData(response.data.resposta)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    fetchDados()
  }, [taskId])

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const addDescription = async (event) => {
    event.preventDefault()
    try {
      const newDescription = {
        id: taskId,
        description: input,
      }

      const response = await api.post(
        `/tasks/${taskId}/update-description`,
        newDescription
      )

      if (response.status !== 200)
        throw new Error('Erro ao adicionar descrição. Verifique o servidor.')

      setInput('')
      navigate(`/${date}`)
    } catch (error) {
      console.error('Erro ao processar a requisição:', error)
    }
  }

  if (!taskData) return <Loader />

  return (
    <div>
      <h1>{taskData[0].title} - Descrição</h1>
      <p>{taskData[0].description}</p>
      <div>
        <form onSubmit={addDescription}>
          <textarea
            name="description"
            id="description"
            value={input}
            onChange={handleChange}
            className="input-description"
            rows={4}
          />
          <button type="submit">Adicionar Descrição</button>
        </form>
      </div>
    </div>
  )
}

export default Description
