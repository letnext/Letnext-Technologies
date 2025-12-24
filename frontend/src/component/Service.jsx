// Service.jsx - Optimized for Performance
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import "../styles/service.css";
import Product from "../component/Product";

const services = [
  { name: "Digital Marketing", img: "/dig.png", color: "#FF6B6B" },
  { name: "App Development", img: "/app.png", color: "#4ECDC4" },
  { name: "Web Development", img: "/web.png", color: "#45B7D1" },
  { name: "UI / UX Designing", img: "/uiux.png", color: "#96CEB4" },
  { name: "Internet of Things", img: "./iot.png", color: "#FFEAA7" },
];

export default function Service() {
  const snowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      autoScrollRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }, 3000);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isHovered]);

  // Three.js snow effect - optimized
  useEffect(() => {
    const canvas = snowRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false, // Disable for better performance
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio

    // Reduced particle count for better performance
    const snowCount = 1500;
    const positions = new Float32Array(snowCount * 3);
    const velocities = new Float32Array(snowCount);
    const swayOffsets = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      velocities[i] = 0.015 + Math.random() * 0.025;
      swayOffsets[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.12,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const snow = new THREE.Points(geometry, material);
    scene.add(snow);

    let time = 0;
    let lastTime = performance.now();
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      // Frame rate limiting
      if (deltaTime < frameInterval) return;
      
      lastTime = currentTime - (deltaTime % frameInterval);
      time += 0.01;

      const pos = geometry.attributes.position.array;

      // Optimized particle update loop
      for (let i = 0; i < snowCount; i++) {
        const idx = i * 3;
        pos[idx] += Math.sin(time + swayOffsets[i]) * 0.01;
        pos[idx + 1] -= velocities[i];

        if (pos[idx + 1] < -25) {
          pos[idx + 1] = 50;
          pos[idx] = (Math.random() - 0.5) * 100;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      snow.rotation.y = time * 0.05;
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", onResize);
      
      // Proper cleanup
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  const handleCardClick = useCallback((index) => {
    setActiveIndex(index);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  }, []);

  const getCardStyle = useCallback((index) => {
    const offset = (index - activeIndex + services.length) % services.length;
    const isActive = offset === 0;

    let transform = "";
    let opacity = 0;
    let zIndex = 0;
    let scale = 0.5;
    let blur = 8;

    if (isActive) {
      transform = "translateX(0) translateY(0)";
      opacity = 1;
      zIndex = 50;
      scale = 1;
      blur = 0;
    } else if (offset === 1) {
      transform = "translateX(min(280px, 25vw)) translateY(40px) rotateY(-25deg)";
      opacity = 0.6;
      zIndex = 40;
      scale = 0.75;
      blur = 2;
    } else if (offset === services.length - 1) {
      transform = "translateX(max(-280px, -25vw)) translateY(40px) rotateY(25deg)";
      opacity = 0.6;
      zIndex = 40;
      scale = 0.75;
      blur = 2;
    } else if (offset === 2) {
      transform = "translateX(min(450px, 35vw)) translateY(80px) rotateY(-35deg)";
      opacity = 0.3;
      zIndex = 30;
      scale = 0.6;
      blur = 4;
    } else if (offset === services.length - 2) {
      transform = "translateX(max(-450px, -35vw)) translateY(80px) rotateY(35deg)";
      opacity = 0.3;
      zIndex = 30;
      scale = 0.6;
      blur = 4;
    }

    return { transform, opacity, zIndex, scale, blur };
  }, [activeIndex]);

  return (
    <div className="srv-page-wrapper">
      <canvas ref={snowRef} className="srv-snow-canvas" />

      <div className="srv-main-content">
        <h1 className="srv-page-title">Our Services</h1>
        <p className="srv-page-subtitle">
          Transforming ideas into reality with cutting-edge solutions
        </p>

        <div
          className="srv-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {services.map((service, index) => {
            const { transform, opacity, zIndex, scale, blur } = getCardStyle(index);
            const isActive = (index - activeIndex + services.length) % services.length === 0;

            return (
              <div
                key={index}
                className="srv-carousel-item"
                style={{
                  transform: `${transform} scale(${scale})`,
                  opacity,
                  zIndex,
                  filter: `blur(${blur}px)`,
                }}
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`srv-card-box ${isActive && isHovered ? 'srv-card-lifted' : ''}`}
                >
                  <div
                    className="srv-card-color-overlay"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}20, ${service.color}60)`,
                    }}
                  />

                  <img
                    src={service.img}
                    alt={service.name}
                    className="srv-card-img"
                    loading="lazy"
                  />

                  <div className="srv-card-dark-gradient" />

                  <div className="srv-card-info">
                    <div
                      className={`srv-card-line ${isActive ? 'srv-card-line-expanded' : ''}`}
                      style={{ backgroundColor: service.color }}
                    />
                    <h3 className="srv-card-heading">{service.name}</h3>
                    <p className={`srv-card-text ${isActive ? 'srv-card-text-show' : ''}`}>
                      Innovative solutions tailored to your needs
                    </p>
                  </div>

                  {isActive && (
                    <div className="srv-card-indicator">
                      <div
                        className="srv-indicator-ring"
                        style={{ backgroundColor: `${service.color}40` }}
                      >
                        <div
                          className="srv-indicator-dot"
                          style={{ backgroundColor: service.color }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="srv-cta-wrapper">
          <button
            className="srv-cta-btn"
            style={{
              backgroundColor: services[activeIndex].color,
              boxShadow: `0 10px 40px ${services[activeIndex].color}40`,
            }}
          >
            {services[activeIndex].name}
          </button>
        </div>
      </div>
      <Product />
    </div>
  );
}