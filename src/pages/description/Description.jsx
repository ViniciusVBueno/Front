import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Description.css'
import axios from 'axios'

function Description() {
  const { taskId, date } = useParams()
  const [input, setInput] = useState('')
  const [taskData, setTaskData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const task = { id: taskId }
        console.log(task)
        const response = await axios.get(
          `https://bueno-devs-todo-api.fly.dev/tasks/${taskId}`
        )
        setTaskData(response.data.resposta)
        console.log(response.data.resposta)
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

      const response = await axios.post(
        `https://bueno-devs-todo-api.fly.dev/tasks/${taskId}/update-description`,
        newDescription
      )

      if (response.status === 200) {
        setInput('')
      } else {
        console.error('Erro ao adicionar descrição. Verifique o servidor.')
      }
    } catch (error) {
      console.error('Erro ao processar a requisição:', error)
    }
    navigate(`/${date}`)
  }

  return (
    <div>
      <div>
        {taskData ? (
          <>
            <h1>{taskData[0].title} - Descrição</h1>
            <p>{taskData[0].description}</p>
            <div>
              <form role="group" onSubmit={addDescription}>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={input}
                  onChange={handleChange}
                  className="input-description"
                />
                <button type="submit">Adicionar Descrição</button>
              </form>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  )
}

export default Description
