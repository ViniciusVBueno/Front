function TaskList({
  tasks,
  handleChange,
  routeDescription,
  handleDelete,
  date,
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <div className="task-item">
            <input
              type="checkbox"
              checked={task.status}
              onChange={event => handleChange(event, task.id)}
            />
            <a
              href="#"
              onClick={() => routeDescription(task.id, date)}
              className={task.status ? 'completed-task' : 'incomplete-task'}
            >
              {task.title}
            </a>
            <button
              className="delete-button"
              onClick={() => handleDelete(task.id)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
