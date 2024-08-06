import './EditTask.css'

function EditTask(props) {
  const { openTaskEditor } = props

  return (
    <div className="edit-task">
      <span>Nome da Tarefa</span>
      <input type="text" placeholder="nome da tarefa" /> <span>Descrição</span>{' '}
      <textarea name="descrição" id="descrição"></textarea>
      <div>
        <button>Salvar Alterações</button>
        <button onClick={() => openTaskEditor()}>Cancelar</button>
      </div>
    </div>
  )
}

export default EditTask
