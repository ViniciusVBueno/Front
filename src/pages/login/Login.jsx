import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns' // Importe o formatDistanceToNow
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Crie um timestamp válido (pode ser a data atual)
    const timestamp = new Date().toISOString()
    const StringDate = timestamp.slice(0, 10) // Formato AAAA-MM-DD
    navigate(`/${StringDate}`)
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="email"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login
