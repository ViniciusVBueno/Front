import './AddTask.css'
import DatePicker from 'react-datepicker'
//fazer campo para mostrar data selecionada, criar botoes para adicionar tasks e cancelar
function AddTask() {
  return (
    <div className="add-task-screen">
      <input type="text" placeholder="Nome da Tarefa" />
      <textarea
        name="descrição"
        id="descrição"
        placeholder="Descrição"
      ></textarea>
      <DatePicker open={true} className="calendario" />
    </div>
  )
}

export default AddTask
