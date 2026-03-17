import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";

import Navbar from "./common/Navbar";
import "./App.css";
import CookieConsent from "./component/CookieConsent";


// lazy loaded main pages
const Home = lazy(() => import("./component/Home"));
const Service = lazy(() => import("./component/Service"));
const Product = lazy(() => import("./component/Product"));
const About = lazy(() => import("./component/About"));
const Contact = lazy(() => import("./component/Contact"));
const Blogs = lazy(() => import("./component/Blogs"));
const Footer = lazy(() => import("./component/Footer"));
const HowWeWorkTestimonial = lazy(() => import("./component/HowWeWorkTestimonial"));
const Career = lazy(() => import("./component/Career"));

// widgets / floating components
const Chatbot = lazy(() => import("./component/Chatbot"));
const Whatapp = lazy(() => import("./component/Whatapp"));
const Instagram = lazy(() => import("./component/Instagram"));
const Linkedin = lazy(() => import("./component/Linkedin"));

// error
const NotFound = lazy(() => import("./component/Notfound"));

// sub divisions
const Digital = lazy(() => import("./sub-division/Digital"));
const Web = lazy(() => import("./sub-division/Web"));
const Technical = lazy(() => import("./sub-division/Technical"));
const Iothub = lazy(() => import("./sub-division/Iothub"));

function App() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const Loader = () => (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
      Loading...
    </div>
  );

  return (
    <Router>
      <Navbar />

      <Suspense fallback={<Loader />}>
        <div className={`app-wrapper ${fadeIn ? "fade-in" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/product" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/howweworktestimonial" element={<HowWeWorkTestimonial />} />
            <Route path="/career" element={<Career />} />

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
      </Suspense>

      {/* Cookie Consent Banner — shown once until user makes a choice */}
      <CookieConsent />
    </Router>
  );

}

export default App;
