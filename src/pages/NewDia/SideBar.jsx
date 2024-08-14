import './Sidebar.css'

function Sidebar(props) {
  const { user } = props

  return (
    <div className="sidebar">
      <div>
        FOTO {user.name}
        <button>Config</button>
      </div>
      <div>
        <h2>Lista</h2>
        <ul></ul>
      </div>
    </div>
  )
}

export default Sidebar
