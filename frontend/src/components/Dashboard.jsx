import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

// SVG Icons
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// UI Components
const Button = ({ variant = 'default', size = 'default', className = '', children, ...props }) => {
  return (
    <button className={`btn btn-${variant} btn-${size} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className = '', ...props }) => {
  return (
    <input className={`form-input ${className}`} {...props} />
  );
};

const Card = ({ className = '', children, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`card-title ${className}`} {...props}>
      {children}
    </h3>
  );
};

const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  );
};

// MetricCard component
const MetricCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
}) => {
  return (
    <Card className={`metric-card metric-card-${variant} ${className}`}>
      <CardHeader className="metric-card-header">
        <CardTitle className="metric-card-title">{title}</CardTitle>
        <div className="metric-card-icon">
          <Icon />
        </div>
      </CardHeader>
      <CardContent>
        <div className="metric-card-value">{value}</div>
        {description && (
          <p className="metric-card-description">
            {description}
          </p>
        )}
        {trend && (
          <div className="metric-card-trend">
            <span className={`trend-value ${trend.isPositive ? 'positive' : 'negative'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="trend-label">
              from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main Dashboard component
function Dashboard() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user-data`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Data saved successfully!');
      setFormData({ name: '', phoneNo: '' });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="header-title">
              Pratibha Poshak Portal
            </h1>
          </div>
          
          <div className="header-right">
            <div className="search-container">
              <div className="search-icon">
                <SearchIcon />
              </div>
              <Input 
                placeholder="Search..." 
                className="search-input"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="header-btn">
              <BellIcon />
            </Button>
            
            <Button variant="ghost" size="icon" className="header-btn">
              <UserIcon />
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="dashboard-content">
          <div className="dashboard-container">
            <div className="dashboard-header-section">
              <h2 className="dashboard-title">Dashboard Main</h2>
              <Button 
                onClick={handleLogout} 
                variant="destructive"
                className="logout-btn"
              >
                Logout
              </Button>
            </div>
            
            {/* Metrics Grid */}
            <div className="metrics-grid">
              <MetricCard
                title="Total Users"
                value="1,234"
                description="Registered users"
                icon={UsersIcon}
                trend={{ value: 12, isPositive: true }}
                variant="primary"
              />
              <MetricCard
                title="Active Sessions"
                value="567"
                description="Currently active"
                icon={UserIcon}
                trend={{ value: 5, isPositive: true }}
                variant="secondary"
              />
              <MetricCard
                title="Pending Requests"
                value="23"
                description="Awaiting approval"
                icon={BellIcon}
                trend={{ value: 3, isPositive: false }}
                variant="accent"
              />
              <MetricCard
                title="Completion Rate"
                value="89%"
                description="Profile completion"
                icon={UserIcon}
                trend={{ value: 2, isPositive: true }}
                variant="default"
              />
            </div>
            
            {/* Form Section */}
            <div className="form-section">
              <h3 className="form-title">User Information Form</h3>
              <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="form-input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                  <Input
                    id="phoneNo"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNo}
                    onChange={(e) => setFormData({...formData, phoneNo: e.target.value})}
                    required
                    className="form-input-field"
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                <Button type="submit" variant="default" className="submit-btn">
                  Save Information
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;