import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./common/Navbar";
import "./App.css";

// main pages
import Home from "./component/Home";
import Service from "./component/Service";
import Product from "./component/Product";
import About from "./component/About";
import Contact from "./component/Contact";
import Blogs from "./component/Blogs";
import Footer from "./component/Footer";
import HowWeWorkTestimonial from "./component/HowWeWorkTestimonial"

// widgets / floating components
import Chatbot from "./component/Chatbot";
import Whatapp from "./component/Whatapp";
import Instagram from "./component/Instagram";
import Linkedin from "./component/Linkedin";

// error
import NotFound from "./component/Notfound";

// sub divisions
import Digital from "./sub-division/Digital";
import Web from "./sub-division/Web";
import Technical from "./sub-division/Technical";
import Iothub from "./sub-division/Iothub";

function App() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Router>
      <Navbar />

      <div className={`app-wrapper ${fadeIn ? "fade-in" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/howweworktestimonial" element={<HowWeWorkTestimonial />} />

          {/* Sub divisions */}
          <Route path="/digital" element={<Digital />} />
          <Route path="/web" element={<Web />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/iothub" element={<Iothub />} />

          {/* Optional direct routes */}
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/whatapp" element={<Whatapp />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/linkedin" element={<Linkedin />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Global floating components */}
      <Linkedin />
      <Instagram />
      <Whatapp />
      <Chatbot />

      <Footer />
    </Router>
  );
}

export default App;
