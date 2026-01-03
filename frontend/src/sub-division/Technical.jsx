import React, { useState } from "react";
import Snowfall from "react-snowfall";
import "../sub-division/technical.css";
// import Footer from "../component/Footer";
import { FaGraduationCap, FaLaptopCode, FaCertificate, FaBriefcase, FaCode, FaDatabase } from "react-icons/fa";

const Technical = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      title: "Cloud Computing",
      color: "#000000ff",
      image: "./asset/tech1.png",
      description: "Scalable cloud infrastructure solutions with AWS, Azure, and Google Cloud for enterprise-grade applications.",
      features: [
        "AWS & Azure Services",
        "Cloud Migration",
        "Auto-Scaling",
        "Cost Optimization"
      ]
    },
    {
      id: 2,
      title: "DevOps & CI/CD",
      color: "#000000ff",
      image: "./asset/tech2.png",
      description: "Automated deployment pipelines and infrastructure as code for faster, reliable software delivery.",
      features: [
        "Jenkins & GitLab CI",
        "Docker & Kubernetes",
        "Infrastructure as Code",
        "Automated Testing"
      ]
    },
    {
      id: 3,
      title: "Cybersecurity",
      color: "#000000ff",
      image: "./asset/tech3.png",
      description: "Comprehensive security solutions protecting your infrastructure, applications, and data from threats.",
      features: [
        "Penetration Testing",
        "Security Audits",
        "Compliance Management",
        "Threat Detection"
      ]
    },
    {
      id: 4,
      title: "Data Engineering",
      color: "#000000ff",
      image: "./asset/tech4.png",
      description: "Building robust data pipelines and analytics platforms for intelligent business decision-making.",
      features: [
        "ETL Pipelines",
        "Big Data Solutions",
        "Data Warehousing",
        "Real-time Analytics"
      ]
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="technical-section">
      {/* ❄️ SNOWFALL BACKGROUND */}
      <div className="snowfall-wrapper">
        <Snowfall
          snowflakeCount={100}
          radius={[0.5, 2.5]}
          speed={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
        />
      </div>

      <div className="technical-container">
        <div className="technical-header">
          <h2 className="technical-title">Technical Expertise</h2>
          <p className="technical-subtitle">
            Advanced technical solutions powered by cutting-edge infrastructure
          </p>
        </div>

        <div className="cards-grid">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`technical-card ${expandedCard === card.id ? "expanded" : ""}`}
              style={{ backgroundColor: card.color }}
            >
              {/* CARD HEADER */}
              <div className="card-header">
                <h3 className="card-title">{card.title}</h3>
                <button
                  className="expand-btn"
                  onClick={() => toggleCard(card.id)}
                  aria-label={expandedCard === card.id ? "Collapse" : "Expand"}
                >
                  <svg
                    className={`expand-icon ${expandedCard === card.id ? "rotated" : ""}`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>

              {/* CARD IMAGE */}
              <div className="card-image-wrapper">
                <img src={card.image} alt="IT service and Digital marketing" className="card-image" />
                <div className="image-overlay" />
              </div>

              {/* EXPANDED CONTENT */}
              <div className="card-content">
                <p className="card-description">{card.description}</p>
                
                <div className="card-features">
                  <h4 className="features-title">Key Features:</h4>
                  <ul className="features-list">
                    {card.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NEW TECHNICAL TRAINING CONTENT SECTION */}
        <div className="training-content-section">
          <div className="training-content-header">
            <h1 className="training-h1">LetNext Technologies — Technical Trainer Program</h1>
            <p className="training-tech-badge">Technologies Covered: Java, Python, C, C++, MERN Stack</p>
          </div>

          <div className="training-block">
            <div className="training-icon-wrapper">
              <FaGraduationCap className="training-main-icon" />
            </div>
            <h2 className="training-h2">Expert Training</h2>
            <p className="training-text">
              At LetNext Technologies, we are pleased to announce training services with experts in training students to transform budding individuals into expert software professionals. Our Technical Trainer Program aims to build a high level of expertise in Java, Python, C, C++, and MERN Technologies. Every training module will be handled by experts who possess high-level knowledge and experience in the industry, thus enabling our students to gain in-depth knowledge in the theoretical as well as practical aspects.
            </p>
            <p className="training-text">
              The syllabus comprises areas like object-oriented programming, data structures, competitive programming, backend & frontend development, and modern software development. Since we have a very clear focus on explanations, practice problems, and doubt clearance, we ensure that the concept of these areas is nicely clear to the students.
            </p>
            <p className="training-text">
              Through the provision of an extremely interactive learning platform and one-on-one mentee support, the confidence to code effectively is implanted in the attendees. At LetNext Technologies, the objective is to ensure that each and every one of the students is employable and expert at the most demanded skills of programming. Be it a new beginning for a new career or an improvement for a better one, LetNext is the place to be.
            </p>
          </div>

          <div className="training-block">
            <div className="training-icon-wrapper">
              <FaLaptopCode className="training-main-icon" />
            </div>
            <h2 className="training-h2">Live Projects</h2>
            <p className="training-text">
              Learning will be most effective when knowledge is applied – that's why LetNext Technologies includes live projects within every level of learning. Students will have a chance to implement real-world projects for the industry, giving them a clear understanding of software development processes, architectures, error-checking processes, and implementations.
            </p>
            <p className="training-text">
              The Java & Python projects aid in developing enterprise-level apps, automation scripts, as well as data processing. The C & C++ projects assist in refining skills such as managing memory, algorithmic development, and performance optimizations. The MERN Stack projects revolve around the development of fully fledged web apps using MongoDB, Express, React, & Node.js.
            </p>
            <p className="training-text">
              The projects undertaken by the learners are rated by professionals in the industry to check the quality of the projects. This increases the learner's credibility to a huge extent as they are able to demonstrate their working experience in the projects in their portfolios and resumes. At "LetNext Technologies," we are able to make learners in the class ready to provide solutions to actual problems using the latest technologies.
            </p>
          </div>

          <div className="training-block">
            <div className="training-icon-wrapper">
              <FaCertificate className="training-main-icon" />
            </div>
            <h2 className="training-h2">Certification</h2>
            <p className="training-text">
              Upon successful completion of the course, LetNext Technologies awards a globally recognized certification to help students highlight their technical qualifications to employers. Our certification validates your skills in Java, Python, C, C++ and MERN Stack, showcasing your proficiency in programming, full-stack development, and software engineering principles.
            </p>
            <p className="training-text">
              This certification plays a crucial role in career growth, making resumes more competitive for roles like Java Developer, Python Developer, Software Engineer, Web Developer, and Full-Stack Developer. It also acts as proof of hands-on learning, live projects, and industry-based coding exposure.
            </p>
            <p className="training-text">
              We follow strict quality standards in assessments and project evaluation to ensure certification truly reflects student capability. With LetNext Technologies' certification, learners gain confidence and recognition in the job market, opening doors to opportunities in startups, MNCs, and IT product companies.
            </p>
          </div>

          <div className="training-block">
            <div className="training-icon-wrapper">
              <FaBriefcase className="training-main-icon" />
            </div>
            <h2 className="training-h2">Placement Support</h2>
            <p className="training-text">
              LetNext Technologies is beyond training; we guide the student at every step of the career with dedicated placement support. Our placement experts assist students in the preparation of resumes, conducting mock interviews, soft skills training, aptitude coaching, and personality development to make sure they are prepared well for every kind of job interview.
            </p>
            <p className="training-text">
              The students get privileged exposure to top IT companies in India through a strong network of hiring partners and frequent recruitment drives. We help learners confidently tackle technical interviews for roles pertaining to Java development, Python automation, C/C++ system programming, and full-stack MERN development.
            </p>
            <p className="training-text">
              Moreover, our mentorship does not end after certification. We further support the learners till they get the best career position, which is in harmony with their skills and aspirations. At LetNext Technologies, your placement success is our main goal, and we commit to helping you unlock your future in the IT industry.
            </p>
          </div>

          <div className="training-technologies">
            <h2 className="training-h2">Technologies We Teach</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <div className="tech-icon-box">
                  <FaCode />
                </div>
                <h3 className="tech-name">Java</h3>
                <p className="tech-desc">Enterprise-level application development</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon-box">
                  <FaCode />
                </div>
                <h3 className="tech-name">Python</h3>
                <p className="tech-desc">Automation & data processing</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon-box">
                  <FaCode />
                </div>
                <h3 className="tech-name">C & C++</h3>
                <p className="tech-desc">System programming & algorithms</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon-box">
                  <FaDatabase />
                </div>
                <h3 className="tech-name">MERN Stack</h3>
                <p className="tech-desc">Full-stack web development</p>
              </div>
            </div>
          </div>

          <div className="training-cta">
            <h2 className="training-h2">Ready to Start Your Tech Journey?</h2>
            <p className="training-text">
              Join LetNext Technologies today and transform your career with expert training, live projects, industry-recognized certification, and dedicated placement support.
            </p>
            <div className="cta-buttons">
              <button className="cta-primary">Enroll Now</button>
              <button className="cta-secondary">Download Brochure</button>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </section>
  );
};

export default Technical;