import React from 'react';
import { useNavigate } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import { IoHome, IoArrowBack } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";
import '../styles/notfound.css';



const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="notfound-container">
      {/* Snowfall Effect */}
      <Snowfall
        color="#fff"
        snowflakeCount={150}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 1
        }}
      />

      <div className="notfound-content">
        {/* Error Icon */}
        <div className="error-icon-wrapper">
          <MdError className="error-icon" />
        </div>

        {/* 404 Text */}
        <div className="error-code">
          <span className="digit">4</span>
          <span className="digit zero">0</span>
          <span className="digit">4</span>
        </div>

        {/* Title */}
        <h1 className="error-title">Page Not Found</h1>

        {/* Description */}
        <p className="error-description">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>

        {/* Search Icon Animation */}
        <div className="search-animation">
          <BiSearchAlt className="search-icon" />
          <div className="search-circle"></div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn primary-btn" onClick={handleGoHome}>
            <IoHome className="btn-icon" />
            <span>Back to Home</span>
          </button>
          <button className="action-btn secondary-btn" onClick={handleGoBack}>
            <IoArrowBack className="btn-icon" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Tips */}
        <div className="tips-section">
          <p className="tips-title">Try these options:</p>
          <div className="tips-grid">
            <div className="tip-item">
              <span className="tip-number">01</span>
              <p>Check the URL for typos</p>
            </div>
            <div className="tip-item">
              <span className="tip-number">02</span>
              <p>Return to homepage</p>
            </div>
            <div className="tip-item">
              <span className="tip-number">03</span>
              <p>Use the navigation menu</p>
            </div>
            <div className="tip-item">
              <span className="tip-number">04</span>
              <p>Contact support if needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="bg-elements">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
        
      </div>
    
    </div>
  );
};

export default NotFound;