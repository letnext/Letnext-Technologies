import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaTimes,
  FaPaperPlane,
  FaHeart,
  FaHome,
  FaSearch,
  FaPlusSquare,
} from "react-icons/fa";
import "../styles/Instagram.css";

const Instagram = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showStories, setShowStories] = useState(true);

  // Your Instagram username (without @)
  const instagramUsername = "letnext_technologies";
  const instagramUrl = `https://www.instagram.com/${instagramUsername}`;

  // Default message for DM
  const defaultMessage = "Hey! I'm interested in your services 🚀";

  useEffect(() => {
    if (isOpen) {
      // Simulate bot typing when chat opens
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    // Opens Instagram profile (direct DM link is not supported by Instagram)
    window.open(instagramUrl, "_blank");
    setMessage("");
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "profile":
        window.open(instagramUrl, "_blank");
        break;
      case "dm":
        window.open(instagramUrl, "_blank");
        break;
      case "story":
        window.open(`${instagramUrl}/stories`, "_blank");
        break;
      default:
        window.open(instagramUrl, "_blank");
    }
  };

  const quickActions = [
    { icon: "👋", text: "View Our Profile", action: "profile" },
    { icon: "💬", text: "Send us a DM", action: "dm" },
    { icon: "📸", text: "Check Our Stories", action: "story" },
  ];

  return (
    <>
      {/* Instagram Chat Box */}
      <div className={`instagram-chat-container ${isOpen ? "open" : ""}`}>
        {/* Instagram Header */}
        <div className="instagram-chat-header">
          <div className="instagram-header-content">
            <div className="instagram-avatar">
              <div className="instagram-story-ring">
                <img
                  src="https://ui-avatars.com/api/?name=LetNext+Tech&background=E1306C&color=fff&bold=true"
                  alt="LetNext Technologies"
                />
              </div>
              <span className="instagram-active-dot"></span>
            </div>
            <div className="instagram-header-text">
              <h4>letnext_technologies</h4>
              <p>
                <span className="verified-badge">✓</span>
                Active now
              </p>
            </div>
          </div>
          <button className="instagram-close-btn" onClick={toggleChat}>
            <FaTimes />
          </button>
        </div>

        {/* Instagram Stories Preview */}
        {showStories && (
          <div className="instagram-stories-bar">
            <div className="story-item active" onClick={() => handleQuickAction("story")}>
              <div className="story-avatar">
                <img
                  src="https://ui-avatars.com/api/?name=Services&background=667781&color=fff"
                  alt="Services"
                />
              </div>
              <span className="story-label">Services</span>
            </div>
            <div className="story-item" onClick={() => handleQuickAction("story")}>
              <div className="story-avatar">
                <img
                  src="https://ui-avatars.com/api/?name=Projects&background=FF6B6B&color=fff"
                  alt="Projects"
                />
              </div>
              <span className="story-label">Projects</span>
            </div>
            <div className="story-item" onClick={() => handleQuickAction("story")}>
              <div className="story-avatar">
                <img
                  src="https://ui-avatars.com/api/?name=Team&background=4ECDC4&color=fff"
                  alt="Team"
                />
              </div>
              <span className="story-label">Team</span>
            </div>
            <div className="story-item" onClick={() => handleQuickAction("story")}>
              <div className="story-avatar">
                <img
                  src="https://ui-avatars.com/api/?name=News&background=FFD93D&color=333"
                  alt="News"
                />
              </div>
              <span className="story-label">News</span>
            </div>
          </div>
        )}

        {/* Chat Body */}
        <div className="instagram-chat-body">
          {/* Welcome Message */}
          <div className="instagram-message received">
            <div className="message-avatar">
              <img
                src="https://ui-avatars.com/api/?name=LT&background=E1306C&color=fff&bold=true"
                alt="LetNext"
              />
            </div>
            <div className="message-bubble">
              <div className="message-content">
                <p>
                  <strong>Hey there! 👋✨</strong>
                  <br />
                  Welcome to LetNext Technologies
                </p>
              </div>
              <span className="message-time">Just now</span>
            </div>
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="instagram-message received typing">
              <div className="message-avatar">
                <img
                  src="https://ui-avatars.com/api/?name=LT&background=E1306C&color=fff&bold=true"
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
            <div className="instagram-message received">
              <div className="message-avatar">
                <img
                  src="https://ui-avatars.com/api/?name=LT&background=E1306C&color=fff&bold=true"
                  alt="LetNext"
                />
              </div>
              <div className="message-bubble">
                <div className="message-content">
                  <p>
                    We're thrilled to connect! 🎯
                    <br />
                    <br />
                    Choose what you'd like to do:
                  </p>
                </div>
                <span className="message-time">Just now</span>
              </div>
            </div>
          )}

          {/* Quick Action Cards */}
          {!isTyping && (
            <div className="instagram-quick-actions">
              {quickActions.map((item, index) => (
                <button
                  key={index}
                  className="instagram-action-card"
                  onClick={() => handleQuickAction(item.action)}
                >
                  <span className="action-icon">{item.icon}</span>
                  <span className="action-text">{item.text}</span>
                  <span className="action-arrow">→</span>
                </button>
              ))}
            </div>
          )}

          {/* Instagram Post Preview */}
          {!isTyping && (
            <div className="instagram-post-preview">
              <div className="post-header">
                <div className="post-avatar">
                  <img
                    src="https://ui-avatars.com/api/?name=LT&background=E1306C&color=fff&bold=true"
                    alt="LetNext"
                  />
                </div>
                <span className="post-username">letnext_technologies</span>
              </div>
              <div className="post-content">
                <div className="post-gradient">
                  <p>🚀 Building Digital Excellence</p>
                </div>
              </div>
              <div className="post-actions">
                <FaHeart className="post-icon" />
                <span>Follow us on Instagram!</span>
              </div>
            </div>
          )}
        </div>

        {/* Instagram Footer */}
        <div className="instagram-chat-footer">
          <div className="instagram-input-container">
            <button className="emoji-btn">😊</button>
            <input
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="instagram-send-btn" onClick={handleSendMessage}>
              {message.trim() ? <FaPaperPlane /> : <FaHeart />}
            </button>
          </div>
          <div className="instagram-footer-nav">
            <FaHome className="nav-icon active" />
            <FaSearch className="nav-icon" />
            <FaPlusSquare className="nav-icon" />
            <FaInstagram className="nav-icon" />
          </div>
        </div>
      </div>

      {/* Floating Instagram Button */}
      <div className={`instagram-float-btn ${isOpen ? "hidden" : ""}`}>
        <button onClick={toggleChat} className="instagram-main-btn">
          <FaInstagram className="instagram-icon" />
          <div className="instagram-gradient-ring"></div>
          <div className="instagram-pulse"></div>
        </button>
        <div className="instagram-tooltip">
          <span className="tooltip-text">Follow us on Instagram!</span>
          <div className="tooltip-badge">
            <span className="badge-count">New</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instagram;