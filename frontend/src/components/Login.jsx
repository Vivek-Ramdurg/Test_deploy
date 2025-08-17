import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData)
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <h2 className="form-title">Welcome Back Home </h2>
      <h2>This is Vishal and Vivek </h2>
      <h2>this is testing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div className="nav-links">
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  )
}

export default Login