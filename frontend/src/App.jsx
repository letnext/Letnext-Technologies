import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./common/Navbar";
import "./App.css";

import Home from "./component/Home";
import Service from "./component/Service";
import Product from "./component/Product";
import About from "./component/About";
import Contact from "./component/Contact";
import Footer from "./component/Footer";

import Chatbot from "./component/Chatbot";
import Whatapp from "./component/Whatapp";
import Instagram from "./component/Instagram";
import Linkedin from "./component/Linkedin";
import Error404 from "./component/Error404";
import NotFound from "./component/Notfound";
import Blogs from "./component/Blogs";

// sub division
import Digital from "./sub-division/Digital";
import Web from "./sub-division/Web";
import Technical from "./sub-division/Technical";
import Iothub from "./sub-division/Iothub";

function StartScreen({ onStart }) {
  return (
    <div className="start-screen-gaming">
      <div className="animated-bg">
        <div className="bg-grid"></div>
        <div className="bg-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
        <div className="bg-gradient"></div>
      </div>

      <div className="start-container">
        <div className="logo-section">
          <div className="logo-glow"></div>
          <h1 className="game-logo">
            <span className="logo-bracket">{'[ '}</span>
            <span className="logo-text">LETNEXT TECHNOLOGIES</span>
            <span className="logo-bracket">{' ]'}</span>
          </h1>
          <div className="logo-subtitle">NEXT GENERATION PLATFORM</div>
        </div>

        <div className="start-section">
          <button className="game-start-btn" onClick={onStart}>
            <span className="btn-bg"></span>
            <span className="btn-text">
              <span className="btn-icon">▶</span>
              START TO EXPLORE
            </span>
            <span className="btn-shine"></span>
          </button>
          
          <div className="press-start">PRESS START TO BEGIN</div>
        </div>

        <div className="status-footer">
          <div className="status-item">
            <div className="status-dot pulse"></div>
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="version">v2.0.25</div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const steps = 100;
    const stepDuration = duration / steps;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen-gaming">
      <div className="loading-content">
        <div className="spinner-container">
          <div className="spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>
        
        <h2 className="loading-text">LOADING</h2>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-percent">{progress}%</div>
        </div>
        
        <p className="loading-status">Initializing system...</p>
      </div>
    </div>
  );
}

function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const audioRef = useRef(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowStartScreen(false);
      setFadeIn(true);
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleStartClick = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
        await audioRef.current.play();
        console.log("✅ Audio playing");
      } catch (error) {
        console.error("❌ Audio failed:", error);
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowStartScreen(false);
      sessionStorage.setItem('hasVisited', 'true');
      setTimeout(() => setFadeIn(true), 50);
    }, 5000);
  };

  // Show 404 error page if offline
  if (!isOnline) {
    return <Error404 />;
  }

  return (
    <Router>
      <audio 
        ref={audioRef} 
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/epic-glitch-intro.mp3" type="audio/mpeg" />
      </audio>

      {/* Start Screen - No Navbar */}
      {showStartScreen && !isLoading && (
        <StartScreen onStart={handleStartClick} />
      )}

      {/* Loading Screen - No Navbar */}
      {isLoading && <LoadingScreen />}

      {/* Main App - Navbar appears here and stays on all pages */}
      {!showStartScreen && !isLoading && (
        <>
          <Navbar />
          <div className={`app-wrapper ${fadeIn ? 'fade-in' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/service" element={<Service />} />
              <Route path="/product" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/chatbot" element={<Chatbot/>} />
              <Route path="/whatapp" element={<Whatapp/>} />
              <Route path="/instagram" element={<Instagram/>} />
              <Route path="/linkedin" element={<Linkedin/>} />
              <Route path="/digital" element={<Digital/>}/>
              <Route path="/web" element={<Web/>}/>
              <Route path="/technical" element={<Technical/>}/>
              <Route path="/iothub" element={<Iothub/>}/>
              <Route path="/notfound" element={<NotFound/>}/>
            </Routes>
          </div>
          <Linkedin/>
          <Instagram/>
          <Whatapp/>
          <Chatbot/>
        </>
      )}
    </Router>
  );
}

export default App;