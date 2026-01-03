import React, { useState } from "react";
import Snowfall from "react-snowfall";
import "../sub-division/web.css";
// import Footer from "../component/Footer";
import { FaCode, FaPython, FaReact, FaMobile, FaShoppingCart, FaLaptopCode, FaServer } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";

const Web = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      title: "Frontend Development",
      color: "#000000ff",
      image: "./asset/web1.png",
      description: "Creating stunning, responsive, and user-friendly interfaces using modern web technologies and frameworks.",
      features: [
        "React & Next.js",
        "Responsive Design",
        "Modern UI/UX",
        "Performance Optimization"
      ]
    },
    {
      id: 2,
      title: "Backend Development",
      color: "#000000ff",
      image: "./asset/web2.png",
      description: "Building robust, scalable server-side applications with secure APIs and efficient database management.",
      features: [
        "Node.js & Express",
        "RESTful APIs",
        "Database Design",
        "Security Best Practices"
      ]
    },
    {
      id: 3,
      title: "Full Stack Solutions",
      color: "#000000ff",
      image: "./asset/web3.png",
      description: "End-to-end web application development combining frontend excellence with backend reliability.",
      features: [
        "MERN/MEAN Stack",
        "Cloud Integration",
        "Microservices",
        "CI/CD Pipeline"
      ]
    },
    {
      id: 4,
      title: "Progressive Web Apps",
      color: "#000000ff",
      image: "./asset/web4.png",
      description: "Developing modern PWAs that combine the best of web and mobile apps for seamless user experiences.",
      features: [
        "Offline Functionality",
        "App-like Experience",
        "Push Notifications",
        "Fast & Reliable"
      ]
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="web-section">
      {/* ❄️ SNOWFALL BACKGROUND */}
      <div className="snowfall-wrapper">
        <Snowfall
          snowflakeCount={100}
          radius={[0.5, 2.5]}
          speed={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
        />
      </div>

      <div className="web-container">
        <div className="web-header">
          <h2 className="web-title">Web Development Services</h2>
          <p className="web-subtitle">
            Crafting exceptional web experiences with cutting-edge technologies
          </p>
        </div>

        <div className="cards-grid">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`web-card ${expandedCard === card.id ? "expanded" : ""}`}
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

        {/* NEW WEB DEVELOPMENT CONTENT SECTION */}
        <div className="web-content-section">
          <div className="web-content-header">
            <h1 className="web-h1">Web Development Services at LetNext Technologies</h1>
          </div>

          <div className="web-intro">
            <h2 className="web-h2">Introduction to LetNext Technologies</h2>
            <p className="web-text">
              LetNext Technologies blends the power of innovation and feasibility to deliver scaled digital experiences. The web development services offered at LetNext are carefully designed to help startups, large corporations, as well as other businesses extend their digital footprint through the effective use of scaled software solutions. Be it a simple landing page solution or a powerful enterprise solution, at LetNext, we are able to provide the right mix of creativity, technology, and expertise to make brands shine in the digital space.
            </p>

            <h3 className="web-h3">Our Approach to Modern Web Development</h3>
            <p className="web-text">
              We do not build the web. We build a digital ecosystem. In every new project that comes our way, there is an understanding that precedes the design, build, and deploy that comes from data-driven insight into the user and the mission. We use cutting-edge tools including Java, Python, and the MERN Stack-MongoDB, Express, and Node.js to build flexible, scalable, and secure platforms in our mission to create digital experiences that work perfectly on all devices.
            </p>
          </div>

          <div className="web-expertise">
            <h2 className="web-h2">Core Development Expertise</h2>

            <div className="expertise-block">
              <div className="expertise-icon-wrapper">
                <FaCode className="expertise-main-icon" />
              </div>
              <h3 className="web-h3">Java Web Development Services</h3>
              <p className="web-text">
                At LetNext Technologies, we employ Java in the development of enterprise applications, which demand consistency, speed, security, and scalability. Java is behind thousands of critical applications around the globe, and we leverage this power to create solid backend solutions, API-based platforms, and high-load applications. Whether microservices applications, web portals, Java web application solutions, our services perfectly fit the business requirements of performance-oriented organizations.
              </p>

              <div className="expertise-feature">
                <h4 className="web-h4">Enterprise-Ready Solutions</h4>
                <p className="web-text">
                  Java architecture makes it possible for us to develop systems with the capacity to handle large volumes of workload without affecting usability. No matter whether it is a legacy application or you are developing an Enterprise Resource Planning solution, our java development company will surely help you to generate long-term value.
                </p>
              </div>
            </div>

            <div className="expertise-block">
              <div className="expertise-icon-wrapper">
                <FaPython className="expertise-main-icon" />
              </div>
              <h3 className="web-h3">Python Web Development Services</h3>
              <p className="web-text">
                Although Python is well-known for being easy to use, its greatest advantage is actually the speed of development and flexibility that it offers. We at DIGIGEN offer efficient and scalable back-end app solutions specifically designed for Saas, automation, and data-focused applications using Django and Flask. Our team of web developers at DIGIGEN utilizes agility and precision to quickly deliver applications.
              </p>

              <div className="expertise-feature">
                <h4 className="web-h4">Dynamic & Fast Backend Engineering</h4>
                <p className="web-text">
                  Our engineers possess an unparalleled ability to capitalize on the vast Python ecosystem available to build highly optimized server-side solutions to unlock business growth. Whether it is building real-time solutions, machine learning solutions, or developing scalable REST API solutions, Python server solutions represent the ultimate combination for speed, adaptability, and reliability to fulfill your requirements.
                </p>
              </div>
            </div>

            <div className="expertise-block">
              <div className="expertise-icon-wrapper">
                <FaReact className="expertise-main-icon" />
              </div>
              <h3 className="web-h3">MERN Stack Development</h3>
              <p className="web-text">
                The MERN Stack utilizes the power of JavaScript to build a full-stack application with unmatchable efficacy. At LetNext Technologies, by integrating MongoDB, Express, React, and Node.js, we build fully interactive web apps, which run smoothly on platforms with scalability.
              </p>

              <div className="expertise-feature">
                <h4 className="web-h4">Scalable Full-Stack JavaScript Solutions</h4>
                <p className="web-text">
                  Therefore, because the language can be shared by both the frontend and backend sides of an application, it is easier to build quick and, consequently, maintain it. Thus, MERN stack development can be applied when creating startups because these require scalable, real-time, and feature-rich applications concerning dashboards, social networks, and collaboration software.
                </p>
              </div>
            </div>
          </div>

          <div className="web-solutions">
            <h2 className="web-h2">Key Web Development Solutions</h2>

            <div className="solution-block">
              <div className="solution-icon-wrapper">
                <FaMobile className="solution-main-icon" />
              </div>
              <h3 className="web-h3">Responsive Design Solutions</h3>
              <p className="web-text">
                In the realm of responsive design, the concept of opt-out is irrelevant altogether. One thing that is absolutely essential to remember is that, at LetNext Technologies, the responsive websites are automatically and effortlessly adaptable to all screen sizes. The websites developed at LetNext Technologies are crafted to be functional and usable on every device that accesses the website.
              </p>
              <p className="web-text">
                In light of the continually rising number of users accessing the internet using mobile devices, we embed a mobile-first design approach that always comes with speed, simplicity, and functionality. With the aid of adaptive grids, images, as well as responsive frameworks, we ensure your website functions flawlessly on any mobile device screen and on any desktop computer screen.
              </p>
            </div>

            <div className="solution-block">
              <div className="solution-icon-wrapper">
                <FaLaptopCode className="solution-main-icon" />
              </div>
              <h3 className="web-h3">Full Stack Web Application Development</h3>
              <p className="web-text web-quote">
                "Full stack development is right at the heart of what we do."
              </p>
              <p className="web-text">
                Our full stack web development services involve the entire range, from interface through to server, through to the database, right up to deploying. Whether it is Java, Python, or working with MERN stack, with us, you can expect end-to-end solutions that emphasis performance, security, and scalability.
              </p>

              <div className="solution-feature">
                <h4 className="web-h4">End-to-End Architecture</h4>
                <p className="web-text">
                  By using our full stack development solutions, you will work with the same team of experts throughout the development phase. We provide services including UI/UX designs, backend development, cloud hosting, as well as integration development.
                </p>
              </div>
            </div>

            <div className="solution-block">
              <div className="solution-icon-wrapper">
                <FaShoppingCart className="solution-main-icon" />
              </div>
              <h3 className="web-h3">E-commerce Web Development</h3>
              <p className="web-text">
                LetNext Technologies is known for its e-commerce website development services that enable businesses to conduct e-commerce transactions with full assurance. Starting from simple product catalogs to secured payment options, we develop websites that provide completely hassle-free online shopping experiences.
              </p>

              <div className="solution-feature">
                <h4 className="web-h4">Secure Online Store Solutions</h4>
                <p className="web-text">
                  In our ecommerce development solutions, we have provided functionality for real-time inventory management and multi-vendor setup. We have secured our ecommerce solution through the use of fraud protection and PCI-compliant integration.
                </p>
              </div>
            </div>

            <div className="solution-block">
              <div className="solution-icon-wrapper">
                <SiJavascript className="solution-main-icon" />
              </div>
              <h3 className="web-h3">Progressive Web Application (PWA) Development</h3>
              <p className="web-text">
                PWAs combine the best of what the web and mobile applications have to offer. At LetNext Technologies, we help customers develop progressive web applications that offer an app-like experience to customers without requiring them to download anything. This is what our progressive web applications offer – native-like interactions, working offline, instant loading, and push notifications.
              </p>

              <div className="solution-feature">
                <h4 className="web-h4">App-Like Experiences</h4>
                <p className="web-text">
                  Our PWA services primarily target speed, reliability, and offline functionality, thus making them most suitable for use in the context of e-commerce sites, booking sites, and media websites. PWAs help to enable quick loading, reduce user churn, and improve conversions; thus, the right money moved by businesses of all shapes and sizes.
                </p>
              </div>
            </div>
          </div>

          <div className="web-why-choose">
            <h2 className="web-h2">Why Choose LetNext Technologies</h2>
            <p className="web-text">
              Our emphasis is on developing and enhancing your online presence, in addition to simplifying the entire development process. With the idea of transparent pricing in mind, we, at LetNext Technologies, work as your long-run partner in digital enhancement and technological advancement.
            </p>

            <div className="why-choose-grid">
              <div className="why-choose-item">
                <h3 className="web-h3">Innovation, Quality & Reliability</h3>
                <p className="web-text">
                  In addition, we adhere to a well-organized but flexible development approach: strategy, design, development, testing, deploy, and maintain. This approach will ultimately work well for you no matter your development circumstances—an existing platform upgrade or development from scratch.
                </p>
              </div>

              <div className="why-choose-item">
                <h3 className="web-h3">Reasons to Partner with LetNext Technologies</h3>
                <p className="web-text">
                  We concentrate on enhancing your online presence and simplifying the development process. With clear and transparent pricing, adaptable processes, and technology for the future, LetNext Technologies is your reliable partner for future growth. From the development of your web presence to the maintenance phase, our technology will continue to grow with your business.
                </p>
              </div>
            </div>
          </div>

          <div className="web-workflow">
            <h2 className="web-h2">Our Web Development Workflow</h2>
            <p className="web-text">
              We implement an organized and versatile model of development, which goes through strategy, design, development, testing, deployment, and maintenance phases. This model is suitable if you are starting fresh or looking to enhance the platforms that already exist.
            </p>
          </div>

          <div className="web-success">
            <h2 className="web-h2">Success Stories & Deliverables</h2>
            <p className="web-text">
              We've helped global start-up ventures to enterprise clients build platforms that handle millions of users worldwide. Our philosophy is straightforward: each and every product or service we deliver has to be scalable, user-friendly, and results-driven. All our digital products don't just have to be good to look at – they've got to perform.
            </p>
          </div>

          <div className="web-faqs">
            <h2 className="web-h2">FAQs</h2>
            
            <div className="faq-list">
              <div className="faq-item">
                <h4 className="faq-question">Which web technologies does LetNext Technologies specialize in?</h4>
                <p className="faq-answer">We work extensively with Java, Python, and the MERN stack to build scalable applications tailored to business needs.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Do you offer full-stack development services?</h4>
                <p className="faq-answer">Yes, we provide complete full stack development, covering frontend, backend, and deployment.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Can you develop an e-commerce store from scratch?</h4>
                <p className="faq-answer">Absolutely—we build secure, SEO-optimized e-commerce websites with custom features and payment gateways.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Why should I choose PWAs over native apps?</h4>
                <p className="faq-answer">PWAs offer fast performance, offline access, and installation-free usability—reducing cost and boosting engagement.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Do you provide post-launch support and maintenance?</h4>
                <p className="faq-answer">Yes, we offer continuous maintenance, updates, and performance optimization to keep your platform running smoothly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </section>
  );
};

export default Web;