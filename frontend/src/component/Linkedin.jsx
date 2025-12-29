import React, { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaTimes,
  FaPaperPlane,
  FaBriefcase,
  FaUserPlus,
  FaEnvelope,
  FaThumbsUp,
  FaComment,
  FaShare,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import "../styles/linkedin.css";

const Linkedin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Your LinkedIn profile URL
  const linkedinUrl = "https://www.linkedin.com/in/letnexttechnologies1";

  // Default connection message
  const defaultMessage = "I'd like to connect and discuss potential opportunities.";

  useEffect(() => {
    if (isOpen) {
      // Simulate professional typing delay
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleConnect = () => {
    window.open(linkedinUrl, "_blank");
    setMessage("");
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "profile":
        window.open(linkedinUrl, "_blank");
        break;
      case "connect":
        window.open(linkedinUrl, "_blank");
        break;
      case "message":
        window.open(`${linkedinUrl}/detail/contact-info/`, "_blank");
        break;
      case "follow":
        window.open(linkedinUrl, "_blank");
        break;
      default:
        window.open(linkedinUrl, "_blank");
    }
  };

  const quickActions = [
    {
      icon: <FaUserPlus />,
      title: "Connect with Us",
      desc: "Expand your professional network",
      action: "connect",
      color: "#0a66c2",
    },
    {
      icon: <FaEnvelope />,
      title: "Send Message",
      desc: "Start a conversation",
      action: "message",
      color: "#057642",
    },
    {
      icon: <FaBriefcase />,
      title: "View Profile",
      desc: "Explore our services & expertise",
      action: "profile",
      color: "#915907",
    },
  ];

  const companyHighlights = [
    { label: "Industry", value: "Technology Services" },
    { label: "Specialties", value: "Digital Transformation" },
    { label: "Network", value: "500+ Connections" },
  ];

  return (
    <>
      {/* LinkedIn Chat Box */}
      <div className={`linkedin-chat-container ${isOpen ? "open" : ""}`}>
        {/* LinkedIn Header */}
        <div className="linkedin-chat-header">
          <div className="linkedin-header-content">
            <div className="linkedin-avatar">
              <img
                src="https://ui-avatars.com/api/?name=LetNext+Tech&background=0a66c2&color=fff&bold=true&size=128"
                alt="LetNext Technologies"
              />
              <span className="linkedin-premium-badge">
                <IoSparkles />
              </span>
            </div>
            <div className="linkedin-header-text">
              <h4>LetNext Technologies</h4>
              <p className="linkedin-tagline">
                Building Digital Excellence | Tech Solutions
              </p>
              <div className="linkedin-status">
                <span className="status-dot"></span>
                <span className="status-text">Available for opportunities</span>
              </div>
            </div>
          </div>
          <button className="linkedin-close-btn" onClick={toggleChat}>
            <FaTimes />
          </button>
        </div>

        {/* Company Highlights Bar */}
        <div className="linkedin-highlights-bar">
          {companyHighlights.map((highlight, index) => (
            <div key={index} className="highlight-item">
              <span className="highlight-label">{highlight.label}</span>
              <span className="highlight-value">{highlight.value}</span>
            </div>
          ))}
        </div>

        {/* Chat Body */}
        <div className="linkedin-chat-body">
          {/* Welcome Message */}
          <div className="linkedin-message received">
            <div className="message-avatar">
              <img
                src="https://ui-avatars.com/api/?name=LT&background=0a66c2&color=fff&bold=true"
                alt="LetNext"
              />
            </div>
            <div className="message-container">
              <div className="message-header">
                <span className="message-name">LetNext Technologies</span>
                <span className="message-title">Technology Solutions Provider</span>
              </div>
              <div className="message-bubble">
                <p>
                  <strong>Welcome to LetNext Technologies! 🚀</strong>
                  <br />
                  <br />
                  We're a leading technology solutions provider specializing in
                  digital transformation and innovative tech services.
                </p>
              </div>
              <span className="message-time">Just now</span>
            </div>
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="linkedin-message received typing">
              <div className="message-avatar">
                <img
                  src="https://ui-avatars.com/api/?name=LT&background=0a66c2&color=fff&bold=true"
                  alt="LetNext"
                />
              </div>
              <div className="typing-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {!isTyping && (
            <div className="linkedin-message received">
              <div className="message-avatar">
                <img
                  src="https://ui-avatars.com/api/?name=LT&background=0a66c2&color=fff&bold=true"
                  alt="LetNext"
                />
              </div>
              <div className="message-container">
                <div className="message-header">
                  <span className="message-name">LetNext Technologies</span>
                </div>
                <div className="message-bubble">
                  <p>
                    Let's connect! Choose how you'd like to engage with us:
                  </p>
                </div>
                <span className="message-time">Just now</span>
              </div>
            </div>
          )}

          {/* Quick Action Cards */}
          {!isTyping && (
            <div className="linkedin-quick-actions">
              {quickActions.map((item, index) => (
                <button
                  key={index}
                  className="linkedin-action-card"
                  onClick={() => handleQuickAction(item.action)}
                  style={{ "--accent-color": item.color }}
                >
                  <div
                    className="action-icon"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="action-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="action-arrow">→</div>
                </button>
              ))}
            </div>
          )}

          {/* LinkedIn Post Card */}
          {!isTyping && (
            <div className="linkedin-post-card">
              <div className="post-header">
                <div className="post-avatar">
                  <img
                    src="https://ui-avatars.com/api/?name=LT&background=0a66c2&color=fff&bold=true"
                    alt="LetNext"
                  />
                </div>
                <div className="post-info">
                  <h4>LetNext Technologies</h4>
                  <p>5,000+ followers · 2h</p>
                </div>
              </div>
              <div className="post-content">
                <p>
                  🎯 <strong>Transforming Ideas into Reality</strong>
                  <br />
                  <br />
                  We help businesses leverage cutting-edge technology to achieve
                  their digital transformation goals.
                  <br />
                  <br />
                  #DigitalTransformation #Innovation #TechSolutions
                </p>
              </div>
              <div className="post-stats">
                <span className="post-likes">
                  <FaThumbsUp className="stat-icon" /> 250 reactions
                </span>
                <span className="post-comments">45 comments · 30 shares</span>
              </div>
              <div className="post-actions">
                <button className="post-action-btn">
                  <FaThumbsUp /> Like
                </button>
                <button className="post-action-btn">
                  <FaComment /> Comment
                </button>
                <button className="post-action-btn">
                  <FaShare /> Share
                </button>
              </div>
            </div>
          )}

          {/* Professional CTA */}
          {!isTyping && (
            <div className="linkedin-cta-banner">
              <div className="cta-content">
                <h4>Ready to collaborate?</h4>
                <p>Join our network of professionals and innovators</p>
              </div>
              <button
                className="cta-button"
                onClick={() => handleQuickAction("connect")}
              >
                <FaUserPlus /> Connect Now
              </button>
            </div>
          )}
        </div>

        {/* LinkedIn Footer */}
        <div className="linkedin-chat-footer">
          <div className="linkedin-input-container">
            <input
              type="text"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleConnect()}
            />
            <button className="linkedin-send-btn" onClick={handleConnect}>
              {message.trim() ? <FaPaperPlane /> : <FaLinkedin />}
            </button>
          </div>
          <div className="linkedin-footer-text">
            <FaLinkedin className="footer-icon" />
            <span>Powered by LinkedIn Professional Network</span>
          </div>
        </div>
      </div>

      {/* Floating LinkedIn Button */}
      <div className={`linkedin-float-btn ${isOpen ? "hidden" : ""}`}>
        <button onClick={toggleChat} className="linkedin-main-btn">
          <FaLinkedin className="linkedin-icon" />
          <div className="linkedin-ring"></div>
          <div className="linkedin-pulse"></div>
        </button>
        <div className="linkedin-tooltip">
          <div className="tooltip-content">
            <span className="tooltip-title">Connect on LinkedIn</span>
            <span className="tooltip-subtitle">
              Expand your professional network
            </span>
          </div>
          <div className="tooltip-badge">
            <IoSparkles className="badge-icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Linkedin;