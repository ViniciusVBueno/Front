import './NewDia.css'
import NewTaskList from './NewTaskList'
import Sidebar from './SideBar'

function NewDia() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <div className="greetings">
            <h2>Bom dia</h2> <p>data escrita</p>
          </div>
          <button>day</button>
        </div>
        <NewTaskList />
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
