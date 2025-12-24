import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import "../styles/product.css";
import About from "../component/About";

const products = [
  {
    name: "Digital Marketing",
    tag: "Sales • Support",
    desc: "Manage leads, deals and customer communication from a single, unified dashboard.",
    img: "/lnt.png",
    link: "/digital",
  },
  {
    name: "Web Development",
    tag: "Java • Python • MERN Stack",
    desc: "Plan, execute and track multi-channel campaigns with real-time performance insights.",
    img: "./hotel.png",
    link: "/web",
  },
  {
    name: "Technical Trainer",
    tag: "Java • Python • C • C++ • MERN Stack",
    desc: "Monitor case and next hearing smart alerts and deep observability.",
    img: "./advocate.png",
    link: "/technical",
  },
  {
    name: "IoT Device Hub",
    tag: "Edge • Automation",
    desc: "Onboard, control and analyze thousands of devices securely from a single console.",
    img: "./iot1.png",
    link: "/iothub",
  },
];

/* ======================
   PRODUCT CARD WITH 3D
====================== */
const ProductCard = ({ product, index, onNavigate }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Optimized mouse move with RAF
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      setRotation({ x: rotateX, y: rotateY });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setRotation({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onNavigate(product.link);
  }, [onNavigate, product.link]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    
    <div
      ref={cardRef}
      className="product-card"
      style={{
        animationDelay: `${index * 0.15}s`,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
     <div className="snowfall-container">
        {[...Array(80)].map((_, i) => (
          <div key={i} className={`snowflake snowflake-${i + 1}`} />
        ))}
      </div>
      <div className="product-card-inner">
        <div className="product-image-wrap">
          <img 
            src={product.img} 
            alt={product.name} 
            className="product-image"
            loading="lazy"
            decoding="async"
          />
          <div className="product-image-overlay" />
          <div className="product-shine" />
        </div>

        <div className="product-content">
          <span className="product-tag">{product.tag}</span>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-desc">{product.desc}</p>

          <button className="product-cta" onClick={handleClick}>
            <span className="cta-text">Click Here</span>
            <span className="cta-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Floating particles effect */}
        <div className="card-particles">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ======================
   MAIN PRODUCT COMPONENT
====================== */
export default function Product() {
  const snowRef = useRef(null);
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationFrameRef = useRef(null);
  const sceneRef = useRef(null);

  /* ❄️ OPTIMIZED THREE.JS SNOWFALL BACKGROUND */
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
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false, // Disable for better performance
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio

    const snowCount = 3000;
    const positions = new Float32Array(snowCount * 3);
    const speeds = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = Math.random() * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      speeds[i] = 0.01 + Math.random() * 0.03;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.07,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const snow = new THREE.Points(geometry, material);
    scene.add(snow);

    // Optimized animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array;
      const time = Date.now() * 0.0005;

      for (let i = 0; i < snowCount; i++) {
        pos[i * 3 + 1] -= speeds[i];
        pos[i * 3] += Math.sin(time + i) * 0.002;

        if (pos[i * 3 + 1] < -30) {
          pos[i * 3 + 1] = 60;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Throttled resize handler
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }, 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
      
      // Proper cleanup
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Optimized navigation handler
  const handleNavigation = useCallback((link) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add transition class
    document.body.classList.add('ripple-transition');

    // Navigate after transition
    const transitionTimer = setTimeout(() => {
      navigate(link);
      
      // Immediate scroll to top
      const scrollTimer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      
      // Remove transition, add fade-in
      document.body.classList.remove('ripple-transition');
      document.body.classList.add('page-fade-in');

      // Complete fade-in
      const fadeTimer = setTimeout(() => {
        document.body.classList.remove('page-fade-in');
        setIsTransitioning(false);
        window.scrollTo(0, 0);
      }, 800);

      // Cleanup timeouts
      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(fadeTimer);
      };
    }, 1200);

    // Cleanup
    return () => {
      clearTimeout(transitionTimer);
    };
  }, [isTransitioning, navigate]);

  return (
    <section className="product-section" id="product">
      {/* ❄️ Snow Canvas */}
      <canvas ref={snowRef} className="product-snow" />

      <div className="product-inner">
        <h2 className="product-title">Our Products</h2>
        <p className="product-subtitle">
          Scalable, secure and future-ready solutions crafted by LetNext
          Technologies.
        </p>

        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard 
              key={product.name} 
              product={product} 
              index={index}
              onNavigate={handleNavigation}
            />
          ))}
        </div>
      </div>

      <About />
    </section>
  );
}