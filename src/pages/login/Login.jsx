import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    const actualDate = new Date()
    const StringDate = actualDate.toISOString().slice(0, 10) // Formato AAAA-MM-DD
    navigate(`/${StringDate}`)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-title">Todo App</div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="forgot-password-container">
          <div className="forgot-password">Esqueceu a senha?</div>
          <div className="line"></div>
          <div>
            Não tem uma conta?{' '}
            <span className="register-link">Cadastre-se</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
