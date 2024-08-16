import './Sidebar.css'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { deepOrange, deepPurple } from '@mui/material/colors'

function Sidebar(props) {
  const { user } = props

  const avatarColor = deepPurple[500]

  return (
    <div className="sidebar">
      <div>
        <Stack direction="row" spacing={2}>
          <Avatar 
            sx={{ bgcolor: avatarColor, width: 52, height: 52 }}
          >
            {user.name.charAt(0)}
          </Avatar>
        </Stack>
        <span className="user-name">{user.name}</span>
        <button className="config-button">Config</button>
      </div>
      <div>
        <h2>Lista</h2>
        <ul></ul>
      </div>
    </div>
  )
}

export default Sidebar

