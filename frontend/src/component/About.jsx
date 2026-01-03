import { useEffect, useRef, useState } from "react";
import "../styles/about.css";
import Footer from "../component/Footer";
import {
  FaLightbulb,
  FaHandshake,
  FaBolt,
  FaBullseye,
  FaArrowRight,
  FaPhone,
  FaSearch,
  FaAd,
  FaCode,
  FaCogs
} from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";

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
    const targets = { projects: 50, clients: 30, years: 4 };
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
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#a78bff");
    gradient.addColorStop(0.3, "#8b6fff");
    gradient.addColorStop(0.5, "#60efff");
    gradient.addColorStop(0.7, "#8b6fff");
    gradient.addColorStop(1, "#a78bff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.strokeRect(5, 5, rect.width - 10, rect.height - 10);

    ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
    ctx.font = "bold 32px 'Poppins', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText("SCRATCH ME", rect.width / 2, rect.height / 2 - 20);
    
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

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35 * dpr, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    const progress = (transparent / (pixels.length / 4)) * 100;
    setScratchProgress(progress);

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

  /* ======================
     TEAM DATA
  ====================== */
  const team = [
    {
      name: "Sabari",
      role: "CEO & Founder",
      image: "../about/sabari.png",
      bio: "Visionary leader with 4+ years in tech innovation"
    },
  
    {
      name: "Elantamil Thendral",
      role: "Human Resource",
      image: "../about/thendral.png",
      bio: "Creative mind behind our award-winning designs"
    },
    {
      name: "Keerthivasan",
      role: "Head of Development",
      image: "../about/vasan.png",
      bio: "Full-stack expert leading our development team"
    },
  ];

  /* ======================
     VALUES DATA
  ====================== */
  const values = [
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "We constantly push boundaries to deliver cutting-edge solutions that stay ahead of the curve"
    },
    {
      icon: FaHandshake,
      title: "Collaboration",
      description: "Working together with clients as partners to achieve shared success and exceed expectations"
    },
    {
      icon: FaBolt,
      title: "Excellence",
      description: "Committed to delivering the highest quality in every project, no matter the size or scope"
    },
    {
      icon: FaBullseye,
      title: "Integrity",
      description: "Building trust through transparent communication and ethical business practices"
    }
  ];

  /* ======================
     TIMELINE DATA
  ====================== */
  const timeline = [
    {
      year: "2022",
      title: "Foundation",
      description: "LetNext Technologies was founded with a vision to revolutionize digital solutions"
    },
    {
      year: "2023",
      title: "Rapid Growth",
      description: "Expanded team to 20+ professionals and launched 30+ successful projects"
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Won multiple awards and established partnerships with Fortune 500 companies"
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Opened international offices and reached 50+ projects milestone"
    }
  ];

  /* ======================
     SCROLL ANIMATION OBSERVER
  ====================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  /* ======================
     HANDLE PHONE CALL
  ====================== */
  const handleScheduleCall = () => {
    window.location.href = 'tel:9940847940';
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
              Our expertise spans <strong>Web Development & App Development</strong>, <strong>Technical Trainer</strong>,
              <strong> Digital Marketing</strong>, <strong>Internet of Things</strong>, and digital
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

        {/* NEW COMPANY DESCRIPTION SECTION */}
        <div className="company-description-section scroll-animate">
          <div className="company-header">
            <h1 className="company-h1">About LetNext Technologies</h1>
            <p className="company-subtitle">Digital Marketing Company Driving Business Growth</p>
          </div>

          <div className="company-content">
            <p className="company-text">
              LetNext Technologies is a result-driven Digital Marketing agency, and we are dedicated to making sure that the growth of the businesses increases in the competitive world of the internet. We offer our service solution in Online Marketing that will prove beneficial in improving the visibility of the brand. Moreover, we will make sure that our services are valuable in taking the customers ahead. Since we are a trustworthy IT Solution company in the region of Erode, we have always made sure to use creativity, data, and technology in a way that will enable the use of digital strategies which will lead to making a difference.
            </p>
          </div>

          <div className="services-highlight">
            <div className="service-highlight-item">
              <div className="service-highlight-icon">
                <FaSearch />
              </div>
              <h2 className="company-h2">SEO Service in Erode & Paid Advertising Experts</h2>
              <p className="company-text">
                As a renowned Content marketing company, we provide engaging content to connect brands and their target consumers. Our niche SEO Service solution in Erode boosts the search engine rankings of the website, boosts the traffic of the website, and builds a positive online reputation. We are a renowned Ad running company in Erode, and our campaigns are data-driven and executed on both search and social platforms. Being a renowned Meta ad running firm, our teams provide effective ad campaigns aiming to maximize their online reach, engagement, as well as returns.
              </p>
            </div>

            <div className="service-highlight-item">
              <div className="service-highlight-icon">
                <FaCode />
              </div>
              <h3 className="company-h3">Top Software Development Company & IT Solutions</h3>
              <p className="company-text">
                LetNext Technologies is also known as the best software Development Company, which offers scalable and secure digital solutions. The software development process of our company is well-integrated with our digital marketing process. As a renowned IT solution provider in Erode, we focus on innovation, quality, and customer satisfaction. We develop digital products, from websites to customized softwares, which help in improved efficiency and growth of businesses. The combination of technology and digital marketing expertise helps businesses create a robust digital identity. LetNext Technologies, being a renowned IT solution provider in Erode, stays on top of this ever-changing digital landscape.
              </p>
            </div>
          </div>
        </div>

        {/* ENHANCED SCRATCH CARD MISSION */}
        <div className="about-mission animate-mission">
          <h3 className="mission-title">Our Mission</h3>
          
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

        {/* CORE VALUES SECTION */}
        <div className="values-section scroll-animate">
          <h3 className="section-title">Our Core Values</h3>
          <p className="section-subtitle">
            The principles that guide everything we do
          </p>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="value-card scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="value-icon">
                  <value.icon />
                </div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* JOURNEY TIMELINE */}
        <div className="timeline-section scroll-animate">
          <h3 className="section-title">Our Journey</h3>
          <p className="section-subtitle">
            Milestones that shaped our success story
          </p>

          <div className="timeline">
            {timeline.map((item, index) => (
              <div 
                key={index} 
                className={`timeline-item scroll-animate ${index % 2 === 0 ? 'left' : 'right'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-description">{item.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM SECTION */}
        <div className="team-section scroll-animate">
          <h3 className="section-title">Founders Of LetNext Technologies</h3>
          <p className="section-subtitle">
            The brilliant minds behind our success
          </p>

          <div className="team-grid">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="team-card scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="team-image-wrapper">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="team-image"
                  />
                  <div className="team-overlay"></div>
                </div>
                <div className="team-info">
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="cta-section scroll-animate">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Start Your Project?</h3>
            <p className="cta-description">
              Let's transform your vision into reality with innovative solutions
              tailored to your needs.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                Get Started
                <span className="btn-arrow">
                  <FaArrowRight />
                </span>
              </button>
              <button className="cta-btn secondary" onClick={handleScheduleCall}>
                Schedule a Call
                <span className="btn-arrow">
                  <MdLocalPhone />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </section>
  );
};

export default About;