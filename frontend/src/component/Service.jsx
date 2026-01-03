// Service.jsx - Enhanced with React Icons, Animated Stats, and Manual Navigation
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import "../styles/service.css";

import {
  FaChartLine,
  FaChartBar,
  FaRocket,
  FaLightbulb,
  FaMobileAlt,
  FaSyncAlt,
  FaPaintBrush,
  FaBolt,
  FaLaptopCode,
  FaBullseye,
  FaCog,
  FaLock,
  FaSearch,
  FaPalette,
  FaRuler,
  FaGlobe,
  FaWifi,
  FaRobot,
  FaCloud,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { FaBullseye as FaTarget } from "react-icons/fa6";

const services = [
  {
    name: "Digital Marketing",
    name1: "How we help your business growth",
    img: "../service/dig.png",
    color: "#FF6B6B",
    shortDesc: "Innovative solutions tailored to your needs",
    fullDesc: "We're a seasoned digital marketing company in Erode that's able to help you take your brand further and talk directly to the people who matter most by putting data to work in a way that gets real results, boosts your conversions, and sets your business up for long-term success.",
    features: [
      {
        icon: FaTarget,
        title: "Strategic Planning",
        desc: "By digging deep into who your audience is, what makes them tick, we come up with marketing strategies that are smart and focused to make sure every single campaign hits the right people at precisely the right time."
      },
      {
        icon: FaChartBar,
        title: "Analytics & Insights",
        desc: "We keep a close eye on your campaign's performance in real-time, and give you the insights you need to make a real difference - and get better and better results from your digital marketing spend with every passing day."
      },
      {
        icon: FaRocket,
        title: "Growth Marketing",
        desc: "Using affordable digital tactics that really deliver, we can help you build a bigger name for your business, drive in quality leads, and keep your revenue growing and growing across all your different channels."
      },
      {
        icon: FaLightbulb,
        title: "Innovative Content",
        desc: "As a company that's well-respected in the field of content marketing, we're able to create eye-catching images and content that really speaks to your audience and makes them sit up and take notice in a big way - and that's just the start of what we can do to make your brand shine."
      }
    ],
    services: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising (PPC)",
      "Social Media Marketing",
      "Email Marketing Campaigns",
      "Content Marketing Strategy",
      "Conversion Rate Optimization"
    ],
    stats: [
      { label: "Client", value: "50+" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Campaigns Launched", value: "30+" }
    ]
  },
  {
    name: "App Development",
    img: "../service/App.png",
    color: "#4ECDC4",
    shortDesc: "Innovative solutions tailored to your needs",
    fullDesc: "We build mobile apps that are not only quick and user-friendly, but actually useful for both the people who use them, and the businesses that own them. As an app development company in Erode, we keep our focus on creating apps that genuinely help people and businesses out in the long run. For us, that means doing things in a way that's both secure and affordable, rather than just churning out code for the sake of it.",
    features: [
      {
        icon: FaMobileAlt,
        title: "Native Development",
        desc: "We develop high-performance native apps for Android and iOS that fly on any device. Being a trusted IT solutions company in Erode, we consistently deliver apps that are super stable, feature-packed and offer a first-class user experience."
      },
      {
        icon: FaSyncAlt,
        title: "Cross-Platform",
        desc: "When projects are on a tight deadline, or a tight budget, we like using cross-platform development because it lets us write one piece of code that'll run smoothly on any number of devices, keeping costs down and still giving us a app that performs equally well everywhere"
      },
      {
        icon: FaPaintBrush,
        title: "UI/UX Excellence",
        desc: "We believe the first step to creating a great app is understanding the people who'll be using it, so we design clean, intuitive and engaging interfaces that look good, feel natural to use, and guide the user along a smooth journey from the very start to the end."
      },
      {
        icon: FaBolt,
        title: "Performance Optimization",
        desc: "We pay really close attention to how an app behaves in real life, making sure it loads super quick, responds smoothly and doesn't just crash and burn under pressure - so the user gets a dependable and frustration-free experience every time."
      }
    ],
    services: [
      "iOS App Development",
      "Android App Development",
      "React Native Development",
      "Flutter Development",
      "App Maintenance & Support",
      "App Store Optimization"
    ],
    stats: [
      { label: "Apps Delivered", value: "20+" },
      { label: "Active Users", value: "2M+" },
      { label: "App Store Rating", value: "4.8★" }
    ]
  },
  {
    name: "Web Development",
    img: "../service/web.png",
    color: "#45B7D1",
    shortDesc: "Innovative solutions tailored to your needs",
    fullDesc: "As a trusted IT solution company in Erode, we actually relish web development, which creates eye-catchy sites, feels easy to work with, and really converts visitors into real customers. From full-stack development down to ensuring your site looks great and works seamlessly on any device, maintaining security and reliability.",
    features: [
      {
        icon: FaLaptopCode,
        title: "Full-Stack Development",
        desc: "From front-end design to back-end logic, we create full web solutions that run smoothly and scale with your business."
      },
      {
        icon: FaBullseye,
        title: "Responsive Design",
        desc: "Your website looks great and works perfectly on mobiles, tablets, and desktops to ensure smooth user experiences."
      },
      {
        icon: FaCog,
        title: "Custom Solutions",
        desc: "We develop websites that are custom-fit to your business needs, granting you flexibility, performance, and long-term growth."
      },
      {
        icon: FaLock,
        title: "Security First",
        desc: "Because, from day one, a website should be built with strong security measures to keep it safe and reliable along with your customer data."
      }
    ],
    services: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "Content Management Systems",
      "Progressive Web Apps (PWA)",
      "API Development & Integration",
      "Web Performance Optimization"
    ],
    stats: [
      { label: "Websites Launched", value: "50+" },
      { label: "Uptime Guarantee", value: "99.9%" },
      { label: "Page Load Speed", value: "<2s" }
    ]
  },
  {
    name: "UI / UX Designing",
    img: "../service/uiux.png",
    color: "#96CEB4",
    shortDesc: "Innovative solutions tailored to your needs",
    fullDesc: "UI/UX designing involves the overall experience an app provides to its users. It is not just the interface of the app. As a UI/UX designing company, our focus is on designing our apps in a manner that they are interactive to a certain extent that the users wouldn't have to think twice about anything.",
    features: [
      {
        icon: FaSearch,
        title: "User Research",
        desc: "Before we even begin creating, we learn about our audience, their needs, behavior, and pain points. Learning from our users directly allows us to be better decision-makers and to build features that matter."
      },
      {
        icon: FaPalette,
        title: "Visual Design",
        desc: "Visual design is where the ideas are implemented. The aim of our effort is to bring out a clean layout, proper color combination, as well as good fonts so that our application looks good as well as feels great."
      },
      {
        icon: FaRuler,
        title: "Design Systems",
        desc: "Design systems assist us in maintaining consistency. By providing design rules and components that can be reused, design systems ensure that everything has the same design and functionality, which helps us save time and ensures that the experience remains fluent as the app scales"
      }
    ],
    services: [
      "User Experience (UX) Design",
      "User Interface (UI) Design",
      "Wireframing & Prototyping",
      "Design System Development",
      "Interaction Design",
      "Accessibility Consulting"
    ],
    stats: [
      { label: "Design Projects", value: "50+" },
      { label: "User Satisfaction", value: "96%" },
      { label: "Design ", value: "15+" }
    ]
  },
  {
    name: "Internet of Things",
    img: "../service/iot.png",
    color: "#FFEAA7",
    shortDesc: "Innovative solutions tailored to your needs",
    fullDesc: "Connect your physical and virtual experiences by leveraging innovative IoT solutions that improve efficiency and drive innovation for your business.",
    features: [
      {
        icon: FaGlobe,
        title: "Device Integration",
        desc: "Enjoy seamless connectivity between all your smart gadgets and sensors so that all your systems function in perfect harmony."
      },
      {
        icon: FaWifi,
        title: "Real-time Monitoring",
        desc: "Get real-time insights with the help of live data streaming, allowing you to always be one step ahead."
      },
      {
        icon: FaRobot,
        title: "AI & Automation",
        desc: "Use intelligent systems for learning, adapting, and optimizing to save time and increase productivity."
      },
      {
        icon: FaCloud,
        title: "Cloud Infrastructure",
        desc: "Use the Cloud to securely and efficiently manage your IoT data with solutions that are designed to grow with you."
      }
    ],
    services: [
      "Smart Home Solutions",
      "Industrial IoT Systems",
      "Sensor Network Design",
      "IoT Security Implementation",
      "Data Analytics & Visualization",
      "Edge Computing Solutions"
    ],
    stats: [
      { label: "Connected Devices", value: "20+" },
      { label: "Data Points Daily", value: "10+" },
      { label: "System Reliability", value: "99.8%" }
    ]
  },
];

