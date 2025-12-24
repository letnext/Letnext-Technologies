import { useEffect, useRef, useState } from "react";
import Contact from "./Contact";
import "../styles/about.css";

const About = () => {
  /* ======================
     COUNTER LOGIC
  ====================== */
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    years: 0,
  });

  const statsRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const targets = { projects: 50, clients: 30, years: 3 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const startCounting = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = Math.min(step / steps, 1);
        const eased = 1 - Math.pow(2, -10 * progress);

        setCounters({
          projects: Math.floor(eased * targets.projects),
          clients: Math.floor(eased * targets.clients),
          years: Math.floor(eased * targets.years),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, interval);
    };

    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && startCounting(),
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  /* ======================
     ENHANCED SCRATCH CARD LOGIC
  ====================== */
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    
    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    // Draw scratch surface with animated gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#a78bff");
    gradient.addColorStop(0.3, "#8b6fff");
    gradient.addColorStop(0.5, "#60efff");
    gradient.addColorStop(0.7, "#8b6fff");
    gradient.addColorStop(1, "#a78bff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add decorative border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.strokeRect(5, 5, rect.width - 10, rect.height - 10);

    // Add "SCRATCH ME" text with better styling
    ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
    ctx.font = "bold 32px 'Poppins', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText("SCRATCH ME", rect.width / 2, rect.height / 2 - 20);
    
    // Add emoji and subtext
    ctx.font = "24px Arial, sans-serif";
    ctx.fillText("👆 Use your finger or mouse", rect.width / 2, rect.height / 2 + 25);
  }, []);

  const scratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    let x, y;
    if (e.type.includes("touch")) {
      x = (e.touches[0].clientX - rect.left) * dpr;
      y = (e.touches[0].clientY - rect.top) * dpr;
    } else {
      x = (e.clientX - rect.left) * dpr;
      y = (e.clientY - rect.top) * dpr;
    }

    // Erase with larger radius for easier scratching
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35 * dpr, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    const progress = (transparent / (pixels.length / 4)) * 100;
    setScratchProgress(progress);

    // Full reveal at 60% scratched
    if (progress > 60 && !isRevealed) {
      setIsRevealed(true);
      setTimeout(() => {
        canvas.style.opacity = "0";
        canvas.style.pointerEvents = "none";
      }, 300);
    }
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    scratch(e);
  };

  const handleMouseMove = (e) => {
    // Update cursor position for hand effect
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (isScratching) scratch(e);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsScratching(true);
    scratch(e);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (isScratching) scratch(e);
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  const handleMouseEnter = () => {
    setCursorPos({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    setCursorPos({ x: -100, y: -100 });
    setIsScratching(false);
  };

  return (
    <section className="about-section" id="about">
      {/* ❄️ CSS Snowfall Background */}
      <div className="snowfall-container">
        {[...Array(80)].map((_, i) => (
          <div key={i} className={`snowflake snowflake-${i + 1}`} />
        ))}
      </div>

      <div className="about-container">
        <h2 className="about-title">About LetNext Technologies</h2>
        <p className="about-subtitle">
          Building the future of digital innovation with cutting-edge technology
          and creative solutions.
        </p>

        <div className="about-content">
          <div className="about-text">
            <p className="animate-paragraph">
              At <strong>LetNext Technologies</strong>, we pioneer next-generation
              software solutions that empower businesses to scale confidently.
            </p>
            <p className="animate-paragraph delay-1">
              Our expertise spans <strong>Web & App</strong>, <strong>AI</strong>,
              <strong> Cloud</strong>, <strong>IoT</strong>, and digital
              transformation.
            </p>
            <p className="animate-paragraph delay-2">
              We don't just build products — we craft impactful experiences.
            </p>
          </div>

          <div className="about-stats" ref={statsRef}>
            <div className="stat-item animate-stat">
              <h3 className="stat-number">{counters.projects}+</h3>
              <p className="stat-label">Projects Delivered</p>
            </div>
            <div className="stat-item animate-stat delay-1">
              <h3 className="stat-number">{counters.clients}+</h3>
              <p className="stat-label">Happy Clients</p>
            </div>
            <div className="stat-item animate-stat delay-2">
              <h3 className="stat-number">{counters.years}+</h3>
              <p className="stat-label">Years of Excellence</p>
            </div>
            <div className="stat-item animate-stat delay-3">
              <h3 className="stat-number blink-247">24/7</h3>
              <p className="stat-label">Support & Innovation</p>
            </div>
          </div>
        </div>

        {/* ENHANCED SCRATCH CARD MISSION */}
        <div className="about-mission animate-mission">
          <h3 className="mission-title">Our Mission</h3>
          
          {/* Progress indicator */}
          {scratchProgress > 0 && scratchProgress < 60 && (
            <div className="scratch-progress">
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${scratchProgress}%` }}
                />
              </div>
              <p className="progress-text">
                {Math.round(scratchProgress)}% revealed - Keep scratching! 🎯
              </p>
            </div>
          )}

          <div className="scratch-card-wrapper">
            <div className={`mission-content ${isRevealed ? 'revealed' : ''} ${scratchProgress > 10 ? 'partially-visible' : ''}`}>
              <p className="mission-text">
                To deliver intuitive, reliable, and future-ready technology that
                drives progress and innovation.
              </p>
            </div>
            
            <canvas
              ref={canvasRef}
              className={`scratch-canvas ${isScratching ? 'scratching' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* Custom hand cursor */}
            {!isRevealed && cursorPos.x > -50 && (
              <div
                className={`hand-cursor ${isScratching ? 'scratching' : ''}`}
                style={{
                  left: `${cursorPos.x}px`,
                  top: `${cursorPos.y}px`,
                }}
              >
                ✋
              </div>
            )}
          </div>

          {isRevealed && (
            <div className="reveal-message">
              🎉 Mission Revealed! 🎉
            </div>
          )}
        </div>
      </div>

      <Contact />
    </section>
  );
};

export default About;