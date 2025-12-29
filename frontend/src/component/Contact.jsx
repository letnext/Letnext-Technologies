import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import "../styles/contact.css";
// import Footer from "./Footer";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Contact = () => {
  const snowRef = useRef(null);
  const successParticlesRef = useRef(null);

  const [formStatus, setFormStatus] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ================= ❄️ SNOWFALL BACKGROUND ================= */
  useEffect(() => {
    const canvas = snowRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const snowCount = 2400;
    const positions = new Float32Array(snowCount * 3);
    const speeds = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = Math.random() * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      speeds[i] = 0.01 + Math.random() * 0.025;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const snow = new THREE.Points(geometry, material);
    scene.add(snow);

    /* SUCCESS BURST */
    const burstCount = 500;
    const burstPositions = new Float32Array(burstCount * 3);
    const burstVelocities = new Float32Array(burstCount * 3);

    for (let i = 0; i < burstCount; i++) {
      const speed = Math.random() * 2 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      burstVelocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      burstVelocities[i * 3 + 1] =
        speed * Math.sin(phi) * Math.sin(theta);
      burstVelocities[i * 3 + 2] = speed * Math.cos(phi);
    }

    const burstGeometry = new THREE.BufferGeometry();
    burstGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(burstPositions, 3)
    );

    const burstMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: "#60efff",
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const successParticles = new THREE.Points(
      burstGeometry,
      burstMaterial
    );
    successParticles.visible = false;
    scene.add(successParticles);

    successParticlesRef.current = {
      successParticles,
      burstPositions,
      burstVelocities,
      burstGeometry,
      burstMaterial,
    };

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < snowCount; i++) {
        pos[i * 3 + 1] -= speeds[i];
        pos[i * 3] += Math.sin(Date.now() * 0.0004 + i) * 0.002;
        if (pos[i * 3 + 1] < -30) pos[i * 3 + 1] = 60;
      }
      geometry.attributes.position.needsUpdate = true;

      if (formStatus === "success") {
        const {
          burstPositions,
          burstVelocities,
          burstGeometry,
          burstMaterial,
        } = successParticlesRef.current;

        for (let i = 0; i < burstCount; i++) {
          burstPositions[i * 3] += burstVelocities[i * 3] * 0.05;
          burstPositions[i * 3 + 1] +=
            burstVelocities[i * 3 + 1] * 0.05;
          burstPositions[i * 3 + 2] +=
            burstVelocities[i * 3 + 2] * 0.05 - 0.02;
        }

        burstGeometry.attributes.position.needsUpdate = true;
        burstMaterial.opacity = Math.max(0, burstMaterial.opacity - 0.01);
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      burstGeometry.dispose();
      burstMaterial.dispose();
      renderer.dispose();
    };
  }, [formStatus]);

  /* ================= FORM SUBMISSION ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    setFormMessage("");

    try {
      const res = await fetch(`${BASE_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFormStatus("success");
      setFormMessage("Message sent successfully! ");

      const burst = successParticlesRef.current;
      if (burst) {
        burst.successParticles.visible = true;
        burst.burstMaterial.opacity = 1;
        burst.burstPositions.fill(0);
        burst.burstGeometry.attributes.position.needsUpdate = true;
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormStatus("error");
      setFormMessage("Oops! Something went wrong.");
    }

    setTimeout(() => {
      setFormStatus("");
      setFormMessage("");
      if (successParticlesRef.current) {
        successParticlesRef.current.successParticles.visible = false;
      }
    }, 4000);
  };

  /* ================= SOCIAL LINKS ================= */
  const socialLinks = [
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/letnexttechnologies1", color: "#0077B5", label: "LinkedIn" },
    // { icon: FaTwitter, url: "https://twitter.com", color: "#1DA1F2", label: "Twitter" },
    { icon: FaInstagram, url: "https://www.instagram.com/letnext_technologies", color: "#E4405F", label: "Instagram" },
    { icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61580107612289", color: "#1877F2", label: "Facebook" },
    // { icon: FaGithub, url: "https://github.com", color: "#333", label: "GitHub" },
  ];

  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer Digital Marketing, Web & App Development, IoT Solutions, and Technical Training services.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity, typically ranging from 2–12 weeks.",
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes! We offer 24/7 support and maintenance packages for all our projects.",
    },
    {
      question: "What is your pricing model?",
      answer:
        "We offer flexible pricing based on project scope. Contact us for a custom quote.",
    },
  ];

  return (
    <>
      <section className="contact-section" id="contact">
        <canvas ref={snowRef} className="contact-snow" />

        <div className="contact-container">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have a project in mind? Let's build something extraordinary together.
          </p>

          <div className="contact-content">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
              <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
              <textarea name="message" value={formData.message} onChange={handleChange} rows="6" placeholder="Your Message" required />

              <button type="submit" className={`submit-btn ${formStatus}`}>
                {formStatus === "sending" && "Sending..."}
                {formStatus === "success" && "Sent ✓"}
                {formStatus === "error" && "Failed"}
                {!formStatus && "Send Message →"}
              </button>

              {formMessage && (
                <div className={`form-feedback ${formStatus}`}>
                  {formMessage}
                </div>
              )}
            </form>

            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon"><FaEnvelope /></div>
                <div className="info-text">
                  <h3>Email</h3>
                  <a href="mailto:lnt@letnexttechnologies.com">
                    lnt@letnexttechnologies.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><MdLocalPhone /></div>
                <div className="info-text">
                  <h3>Phone</h3>
                  <a href="tel:+919043327940">+91 90433 27940</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><FaMapMarkerAlt /></div>
                <div className="info-text">
                  <h3>Location</h3>
                  <span>Gobi, Erode, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="social-section">
            <h3 className="social-title">Connect With Us</h3>
            <p className="social-subtitle">
              Follow us on social media for updates and insights
            </p>

            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ "--social-color": social.color }}
                  aria-label={social.label}
                >
                  <social.icon />
                  <span className="social-tooltip">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="faq-section">
            <h3 className="faq-title">Frequently Asked Questions</h3>
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeFAQ === index ? "active" : ""}`}
                  onClick={() =>
                    setActiveFAQ(activeFAQ === index ? null : index)
                  }
                >
                  <div className="faq-question">
                    <h4>{faq.question}</h4>
                    <span>{activeFAQ === index ? "−" : "+"}</span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="quick-stats">
            <div className="stat-box">
              <div className="stat-value">98%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default Contact;