// Counter Animation Component
function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric value
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');

    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * numericValue);

      setCount(currentCount + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return <div ref={elementRef}>{count}</div>;
}

export default function Service() {
  const snowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const sectionRefs = useRef([]);

  // Manual navigation state
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered && !isDragging) {
      autoScrollRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }, 3000);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isHovered, isDragging]);

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
      antialias: false,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

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

      if (deltaTime < frameInterval) return;

      lastTime = currentTime - (deltaTime % frameInterval);
      time += 0.01;

      const pos = geometry.attributes.position.array;

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

    // Scroll to the detail section
    setTimeout(() => {
      if (sectionRefs.current[index]) {
        sectionRefs.current[index].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }, []);

  // Manual Navigation Functions
  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % services.length);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  }, []);

  // Drag/Swipe Handlers
  const handleDragStart = useCallback((e) => {
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setDragStart(clientX);
    setIsDragging(true);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  }, []);

  const handleDragMove = useCallback((e) => {
    if (dragStart === null) return;

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  }, [dragStart]);

  const handleDragEnd = useCallback(() => {
    if (dragStart === null) return;

    const threshold = 50; // Minimum drag distance to trigger navigation

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Dragged right - go to previous
        handlePrevious();
      } else {
        // Dragged left - go to next
        handleNext();
      }
    }

    setDragStart(null);
    setDragOffset(0);
    setIsDragging(false);
  }, [dragStart, dragOffset, handlePrevious, handleNext]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePrevious, handleNext]);

  const getCardStyle = useCallback((index) => {
    const offset = (index - activeIndex + services.length) % services.length;
    const isActive = offset === 0;

    let transform = "";
    let opacity = 0;
    let zIndex = 0;
    let scale = 0.5;
    let blur = 8;

    // Apply drag offset to active card
    const dragTransform = isDragging && isActive ? `translateX(${dragOffset}px)` : "";

    if (isActive) {
      transform = `${dragTransform} translateX(0) translateY(0)`;
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
  }, [activeIndex, isDragging, dragOffset]);

  return (
    <div className="srv-page-wrapper">
      <canvas ref={snowRef} className="srv-snow-canvas" />

      <div className="srv-main-content">
        <h1 className="srv-page-title">Our Services</h1>
        <p className="srv-page-subtitle">
          With great confidence, we enable companies for their next phase of expansion by developing and delivering comprehensive IT solutions including web and mobile app development, bespoke software creation, and digital marketing.        </p>

        <div
          className="srv-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          // onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
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
                  transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
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
                    draggable="false"
                  />

                  <div className="srv-card-dark-gradient" />

                  <div className="srv-card-info">
                    <div
                      className={`srv-card-line ${isActive ? 'srv-card-line-expanded' : ''}`}
                      style={{ backgroundColor: service.color }}
                    />
                    <h3 className="srv-card-heading">{service.name}</h3>
                    <p className={`srv-card-text ${isActive ? 'srv-card-text-show' : ''}`}>
                      {service.shortDesc}
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

          {/* Navigation Buttons */}
          <button
            className="srv-nav-btn srv-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Previous service"
            style={{
              backgroundColor: `${services[activeIndex].color}20`,
              borderColor: services[activeIndex].color,
            }}
          >
            <FaChevronLeft style={{ color: services[activeIndex].color }} />
          </button>

          <button
            className="srv-nav-btn srv-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next service"
            style={{
              backgroundColor: `${services[activeIndex].color}20`,
              borderColor: services[activeIndex].color,
            }}
          >
            <FaChevronRight style={{ color: services[activeIndex].color }} />
          </button>
        </div>

        {/* Carousel Indicators */}
        {/* <div className="srv-carousel-indicators">
          {services.map((service, index) => (
            <button
              key={index}
              className={`srv-indicator-dot-btn ${index === activeIndex ? 'srv-indicator-active' : ''}`}
              onClick={() => handleCardClick(index)}
              aria-label={`Go to ${service.name}`}
              style={{
                backgroundColor: index === activeIndex ? service.color : 'rgba(255, 255, 255, 0.3)',
              }}
            />
          ))}
        </div> */}

        <div className="srv-cta-wrapper">
          <button
            className="srv-cta-btn"
            style={{
              backgroundColor: services[activeIndex].color,
              boxShadow: `0 10px 40px ${services[activeIndex].color}40`,
            }}
            onClick={() => handleCardClick(activeIndex)}
          >
            Explore {services[activeIndex].name}
          </button>
        </div>
      </div>

      {/* Detailed Service Sections */}
      <div className="srv-details-wrapper">
        {services.map((service, index) => (
          <section
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="srv-detail-section"
            style={{
              background: `linear-gradient(135deg, ${service.color}08 0%, transparent 100%)`
            }}
          >
            <div className="srv-detail-container">
              {/* Header */}
              <div className="srv-detail-header">
                <div className="srv-detail-icon" style={{ color: service.color }}>
                  {service.features[0].icon}
                </div>
                <h2 className="srv-detail-title">{service.name1}</h2>
                <h2 className="srv-detail-title1">{service.name}</h2>

                <p className="srv-detail-desc">{service.fullDesc}</p>
              </div>

              {/* Features Grid */}
              <div className="srv-features-grid">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="srv-feature-card"
                    style={{
                      animationDelay: `${idx * 0.1}s`
                    }}
                  >
                    <div
                      className="srv-feature-icon"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <span style={{ color: service.color }}>
                        {<feature.icon />}
                      </span>
                    </div>
                    <h3 className="srv-feature-title">{feature.title}</h3>
                    <p className="srv-feature-desc">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* Services List & Stats */}
              <div className="srv-content-grid">
                {/* Services List */}
                <div className="srv-services-list">
                  <h3 className="srv-list-title">What We Offer</h3>
                  <ul className="srv-list">
                    {service.services.map((item, idx) => (
                      <li
                        key={idx}
                        className="srv-list-item"
                        style={{
                          animationDelay: `${idx * 0.05}s`
                        }}
                      >
                        <span
                          className="srv-list-bullet"
                          style={{ backgroundColor: service.color }}
                        ></span>
                        <span className="srv-list-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats with Animation */}
                <div className="srv-stats-container">
                  <h3 className="srv-stats-title">Our Impact</h3>
                  <div className="srv-stats-grid">
                    {service.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="srv-stat-card"
                        style={{
                          borderColor: `${service.color}30`,
                          animationDelay: `${idx * 0.1}s`
                        }}
                      >
                        <div
                          className="srv-stat-value"
                          style={{ color: service.color }}
                        >
                          <AnimatedCounter value={stat.value} duration={2000} />
                        </div>
                        <div className="srv-stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="srv-detail-cta">
                <button
                  className="srv-detail-btn"
                  style={{
                    backgroundColor: service.color,
                    boxShadow: `0 10px 40px ${service.color}40`
                  }}
                >
                  Start {service.name} Project Today
                  <span className="srv-detail-arrow">→</span>
                </button>
              </div>
            </div>
          </section>
        ))}
        
      </div>

    </div>
  );
}