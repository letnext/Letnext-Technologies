import React, { useState } from "react";
import Snowfall from "react-snowfall";
import "../sub-division/iothub.css";
// import Footer from "../component/Footer";
import { FaNetworkWired, FaChartLine, FaCloud, FaShieldAlt, FaIndustry, FaHospital, FaBuilding, FaBolt, FaTruck, FaCogs, FaMicrochip, FaBrain } from "react-icons/fa";

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

        {/* NEW IOT PLATFORM CONTENT SECTION */}
        <div className="iot-content-section">
          <div className="iot-content-header">
            <h1 className="iot-h1">LetNext Technologies Smart IoT Platform – Intelligent Control, Monitoring & Secure Cloud Solutions</h1>
            <p className="iot-intro-text">
              Living in this hyper-connected world, technology is no more a tool; it's the backbone of modern businesses. That's exactly where LetNext Technologies steps in: helping organizations take control of devices, monitoring operations in real time, seamlessly integrating with the cloud, and securing all things from end to end.
            </p>
            <p className="iot-intro-text">
              Consider our platform the brain of your digital ecosystem: always active, always learning, and always protecting your assets. Whether it's industrial equipment, smart buildings, or connected healthcare devices, LetNext Technologies provides you with clarity, control, and confidence in your management.
            </p>
          </div>

          <div className="iot-intro-section">
            <h2 className="iot-h2">Introduction to LetNext Technologies</h2>

            <h3 className="iot-h3">Who We Are</h3>
            <p className="iot-text">
              LetNext Technologies always looks for innovation in the field of technology to develop smart and secure digital solutions. Our area of expertise includes developing IoT platforms, cloud systems, monitoring services, and enterprise-level security solutions.
            </p>
            <p className="iot-text">
              We not only develop software. We develop solutions to real-world problems. We build our software to integrate properly and efficiently into any software systems that a business uses.
            </p>

            <h3 className="iot-h3">Our Vision for Smart & Connected Systems</h3>
            <p className="iot-text iot-quote">
              "Technology should work smarter, not harder, when it comes to businesses."
            </p>
            <p className="iot-text">
              We believe that smarter systems make life easier, assist in saving money, and give better opportunities for growth. With us at "LetNext Technologies," you are not only adopting technology, you are investing in a smarter tomorrow.
            </p>
          </div>

          <div className="iot-platform-section">
            <h2 className="iot-h2">What Is the LetNext Smart Technology Platform?</h2>

            <h3 className="iot-h3">Overview of the Platform</h3>
            <p className="iot-text">
              The LetNext Smart Technology Platform happens to be an integrated solution capable of handling connected devices, cloud intelligence, and the finest levels of security.
            </p>
            <p className="iot-text">
              It connects all of your devices, information, and controls into one single interface, making it a breeze to manage.
            </p>

            <h3 className="iot-h3">Industries We Serve</h3>
            <p className="iot-text">Our platform is trusted across multiple industries, including:</p>
            <div className="industries-grid">
              <div className="industry-item">
                <FaIndustry className="industry-icon" />
                <p>Manufacturing & Industrial Automation</p>
              </div>
              <div className="industry-item">
                <FaHospital className="industry-icon" />
                <p>Healthcare & Medical Devices</p>
              </div>
              <div className="industry-item">
                <FaBuilding className="industry-icon" />
                <p>Smart Buildings & Infrastructure</p>
              </div>
              <div className="industry-item">
                <FaBolt className="industry-icon" />
                <p>Energy & Utilities</p>
              </div>
              <div className="industry-item">
                <FaTruck className="industry-icon" />
                <p>Logistics & Supply Chain</p>
              </div>
            </div>

            <h3 className="iot-h3">Why Choose LetNext Technologies</h3>
            <p className="iot-text">
              Because reliability matters. Scalability matters. Security matters. And at LetNext Technologies, we deliver all three—without compromise.
            </p>
          </div>

          <div className="iot-features-section">
            <h2 className="iot-h2">Core Features of LetNext Technologies</h2>
            <p className="iot-text">At the heart of our platform are four powerful pillars:</p>
            <ul className="pillars-list">
              <li>Device Control</li>
              <li>Real-time Monitoring</li>
              <li>Cloud Integration</li>
              <li>Security</li>
            </ul>
            <p className="iot-text">Let's break them down in detail.</p>

            <div className="feature-block">
              <div className="feature-icon-wrapper">
                <FaCogs className="feature-main-icon" />
              </div>
              <h3 className="iot-h3">Device Control – Smarter Control, Better Efficiency</h3>
              <p className="iot-text">
                Device control is where automation meets intelligence. To manage devices at LetNext Technologies is as simple as producing a music playlist with your smartphone.
              </p>

              <h4 className="iot-h4">Centralized Device Management</h4>
              <p className="iot-text">
                You can control all of your connected devices using one interface with our platform. Nothing is required of you.
              </p>
              <p className="iot-text">
                Devices can be started, stopped, configured, or updated from wherever, and the complexity of the functionality has reduced. Whether it's 10 devices or 10,000 devices, everything stays neatly organized.
              </p>

              <h4 className="iot-h4">Remote Access & Automation</h4>
              <p className="iot-text">
                Range is also no longer a problem. With the use of LetNext, devices can be controlled remotely from anywhere in the world.
              </p>
              <p className="iot-text">
                Automated rules and workflows ensure the device responds properly to certain conditions, like turning off the device if it is not used or adjusting the device configuration according to the usage of the configuration settings. Imagine having a boss who is virtual and is always on and doesn't sleep!
              </p>

              <h4 className="iot-h4">Device Control Use Cases</h4>
              <p className="iot-text">
                Device Control is applicable for diverse uses from controlling manufacturing plant equipment to controlling:
              </p>
              <ul className="use-cases-list">
                <li>Reduce human errors</li>
                <li>Improve uptime</li>
                <li>Optimize energy consumption</li>
              </ul>
              <p className="iot-text">More efficiency, less effort.</p>
            </div>

            <div className="feature-block">
              <div className="feature-icon-wrapper">
                <FaChartLine className="feature-main-icon" />
              </div>
              <h3 className="iot-h3">Real-time Monitoring – See Everything, Instantly</h3>
              <p className="iot-text iot-quote">
                "Imagine the value of being able to speak to your systems! Now, with LetNext Technologies, it's possible."
              </p>

              <h4 className="iot-h4">Live Data Tracking</h4>
              <p className="iot-text">
                Our Real-Time Monitoring feature provides instant visibility into device functionality and status. Data is constantly streaming to provide information in the blink of an eye.
              </p>
              <p className="iot-text">
                There is no waiting. There is no guessing. There is only information.
              </p>

              <h4 className="iot-h4">Performance & Health Monitoring</h4>
              <p className="iot-text">
                Problems before they turn into issues. With LetNext, the keen observation of the status of the systems always precedes notifications based on anomalies.
              </p>
              <p className="iot-text">
                It is like having a health monitor for your infrastructure—a way to sense early indicators that can prevent costly downtime.
              </p>

              <h4 className="iot-h4">Real-world Monitoring Scenarios</h4>
              <p className="iot-text">
                Ranging from monitoring the efficiency of machines in the manufacturing sector to monitoring medical equipment, which is sensitive to temperatures, there is no substitute for the reality of monitoring in real-time.
              </p>
            </div>

            <div className="feature-block">
              <div className="feature-icon-wrapper">
                <FaCloud className="feature-main-icon" />
              </div>
              <h2 className="iot-h2">Cloud Integration – Scalable, Flexible & Future-ready</h2>
              <p className="iot-text">The cloud is not just storage—it's power, scalability, and intelligence combined.</p>

              <h3 className="iot-h3">Cloud-based Architecture</h3>
              <p className="iot-text">
                LetNext Technologies functions using scalable cloud solutions. The system is cloud-based for enhanced scalability. The project relies on cloud solutions to develop the LetNext Technologies application.
              </p>
              <p className="iot-text">
                This means faster deployment, effortless updates, and an unmatched scalability.
              </p>

              <h3 className="iot-h3">Data Storage & Analytics</h3>
              <p className="iot-text">
                All your information is in the cloud, waiting for analysis. Our system interprets information into meaningful information through the use of dashboards and reporting.
              </p>
              <p className="iot-text">
                Think of the cloud as your virtual memory bank that is available at all times when needed.
              </p>

              <h4 className="iot-h4">Benefits of Cloud Integration</h4>
              <p className="iot-text">Cloud integration enables:</p>
              <ul className="benefits-list">
                <li>Easy system expansion</li>
                <li>Reduced infrastructure costs</li>
                <li>High availability and reliability</li>
              </ul>
              <p className="iot-text">Your business grows your platform grows with it.</p>
            </div>

            <div className="feature-block">
              <div className="feature-icon-wrapper">
                <FaShieldAlt className="feature-main-icon" />
              </div>
              <h2 className="iot-h2">Security – Built to Protect Your Data & Devices</h2>
              <p className="iot-text">In a connected world, security is non-negotiable.</p>

              <h3 className="iot-h3">End-to-End Encryption</h3>
              <p className="iot-text">
                LetNext Technologies employs end-to-end encryption from the device level to the cloud.
              </p>
              <p className="iot-text">
                This is a factor that guarantees personal information remains secure.
              </p>

              <h3 className="iot-h3">Secure Authentication & Access Control</h3>
              <p className="iot-text">
                Only the authorized person is provided access. Role-Based Access Control and secure means of authentication enable you to maintain complete control over what is visible and what is manageable.
              </p>

              <h4 className="iot-h4">Compliance & Security Standards</h4>
              <p className="iot-text">
                Our platform is built to support the best practices in the industry to provide a safe working environment.
              </p>
            </div>
          </div>

          <div className="iot-benefits-section">
            <h2 className="iot-h2">Benefits of Using LetNext Technologies Platform</h2>

            <div className="benefits-grid">
              <div className="benefit-card">
                <h3 className="iot-h3">Improved Operational Efficiency</h3>
                <p className="iot-text">Automation, real-time analytics, and control can be essential for enabling increased productivity.</p>
              </div>

              <div className="benefit-card">
                <h3 className="iot-h3">Cost Optimization</h3>
                <p className="iot-text">LetNext helps you get more out of what you have by optimizing downtime, energy consumption, and lowering the cost of maintenance.</p>
              </div>

              <div className="benefit-card">
                <h3 className="iot-h3">Scalability & Flexibility</h3>
                <p className="iot-text">Whether it is a start-up or an enterprise, our platform adapts to your needs, today and tomorrow.</p>
              </div>
            </div>
          </div>

          <div className="iot-use-cases">
            <h2 className="iot-h2">Use Cases Across Industries</h2>

            <div className="use-case-grid">
              <div className="use-case-item">
                <FaMicrochip className="use-case-icon" />
                <h3 className="iot-h3">Smart Manufacturing</h3>
                <p className="iot-text">Monitoring machines, automation, or increasing the productivity level to generate greater output.</p>
              </div>

              <div className="use-case-item">
                <FaHospital className="use-case-icon" />
                <h3 className="iot-h3">Healthcare & Medical Devices</h3>
                <p className="iot-text">To guarantee that the devices function properly, are compliant, and that patients receive proper protection.</p>
              </div>

              <div className="use-case-item">
                <FaBuilding className="use-case-icon" />
                <h3 className="iot-h3">Smart Buildings & Infrastructure</h3>
                <p className="iot-text">Control lighting, HVAC, and security systems with one smart platform.</p>
              </div>

              <div className="use-case-item">
                <FaBolt className="use-case-icon" />
                <h3 className="iot-h3">Energy & Utilities</h3>
                <p className="iot-text">User behavior, anomaly detection, and efficient energy distribution.</p>
              </div>
            </div>
          </div>

          <div className="iot-why-standout">
            <h2 className="iot-h2">Why LetNext Technologies Stands Out</h2>

            <div className="standout-grid">
              <div className="standout-item">
                <h3 className="iot-h3">Customizable Solutions</h3>
                <p className="iot-text">Every business is unique, and so are our solutions. We adapt our platform according to your needs.</p>
              </div>

              <div className="standout-item">
                <h3 className="iot-h3">Reliable Support & Maintenance</h3>
                <p className="iot-text">Our support team is always there to ensure our platform runs fluently and is updated and optimized continuously.</p>
              </div>

              <div className="standout-item">
                <h3 className="iot-h3">Proven Technology Expertise</h3>
                <p className="iot-text">LetNext Technologies, with its extensive knowledge and practical experience, brings solutions that you can believe in.</p>
              </div>
            </div>
          </div>

          <div className="iot-future">
            <h2 className="iot-h2">Future-ready Innovation with LetNext Technologies</h2>

            <div className="future-grid">
              <div className="future-item">
                <FaBrain className="future-icon" />
                <h3 className="iot-h3">AI & Predictive Intelligence</h3>
                <p className="iot-text">We leverage AI insights to better predict failures, optimize performance, and make better decisions.</p>
              </div>

              <div className="future-item">
                <FaNetworkWired className="future-icon" />
                <h3 className="iot-h3">IoT & Industry 4.0 Readiness</h3>
                <p className="iot-text">Our solution is futures-ready, perfectly compatible with Industry 4.0 and next-gen IoT.</p>
              </div>
            </div>
          </div>

          <div className="iot-conclusion">
            <h2 className="iot-h2">Conclusion</h2>
            <p className="iot-text">
              LetNext Technologies is more than technology – it's a tool empowering businesses. With smart device control, real-time monitoring, effortless integration with the cloud, and business-class security, we enable you to remain ahead in a connected world. If you are looking for a smart technology platform that is reliable, scalable, and secure, then LetNext Technologies is the transformation partner for you.
            </p>
          </div>

          <div className="iot-faqs">
            <h2 className="iot-h2">FAQs</h2>
            
            <div className="faq-list">
              <div className="faq-item">
                <h4 className="faq-question">What makes LetNext Technologies different from other platforms?</h4>
                <p className="faq-answer">Our focus on customization, security, and real-time intelligence sets us apart.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Is LetNext suitable for small businesses?</h4>
                <p className="faq-answer">Absolutely. Our scalable architecture supports businesses of all sizes.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">How secure is the LetNext platform?</h4>
                <p className="faq-answer">We use end-to-end encryption, secure authentication, and industry best practices.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Can the platform scale as my business grows?</h4>
                <p className="faq-answer">Yes. Cloud-based scalability ensures seamless growth without disruption.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Does LetNext offer customization and support?</h4>
                <p className="faq-answer">Yes. We provide tailored solutions with dedicated technical support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </section>
  );
};

export default Iothub;