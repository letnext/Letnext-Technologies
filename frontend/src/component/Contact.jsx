import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import "../styles/contact.css";
import Footer from "./Footer";

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

    /* ✅ SUCCESS BURST */
    const burstCount = 500;
    const burstPositions = new Float32Array(burstCount * 3);
    const burstVelocities = new Float32Array(burstCount * 3);

    for (let i = 0; i < burstCount; i++) {
      burstPositions.fill(0);
      const speed = Math.random() * 2 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      burstVelocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      burstVelocities[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
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
          burstPositions[i * 3 + 1] += burstVelocities[i * 3 + 1] * 0.05;
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

  /* ================= FORM SUBMISSION (BACKEND FETCH) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    setFormMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setFormStatus("success");
      setFormMessage("Message sent successfully! 🚀");

      const burst = successParticlesRef.current;
      if (burst) {
        burst.successParticles.visible = true;
        burst.burstMaterial.opacity = 1;
        burst.burstPositions.fill(0);
        burst.burstGeometry.attributes.position.needsUpdate = true;
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
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

  return (
    <>
      <section className="contact-section" id="contact">
        <canvas ref={snowRef} className="contact-snow" />

        <div className="contact-container">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have a project in mind? Let’s build something extraordinary together.
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
                {!formStatus && <>Send Message →</>}
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
                  <a href="mailto:lnt@letnexttechnologies.com">lnt@letnexttechnologies.com</a>
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
                  <a href="https://www.google.com/maps/place/LetNext+Technologies/@11.468205,77.4666404,853m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba93d007d2ede47:0x9ba7e194f1f4b1ff!8m2!3d11.468205!4d77.4692153!16s%2Fg%2F11xyrvyfmc?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D">
                    Gobi, Erode, Tamil Nadu
                  </a>
                  {/* <span>Gobi, Erode, Tamil Nadu</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
