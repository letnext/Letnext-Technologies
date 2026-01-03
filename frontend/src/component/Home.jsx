// Home.jsx — Merged Complete Version
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { create } from "zustand";
import Footer from "../component/Footer";
import HowWeWorkAndTestimonial from "./HowWeWorkTestimonial";
import { 
  FaLightbulb, 
  FaChartLine, 
  FaMobileAlt, 
  FaLaptopCode, 
  FaPalette, 
  FaMicrochip, 
  FaChalkboardTeacher,
  FaBullseye,
  FaBolt,
  FaHandshake,
  FaDollarSign,
  FaTrophy,
  FaClock
} from "react-icons/fa";

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
   ORIGINAL SERVICES SECTION COMPONENT
====================== */
const ServicesSection = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Make Us Your Go-To IT Partner",
      tag: "Sales • Support",
      description: "LetNext Technologies is a reputable Digital marketing company and IT solutions provider that uses technology and astute marketing to help businesses expand. As a trusted IT solution company in Erode, we offer complete Online marketing service solutions including digital marketing, custom software development, website development, Seo Service in erode, paid advertising, and managed IT solutions catered to corporate requirements.We are also recognized as a top software development company delivering scalable and reliable digital products.",
      features: ["We are dedicated to providing top-notch IT and digital services.", "Provided by seasoned experts that comprehend actual business difficulties", "Committed to comprehending our clients' actual needs and aspirations"],
      image: "/lnt.png",
      link: "/product",
      position: "left"
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    const items = sectionRef.current?.querySelectorAll('.service-item');
    items?.forEach((item) => observerRef.current?.observe(item));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleServiceClick = (link) => {
    navigate(link);
    window.scrollTo(0, 0);
  };

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">What We Do</h2>
          <p className="services-subtitle">
            Transforming ideas into digital reality through innovation, creativity, and technical excellence
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-item ${service.position} ${visibleItems.includes(index) ? 'visible' : ''
                }`}
              data-index={index}
              onClick={() => handleServiceClick(service.link)}
              style={{ cursor: 'pointer' }}
            >
              <div className="service-image-wrapper">
                <div className="service-image-container">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-image"
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                </div>
              </div>

              <div className="service-content-wrapper">
                <div className="service-content">
                  <div className="service-number">0{service.id}</div>
                  <h3 className="service-heading">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="service-feature">
                        <span className="feature-icon">→</span>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="service-btn">
                    <span>Learn More</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ======================
   NEW BLACK & WHITE SERVICES SECTION
====================== */
const ServicesBlackWhite = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const servicesRef = useRef(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      number: "01.",
      title: "Digital Marketing",
      icon: <FaChartLine />,
      description: "As a results-focused Digital marketing company, Our expertise as a Content marketing company, Seo Service in erode provider, Ad running company in erode, and Meta ad running company.",
      link: "/digital"
    },
    {
      id: 2,
      number: "02.",
      title: "App Development",
      icon: <FaMobileAlt />,
      description: "As a top software development company, Our app development services provide safe, scalable, and user-friendly mobile apps that are customized to your company's requirements and your clients' expectations.",
      link: "/web"
    },
    {
      id: 3,
      number: "03.",
      title: "Web development",
      icon: <FaLaptopCode />,
      description: "We use cutting-edge technology to build responsive, high-performing websites that improve user experience, increase engagement, and support your business objectives, strengthening our position as a trusted IT solution company in Erode.",
      link: "/web"
    },
    {
      id: 4,
      number: "04.",
      title: "UI / UX Designing",
      icon: <FaPalette />,
      description: "Our UI/UX design work focuses on producing aesthetically pleasing and user-friendly designs that enhance client satisfaction and offer smooth user experiences.",
      link: "/web"
    },
    {
      id: 5,
      number: "05.",
      title: "Internet of Things",
      icon: <FaMicrochip />,
      description: "To increase productivity and creativity, we provide intelligent IoT solutions that link devices, gather data in real time, and automate procedures.",
      link: "/iothub"
    },
    {
      id: 6,
      number: "06.",
      title: "Technical Trainer",
      icon: <FaChalkboardTeacher />,
      description: "With strong industry knowledge and practical experience, the trainer ensures learners gain real-world skills that align with current market demands.",
      link: "/technical"
    }
  ];

  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const items = servicesRef.current?.querySelectorAll('.service-card');
    items?.forEach((item) => servicesObserver.observe(item));

    return () => servicesObserver.disconnect();
  }, []);

  const handleServiceClick = (link) => {
    navigate(link);
    window.scrollTo(0, 0);
  };

  return (
    <section className="services-bw-section" ref={servicesRef}>
      <div className="services-bw-container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </div>

        <div className="services-bw-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${visibleItems.includes(index) ? 'visible' : ''}`}
              data-index={index}
              onClick={() => handleServiceClick(service.link)}
            >
              <div className="card-number">{service.number}</div>
              <div className="card-icon">{service.icon}</div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-description">{service.description}</p>
              <button className="card-btn">
                <span>Read More</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ======================
   WHY CHOOSE US SECTION
====================== */
const WhyChooseUs = () => {
  const [visibleWhyItems, setVisibleWhyItems] = useState([]);
  const whyRef = useRef(null);

  const whyChooseUs = [
    {
      id: 1,
      icon: <FaBullseye />,
      title: "Result-Driven Approach",
      description: "We focus on strategies that produce measurable results, using performance-based campaigns and professional online marketing service solutions to help your company expand."
    },
    {
      id: 2,
      icon: <FaBolt />,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality and attention to detail."
    },
    {
      id: 3,
      icon: <FaLightbulb />,
      title: "Customized Solutions",
      description: "We offer specialized IT and digital solutions made to fit your company's needs and objectives, backed by our experience as a top software development company."
    },
    {
      id: 4,
      icon: <FaHandshake />,
      title: "24/7 Support",
      description: "Round-the-clock assistance to ensure your business never stops running."
    },
    {
      id: 5,
      icon: <FaDollarSign />,
      title: "Cost Effective",
      description: "Competitive pricing with maximum value and return on your investment."
    },
    {
      id: 6,
      icon: <FaTrophy />,
      title: "Dedicated Support",
      description: "To guarantee successful implementation and long-term success, our team provides ongoing assistance and direction as a trusted IT solution company in Erode."
    }
  ];

  useEffect(() => {
    const whyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleWhyItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const items = whyRef.current?.querySelectorAll('.why-card');
    items?.forEach((item) => whyObserver.observe(item));

    return () => whyObserver.disconnect();
  }, []);

  return (
    <section className="why-choose-section" ref={whyRef}>
      <div className="why-choose-container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            What makes us different from the rest
          </p>
        </div>

        <div className="why-choose-grid">
          {whyChooseUs.map((item, index) => (
            <div
              key={item.id}
              className={`why-card ${visibleWhyItems.includes(index) ? 'visible' : ''}`}
              data-index={index}
            >
              <div className="why-icon-wrapper">
                <div className="why-icon">{item.icon}</div>
              </div>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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

            {/* <button
              className="read-more-btn magnetic-btn"
              onClick={handleReadMore}
            >
              <span className="btn-text">Read more</span>
              <span className="arrow">→</span>
              <span className="btn-glow"></span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Original Services Section */}
      <ServicesSection />

      {/* New Black & White Services Section */}
      <ServicesBlackWhite />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      <HowWeWorkAndTestimonial/>
    </section>
  );
}