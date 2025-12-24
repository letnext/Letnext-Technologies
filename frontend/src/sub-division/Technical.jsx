import React, { useState } from "react";
import Snowfall from "react-snowfall";
import "../sub-division/technical.css";

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

export default Technical;