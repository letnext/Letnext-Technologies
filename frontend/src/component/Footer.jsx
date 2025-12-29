import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import Snowfall from "react-snowfall";
import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  // ✅ Fixed navigation with proper transition handling
  const handleFooterNav = (e, path) => {
    e.preventDefault();
    
    // Prevent navigation if already transitioning or on same page
    if (transitioning || location.pathname === path) return;

    setTransitioning(true);
    
    // Add zoom-out class
    document.body.classList.add("zoom-out");

    // Wait for zoom-out animation to complete
    setTimeout(() => {
      // Navigate to new page
      navigate(path);
      
      // Remove zoom-out and add zoom-in
      document.body.classList.remove("zoom-out");
      document.body.classList.add("zoom-in");

      // Scroll to top after navigation
      window.scrollTo(0, 0);

      // Remove zoom-in after animation completes
      setTimeout(() => {
        document.body.classList.remove("zoom-in");
        setTransitioning(false);
      }, 800);
    }, 800); // Increased timeout to match CSS animation
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Service", path: "/service" },
    { name: "Product", path: "/product" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61580107612289",
      icon: <FaFacebookF />,
      className: "facebook-icon",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/letnext_technologies",
      icon: <FaInstagram />,
      className: "instagram-icon",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/letnexttechnologies1",
      icon: <FaLinkedinIn />,
      className: "linkedin-icon",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/1234567890",
      icon: <FaWhatsapp />,
      className: "whatsapp-icon",
    },
  ];

  return (
    <footer className="footer-section">
      {/* ❄️ SNOWFALL LAYER */}
      <div className="snowfall-wrapper">
        <Snowfall
          snowflakeCount={80}
          radius={[0.8, 2.5]}
          speed={[0.3, 1]}
          wind={[-0.2, 0.3]}
        />
      </div>

      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <h3
            className="footer-logo"
            onClick={(e) => handleFooterNav(e, "/")}
            style={{ cursor: "pointer" }}
          >
            LetNext<span className="logo-highlight"> Technologies</span>
          </h3>

          <p className="footer-desc">
            Building the future of digital innovation with cutting-edge
            technology and creative solutions.
          </p>

          <p className="footer-email">lnt@letnexttechnologies.com</p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4 className="links-title">Quick Links</h4>
          <ul className="links-list">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.path}
                  className={`footer-link ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                  onClick={(e) => handleFooterNav(e, link.path)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4 className="social-title">Follow Us</h4>
          <div className="social-icons">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`social-icon ${social.className}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© {currentYear} LetNext Technologies. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;