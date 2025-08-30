import { useState, Suspense } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import axios from 'axios'
import { FaUser } from 'react-icons/fa'; 
import * as THREE from 'three'
import './Login.css';


function AnimatedBackground() {
  const [error, setError] = useState(null)
  const texture = useLoader(TextureLoader, '/img/login.jpg', 
    undefined,
    (error) => {
      console.error('Error loading texture:', error)
      setError(true)
    }
  )

  if (error) {
    return (
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial color="#1a1a1a" opacity={0.5} transparent />
      </mesh>
    )
  }

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[16, 9]} />
      <meshBasicMaterial 
        map={texture} 
        opacity={0.5} 
        transparent 
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function FloatingParticles() {
  return (
    <group>
      {[...Array(50)].map((_, i) => (
        <mesh key={i} position={[
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 5 - 10
        ]}>
          <sphereGeometry args={[0.1]} />
          <meshPhongMaterial color="#4299e1" />
        </mesh>
      ))}
    </group>
  )
}

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData)
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="canvas-container">
         <div className="avatar-circle">
      <FaUser size={48} color="#fff" />
    </div>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <AnimatedBackground />
            <FloatingParticles />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="login-container"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="form-title"
          style={{ color: '#1a1a1a' }}
        >
          Welcome Back
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="username">Username</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="password">Password</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </motion.div>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'linear-gradient(45deg, #4299e1, #667eea)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
        <motion.div
          className="nav-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don't have an account?{' '}
          <motion.span whileHover={{ scale: 1.05 }}>
            <Link to="/register">Register here</Link>
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login