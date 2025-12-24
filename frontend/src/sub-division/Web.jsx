import React, { useState } from "react";
import Snowfall from "react-snowfall";
import "../sub-division/web.css";

const Web = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      title: "Frontend Development",
      color: "#000000ff",
      image: "./asset/web1.png",
      description: "Creating stunning, responsive, and user-friendly interfaces using modern web technologies and frameworks.",
      features: [
        "React & Next.js",
        "Responsive Design",
        "Modern UI/UX",
        "Performance Optimization"
      ]
    },
    {
      id: 2,
      title: "Backend Development",
      color: "#000000ff",
      image: "./asset/web2.png",
      description: "Building robust, scalable server-side applications with secure APIs and efficient database management.",
      features: [
        "Node.js & Express",
        "RESTful APIs",
        "Database Design",
        "Security Best Practices"
      ]
    },
    {
      id: 3,
      title: "Full Stack Solutions",
      color: "#000000ff",
      image: "./asset/web3.png",
      description: "End-to-end web application development combining frontend excellence with backend reliability.",
      features: [
        "MERN/MEAN Stack",
        "Cloud Integration",
        "Microservices",
        "CI/CD Pipeline"
      ]
    },
    {
      id: 4,
      title: "Progressive Web Apps",
      color: "#000000ff",
      image: "./asset/web4.png",
      description: "Developing modern PWAs that combine the best of web and mobile apps for seamless user experiences.",
      features: [
        "Offline Functionality",
        "App-like Experience",
        "Push Notifications",
        "Fast & Reliable"
      ]
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="web-section">
      {/* ❄️ SNOWFALL BACKGROUND */}
      <div className="snowfall-wrapper">
        <Snowfall
          snowflakeCount={100}
          radius={[0.5, 2.5]}
          speed={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
        />
      </div>

      <div className="web-container">
        <div className="web-header">
          <h2 className="web-title">Web Development Services</h2>
          <p className="web-subtitle">
            Crafting exceptional web experiences with cutting-edge technologies
          </p>
        </div>

        <div className="cards-grid">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`web-card ${expandedCard === card.id ? "expanded" : ""}`}
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
                <img src={card.image} alt={card.title} className="card-image" />
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
      </div>
    </section>
  );
};

export default Web;