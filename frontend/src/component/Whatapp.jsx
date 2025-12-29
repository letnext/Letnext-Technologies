import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";
import "../styles/whatspp.css";

const Whatapp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Your WhatsApp number with country code (without + or spaces)
  // Example: For +1 234 567 8900, use "12345678900"
  const whatsappNumber = "919043327940"; // Replace with your actual WhatsApp number

  // Default message that appears in the chat
  const defaultMessage = "Hello! I'm interested in your services.";

  useEffect(() => {
    if (isOpen) {
      // Simulate bot typing when chat opens
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    const messageToSend = message.trim() || defaultMessage;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      messageToSend
    )}`;
    window.open(whatsappUrl, "_blank");
    setMessage("");
  };

  const handleQuickMessage = (quickMsg) => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      quickMsg
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const quickMessages = [
    "I need help with Digital Marketing",
    "Tell me about App Development",
    "I want to discuss a project",
  ];

  return (
    <>
      {/* WhatsApp Chat Box */}
      <div className={`whatsapp-chat-container ${isOpen ? "open" : ""}`}>
        <div className="whatsapp-chat-header">
          <div className="whatsapp-header-content">
            <div className="whatsapp-avatar">
              <img
                src="https://ui-avatars.com/api/?name=LetNext+Tech&background=25D366&color=fff&bold=true"
                alt="LetNext Technologies"
              />
              <span className="whatsapp-status-dot"></span>
            </div>
            <div className="whatsapp-header-text">
              <h4>LetNext Technologies</h4>
              <p>
                <span className="status-indicator"></span>Online - We reply
                instantly
              </p>
            </div>
          </div>
          <button className="whatsapp-close-btn" onClick={toggleChat}>
            <FaTimes />
          </button>
        </div>

        <div className="whatsapp-chat-body">
          {/* Welcome Message */}
          <div className="whatsapp-message received">
            <div className="message-content">
              <p>
                Hi there! 👋
                <br />
                Welcome to <strong>LetNext Technologies</strong>
              </p>
            </div>
            <span className="message-time">Just now</span>
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="whatsapp-message received typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {!isTyping && (
            <div className="whatsapp-message received">
              <div className="message-content">
                <p>
                  How can we help you today? Choose a quick message or type
                  your own:
                </p>
              </div>
              <span className="message-time">Just now</span>
            </div>
          )}

          {/* Quick Reply Buttons */}
          {!isTyping && (
            <div className="quick-replies">
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleQuickMessage(msg)}
                >
                  {msg}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="whatsapp-chat-footer">
          <div className="whatsapp-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="whatsapp-send-btn" onClick={handleSendMessage}>
              <FaPaperPlane />
            </button>
          </div>
          <div className="whatsapp-footer-text">
            Powered by <strong>WhatsApp Business</strong>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className={`whatsapp-float-btn ${isOpen ? "hidden" : ""}`}>
        <button onClick={toggleChat} className="whatsapp-main-btn">
          <FaWhatsapp className="whatsapp-icon" />
          <span className="whatsapp-pulse"></span>
          <span className="whatsapp-pulse-ring"></span>
        </button>
        <div className="whatsapp-tooltip">Chat with us!</div>
      </div>
    </>
  );
};

export default Whatapp;