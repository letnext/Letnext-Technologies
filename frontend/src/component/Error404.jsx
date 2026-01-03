import React, { useEffect, useState } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import '../styles/error404.css';

const Error404 = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Generate 50 snowflakes with random properties
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 5,
      fontSize: Math.random() * 10 + 10,
      opacity: Math.random() * 0.6 + 0.4
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="error-404-container">
      {/* Snowfall Effect */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            fontSize: `${flake.fontSize}px`,
            opacity: flake.opacity
          }}
        >
          ❄
        </div>
      ))}

      {/* Error Content */}
      <div className="error-404-content">
        <div className="error-animation">
          <div className="wifi-symbol">
            <WifiOff className="wifi-icon" size={100} />
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
          <RefreshCw className="retry-icon" size={24} />
          Retry Connection
        </button>
      </div>
    </div>
  );
};

export default Error404;