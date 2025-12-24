// Home.jsx — Smooth & Optimized with Pure White Title
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../component/Service";
import "../styles/home.css";
import { create } from "zustand";

/* ======================
   GLOBAL STORE
====================== */
const useStore = create((set) => ({
  mouse: { x: 0, y: 0 },
  hovered: false,
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setHovered: (hovered) => set({ hovered }),
}));

/* ======================
   ❄️ OPTIMIZED SNOWFALL CANVAS
====================== */
const Snowfall = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleResize = () => {
      clearTimeout(handleResize.timeout);
      handleResize.timeout = setTimeout(resize, 150);
    };

    window.addEventListener("resize", handleResize);

    const snowflakes = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 0.8 + 0.4,
      drift: Math.random() * 0.6 - 0.3,
    }));

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();

      snowflakes.forEach((s) => {
        s.y += s.speed;
        s.x += s.drift;

        if (s.y > canvas.height) {
          s.y = -10;
          s.x = Math.random() * canvas.width;
        }

        ctx.moveTo(s.x, s.y);
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      });

      ctx.fill();
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(handleResize.timeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="snow-canvas" />;
};

/* ======================
   OPTIMIZED MIST EFFECT CANVAS
====================== */
const MistEffect = ({ isActive, onComplete }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mistClouds = Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * canvas.width - canvas.width * 0.5,
      y: Math.random() * canvas.height,
      radius: Math.random() * 400 + 300,
      speedX: Math.random() * 2 + 1.5,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: 0,
      maxOpacity: Math.random() * 0.4 + 0.3,
      delay: i * 50,
    }));

    let startTime = Date.now();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = Date.now() - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mistClouds.forEach((cloud) => {
        const timeOffset = elapsed - cloud.delay;

        if (timeOffset < 0) return;

        if (timeOffset < 1000) {
          cloud.opacity = (timeOffset / 1000) * cloud.maxOpacity;
        } else if (timeOffset < 2500) {
          cloud.opacity = cloud.maxOpacity;
        } else if (timeOffset < 3500) {
          const fadeProgress = (timeOffset - 2500) / 1000;
          cloud.opacity = cloud.maxOpacity * (1 - fadeProgress);
        } else {
          cloud.opacity = 0;
        }

        cloud.x += cloud.speedX;
        cloud.y += cloud.speedY;

        if (cloud.x > canvas.width + cloud.radius) {
          cloud.x = -cloud.radius;
        }

        const gradient = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.radius
        );

        gradient.addColorStop(0, `rgba(200, 220, 255, ${cloud.opacity})`);
        gradient.addColorStop(0.5, `rgba(180, 200, 240, ${cloud.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(160, 180, 220, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (elapsed > 3800) {
        cancelAnimationFrame(animationFrameRef.current);
        if (onComplete) onComplete();
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return <canvas ref={canvasRef} className="mist-canvas" />;
};

/* ======================
   OPTIMIZED TYPEWRITER EFFECT WITH SYNCED TYPING SOUND
====================== */
const TypewriterText = ({ text, speed = 25, delay = 800 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio('/keyboard-typing-fast.mp3');
    audioRef.current.volume = 0.4;
    audioRef.current.playbackRate = 1.0;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (currentIndex === 0 && !hasStartedRef.current) {
      const initialTimeout = setTimeout(() => {
        hasStartedRef.current = true;
        
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            console.log("Audio play failed:", err);
          });
        }
        
        setCurrentIndex(1);
        setDisplayText(text[0]);
      }, delay);

      return () => clearTimeout(initialTimeout);
    }

    if (currentIndex > 0 && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }

    if (currentIndex >= text.length && !isComplete) {
      setIsComplete(true);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [currentIndex, text, speed, delay, isComplete]);

  return (
    <p className="hero-subtitle">
      {displayText}
      {!isComplete && <span className="cursor-blink">|</span>}
    </p>
  );
};

/* ======================
   MAIN HOME COMPONENT
====================== */
export default function Home() {
  const titleRef = useRef(null);
  const { setMouse, setHovered, mouse, hovered } = useStore();
  const [mistActive, setMistActive] = useState(false);
  const [contentFading, setContentFading] = useState(false);
  const navigate = useNavigate();

  const subtitleText = "We provide creative direction and build unique relationships to design projects that create real impact.";

  useEffect(() => {
    if (!titleRef.current) return;

    const tiltX = hovered ? mouse.y * 16 : 0;
    const tiltY = hovered ? -mouse.x * 16 : 0;

    titleRef.current.style.transform = `
      translate(${mouse.x * 130}px, ${mouse.y * 130}px)
      perspective(1200px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
    `;

    titleRef.current.style.textShadow = hovered
      ? "0 30px 80px rgba(255,255,255,0.25)"
      : "0 10px 30px rgba(0,0,0,0.4)";
  }, [mouse, hovered]);

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouse(x, y);
  }, [setMouse]);

  const handleReadMore = useCallback(() => {
    setContentFading(true);
    setMistActive(true);

    setTimeout(() => {
      navigate("/about");
      window.scrollTo(0, 0);
    }, 3800);
  }, [navigate]);

  return (
    <section id="home">
      <div className="home-container" onMouseMove={handleMouseMove}>
        {/* ❄️ Snowfall Background */}
        <Snowfall />

        {/* Mist Effect Overlay */}
        <MistEffect 
          isActive={mistActive} 
          onComplete={() => console.log("Mist animation complete")} 
        />

        <div className={`hero-overlay ${contentFading ? 'fade-out' : ''}`}>
          <div className="hero-content">
            <h1
              ref={titleRef}
              className="hero-title"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="title-word" style={{ '--word-index': 0 }}>Let</span>
              <span className="title-word" style={{ '--word-index': 1 }}>Next</span>
              {" "}
              <span className="title-word" style={{ '--word-index': 2 }}>Technologies</span>
            </h1>

            <TypewriterText text={subtitleText} speed={25} delay={1200} />

            <button 
              className="read-more-btn magnetic-btn"
              onClick={handleReadMore}
            >
              <span className="btn-text">Read more</span>
              <span className="arrow">→</span>
              <span className="btn-glow"></span>
            </button>
          </div>
        </div>
      </div>

      <Service />
    </section>
  );
}