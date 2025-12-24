import React, { useState } from "react";
import Snowfall from "react-snowfall";
import "../sub-division/digital.css";

const Digital = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      title: "Learning",
      color: "#000000ff", // Light purple
      image: "./asset/dig1.png",
      description: "Continuous learning and skill development through innovative training programs and educational resources.",
      features: [
        "Interactive Courses",
        "Expert-Led Sessions",
        "Certification Programs",
        "Self-Paced Learning"
      ]
    },
    {
      id: 2,
      title: "Implementing",
      color: "#000000ff", // Light yellow
      image: "./asset/dig2.png",
      description: "Strategic implementation of cutting-edge solutions with seamless integration and deployment processes.",
      features: [
        "Agile Methodology",
        "Best Practices",
        "Quality Assurance",
        "Risk Management"
      ]
    },
    {
      id: 3,
      title: "Testing",
      color: "#000000ff", // Light brown/beige
      image: "./asset/dig3.png",
      description: "Comprehensive testing frameworks ensuring reliability, performance, and security of digital solutions.",
      features: [
        "Automated Testing",
        "Performance Analysis",
        "Security Audits",
        "User Acceptance Testing"
      ]
    },
    {
      id: 4,
      title: "Growth",
      color: "#000000ff", // Light orange/coral
      image: "./asset/dig4.png",
      description: "Sustainable growth strategies powered by data-driven insights and continuous optimization.",
      features: [
        "Market Analysis",
        "Scalability Planning",
        "Performance Metrics",
        "Strategic Planning"
      ]
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="digital-section">
      {/* ❄️ SNOWFALL BACKGROUND */}
      <div className="snowfall-wrapper">
        <Snowfall
          snowflakeCount={100}
          radius={[0.5, 2.5]}
          speed={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
        />
      </div>

      <div className="digital-container">
        <div className="digital-header">
          <h2 className="digital-title">Our Digital Journey</h2>
          <p className="digital-subtitle">
            Explore our comprehensive approach to digital transformation
          </p>
        </div>

        <div className="cards-grid">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`digital-card ${expandedCard === card.id ? "expanded" : ""}`}
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

export default Digital;