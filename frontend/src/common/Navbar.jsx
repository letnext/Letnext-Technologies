import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Navbar shrink on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth navigation with liquid transition
  const handleNavClick = (e, path) => {
    e.preventDefault();

    if (transitioning || location.pathname === path) return;

    setTransitioning(true);
    setOpen(false);

    // Smooth transition
    document.body.classList.add("liquid-transition");

    setTimeout(() => {
      navigate(path);
      document.body.classList.remove("liquid-transition");
      document.body.classList.add("liquid-entrance");

      setTimeout(() => {
        document.body.classList.remove("liquid-entrance");
        setTransitioning(false);
      }, 600);
    }, 600);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Service", path: "/service" },
    { name: "Product", path: "/product" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* LOGO */}
      <div
        className="logo"
        onClick={(e) => handleNavClick(e, "/")}
      >
        LetNext<span className="logo-highlight"> Technologies</span>
      </div>

      {/* LINKS */}
      <div className={`nav-links ${open ? "open" : ""}`}>
        {navItems.map((item) => (
          <div key={item.name} className="nav-item-wrapper">
            <NavLink
              to={item.path}
              className="nav-item liquid-glass"
              onClick={(e) => handleNavClick(e, item.path)}
            >
              <span className="liquid-text">{item.name}</span>
              
              {/* Liquid layers */}
              <div className="liquid-layer liquid-layer-1"></div>
              <div className="liquid-layer liquid-layer-2"></div>
              <div className="liquid-layer liquid-layer-3"></div>
              
              {/* Glass reflection */}
              <div className="glass-reflection"></div>
              
              {/* Shine effect */}
              <div className="liquid-shine"></div>
            </NavLink>
          </div>
        ))}
      </div>

      {/* MOBILE MENU BUTTON */}
      <div
        className={`menu-btn ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;