import React from 'react';
import '../styles/error404.css';

const Error404 = () => {
  return (
    <div className="error-404-container">
      <div className="error-404-content">
        <div className="error-animation">
          <div className="wifi-symbol">
            <div className="wifi-bar wifi-bar-1"></div>
            <div className="wifi-bar wifi-bar-2"></div>
            <div className="wifi-bar wifi-bar-3"></div>
            <div className="wifi-dot"></div>
          </div>
          <div className="cross-mark">✕</div>
        </div>
        
        <h1 className="error-code">404</h1>
        <h2 className="error-title">No Internet Connection</h2>
        <p className="error-message">
          Oops! It seems like you're not connected to the internet.
          Please check your network connection and try again.
        </p>
        
        <div className="error-suggestions">
          <ul>
            <li>Check if your WiFi or mobile data is turned on</li>
            <li>Try reconnecting to your network</li>
            <li>Restart your router if needed</li>
          </ul>
        </div>
        
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          <span className="retry-icon">↻</span>
          Retry Connection
        </button>
      </div>
    </div>
  );
};

export default Error404;