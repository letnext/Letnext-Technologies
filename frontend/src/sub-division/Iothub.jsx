import React, { useState } from "react";
import Snowfall from "react-snowfall";
import "../sub-division/iothub.css";

const Iothub = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      title: "Smart Devices",
      color: "#000000ff",
      image: "./asset/iot1.png",
      description: "Intelligent IoT devices and sensors for comprehensive monitoring and automation across industries.",
      features: [
        "Real-time Monitoring",
        "Wireless Connectivity",
        "Energy Efficient",
        "Remote Control"
      ]
    },
    {
      id: 2,
      title: "Edge Computing",
      color: "#000000ff",
      image: "./asset/iot2.png",
      description: "Process data at the edge for faster response times and reduced bandwidth requirements.",
      features: [
        "Low Latency",
        "Local Processing",
        "Data Privacy",
        "Offline Capability"
      ]
    },
    {
      id: 3,
      title: "IoT Analytics",
      color: "#000000ff",
      image: "./asset/iot3.png",
      description: "Advanced analytics and machine learning for actionable insights from IoT device data.",
      features: [
        "Predictive Maintenance",
        "Pattern Recognition",
        "Anomaly Detection",
        "Data Visualization"
      ]
    },
    {
      id: 4,
      title: "Platform Integration",
      color: "#000000ff",
      image: "./asset/iot4.png",
      description: "Seamless integration with cloud platforms and enterprise systems for unified IoT management.",
      features: [
        "Multi-Protocol Support",
        "API Integration",
        "Scalable Architecture",
        "Security Standards"
      ]
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="iothub-section">
      {/* ❄️ SNOWFALL BACKGROUND */}
      <div className="snowfall-wrapper">
        <Snowfall
          snowflakeCount={100}
          radius={[0.5, 2.5]}
          speed={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
        />
      </div>

      <div className="iothub-container">
        <div className="iothub-header">
          <h2 className="iothub-title">IoT Hub Solutions</h2>
          <p className="iothub-subtitle">
            Connect, monitor, and manage your IoT ecosystem with ease
          </p>
        </div>

        <div className="cards-grid">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`iothub-card ${expandedCard === card.id ? "expanded" : ""}`}
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

export default Iothub;