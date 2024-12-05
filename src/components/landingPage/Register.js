import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA
import api from '../../services/Api';  // Axios instance
import "./LandingPage.css";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const navigate = useNavigate();

  const handleCaptchaChange = (token) => {
    console.log("Captcha token:", token);
    setCaptchaToken(token);  

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!captchaToken) {
      setError('Please verify that you are not a robot');
      return;
    }

    try {
      const response = await api.post('/auth/register', { name, email, password,captchaToken });
      setSuccess('Registration successful! Redirecting to login page...');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register');
      setSuccess('');
    }
  };
  console.log("Recaptcha site key:", process.env.REACT_APP_RECAPTCHA_SITE_KEY); 

  return (
    <div className="custom-register-container">
      <div className="custom-register-box">
        <h2>Register</h2>
        {error && <div className="custom-alert custom-alert-danger">{error}</div>}
        {success && <div className="custom-alert custom-alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="custom-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="custom-form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="custom-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="custom-form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
            {/* Add reCAPTCHA */}
          <div className="custom-form-group">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}  
              
              // sitekey="6LcW2o8qAAAAAJEie5q8jb6jJG1V9Y4HkSnLum0w" 
              onChange={handleCaptchaChange}
            />
          </div>

          <button type="submit" className="custom-btn">
            Register
          </button>
        </form>
        <Link to="/login" className="custom-login-link">
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
