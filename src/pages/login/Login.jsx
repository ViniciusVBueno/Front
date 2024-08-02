import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './Login.css'
import logo from './logo.png'

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
        <img src={logo} alt="logo" height={96} width={96} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div> */}
        <button onClick={handleLogin}>Login</button>
        <div className="forgot-password-container">
          <a href="#">Esqueceu a senha?</a>
          <div className="line"></div>
          <div>
            Não tem uma conta? <a href="#">Cadastre-se</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
