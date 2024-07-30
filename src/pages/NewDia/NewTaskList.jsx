import './NewTaskList.css'
import { useState } from 'react'

function NewTaskList() {
  const [listaTeste, setListaTeste] = useState([
    'jogar',
    'brincar',
    'estudar',
    'ler',
  ])

  return (
    <div>
      <ul>
        {listaTeste.map((tarefa, index) => (
          <li key={index}>
            <input type="checkbox" />
            {tarefa} <button>...</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewTaskList
