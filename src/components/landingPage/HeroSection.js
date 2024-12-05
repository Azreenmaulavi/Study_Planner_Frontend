import React from 'react';
import { Button } from 'antd';
import './LandingPage.css';
import img from '../../assets/images/watch1.png';


const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-image">
        <img src={img} alt="img" />
      </div>
      <div className="hero-content">
      <h1>Plan Your Study Schedules with Ease</h1>
        <p>
          Are you struggling to manage your study time? Our Study Planner is here to help you stay on track and boost your productivity.
          Create personalized study plans, track progress, set reminders, and achieve your academic goals with confidence.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
