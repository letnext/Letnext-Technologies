import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import "../styles/product.css";
import Footer from "../component/Footer";
import {
  FaRocket,
  FaLock,
  FaDollarSign,
  FaBullseye,
  FaLaptopCode,
  FaMobileAlt,
  FaGraduationCap,
  FaNetworkWired,
  FaCheckCircle,
  FaArrowRight,
  FaComments,
  FaStar
} from "react-icons/fa";

const products = [
  {
    name: "Digital Marketing",
    tag: "Sales • Support",
    desc: "Manage leads, deals and customer communication from a single, unified dashboard.",
    img: "/lnt.png",
    alt: "IT service and Digital marketing",
    link: "/digital",
    features: ["SEO Optimization", "Social Media", "Analytics", "Content Strategy"],
  },
  {
    name: "Web Development",
    tag: "Java • Python • MERN Stack",
    desc: "Plan, execute and track multi-channel campaigns with real-time performance insights.",
    img: "./hotel.png",
    alt: "IT service and Digital marketing",
    link: "/web",
    features: ["Responsive Design", "Full Stack", "E-commerce", "PWA"],
  },
  {
    name: "Technical Trainer",
    tag: "Java • Python • C • C++ • MERN Stack",
    desc: "Monitor case and next hearing smart alerts and deep observability.",
    img: "./advocate.png",
    alt: "IT service and Digital marketing",
    link: "/technical",
    features: ["Expert Training", "Live Projects", "Certification", "Placement Support"],
  },
  {
    name: "IoT Device Hub",
    tag: "Edge • Automation",
    desc: "Onboard, control and analyze thousands of devices securely from a single console.",
    img: "./iot1.png",
    alt: "IT service and Digital marketing",
    link: "/iothub",
    features: ["Device Control", "Real-time Monitoring", "Cloud Integration", "Security"],
  },
];

/* ======================
   ENHANCED PRODUCT CARD WITH 3D
====================== */
const ProductCard = ({ product, index, onNavigate }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);
  const rafRef = useRef(null);

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
    setShowDetails(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowDetails(true);
  }, []);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onNavigate(product.link);
  }, [onNavigate, product.link]);

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
      onMouseEnter={handleMouseEnter}
    >
      <div className="product-card-inner">
        <div className="product-image-wrap">
          <img 
            src={product.img} 
            alt={product.alt}
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

          {/* Features List */}
          <div className={`product-features ${showDetails ? 'visible' : ''}`}>
            {product.features.map((feature, idx) => (
              <div key={idx} className="feature-item">
                <span className="feature-icon">
                  <FaCheckCircle />
                </span>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>

          <button className="product-cta" onClick={handleClick}>
            <span className="cta-text">Click Here</span>
            <span className="cta-icon">
              <FaArrowRight />
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
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredTestimonial, setHoveredTestimonial] = useState(null);
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
      antialias: false,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = useCallback((link) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.body.classList.add('ripple-transition');

    const transitionTimer = setTimeout(() => {
      navigate(link);
      
      const scrollTimer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      
      document.body.classList.remove('ripple-transition');
      document.body.classList.add('page-fade-in');

      const fadeTimer = setTimeout(() => {
        document.body.classList.remove('page-fade-in');
        setIsTransitioning(false);
        window.scrollTo(0, 0);
      }, 800);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(fadeTimer);
      };
    }, 1200);

    return () => {
      clearTimeout(transitionTimer);
    };
  }, [isTransitioning, navigate]);

  const productCategories = [
    {
      icon: FaLaptopCode,
      title: "Web & App",
      count: "2",
      color: "#a78bff"
    },
    {
      icon: FaMobileAlt,
      title: "Marketing",
      count: "1",
      color: "#60efff"
    },
    {
      icon: FaGraduationCap,
      title: "Training",
      count: "1",
      color: "#ff6b9d"
    },
    {
      icon: FaNetworkWired,
      title: "IoT",
      count: "1",
      color: "#ffd93d"
    }
  ];


  return (
    <section className="product-section" id="product">
      {/* ❄️ Snow Canvas */}
      <canvas ref={snowRef} className="product-snow" />

      <div className="product-inner">
        <h2 className="product-title">Our Products</h2>
        <p className="product-subtitle">
          Scalable, secure and future-ready solutions crafted by LetNext Technologies.
        </p>

        {/* Category Overview */}
        <div className="category-section">
          <div className="category-grid">
            {productCategories.map((category, index) => (
              <div 
                key={index} 
                className="category-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="category-icon"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <span style={{ color: category.color }}>
                    <category.icon />
                  </span>
                </div>
                <h3 className="category-title">{category.title}</h3>
                <p className="category-count">{category.count} Products</p>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
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

        {/* Features Comparison Section */}
        <div className="comparison-section">
          <h3 className="comparison-title">Why Choose Our Products?</h3>
          <div className="comparison-grid">
            <div className="comparison-item">
              <div className="comparison-icon">
                <FaRocket />
              </div>
              <h4 className="comparison-heading">Lightning Fast</h4>
              <p className="comparison-text">Optimized for speed and performance across all devices</p>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon">
                <FaLock />
              </div>
              <h4 className="comparison-heading">Secure & Reliable</h4>
              <p className="comparison-text">Enterprise-grade security with 99.9% uptime guarantee</p>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon">
                <FaDollarSign />
              </div>
              <h4 className="comparison-heading">Cost Effective</h4>
              <p className="comparison-text">Best value for money with flexible pricing plans</p>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon">
                <FaBullseye />
              </div>
              <h4 className="comparison-heading">Easy to Use</h4>
              <p className="comparison-text">Intuitive interfaces designed for maximum productivity</p>
            </div>
          </div>
        </div>

       

        {/* CTA Section */}
        <div className="product-cta-section">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Get Started?</h3>
            <p className="cta-description">
              Join thousands of satisfied customers and transform your business today
            </p>
            <div className="cta-buttons">
              <button className="cta-primary-btn">
                Start Free Trial
                <span className="btn-icon">
                  <FaArrowRight />
                </span>
              </button>
              <button className="cta-secondary-btn">
                Contact 
                <span className="btn-icon">
                  <FaComments />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </section>
  );
}