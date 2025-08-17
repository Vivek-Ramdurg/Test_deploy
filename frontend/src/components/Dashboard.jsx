import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user-data`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('Data saved successfully!')
      setFormData({ name: '', phoneNo: '' })
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save data')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="form-title">Dashboard</h2>
        <button onClick={handleLogout} style={{ width: 'auto', padding: '0.5rem 1rem' }}>Logout</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number</label>
          <input
            id="phoneNo"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phoneNo}
            onChange={(e) => setFormData({...formData, phoneNo: e.target.value})}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <button type="submit">Save Information</button>
      </form>
    </div>
  )
}

export default Dashboard