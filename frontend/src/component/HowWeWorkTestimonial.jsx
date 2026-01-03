// HowWeWorkAndTestimonial.jsx
import { useRef, useState, useEffect } from "react";
import "../styles/howweworktestimonial.css";
import { FaUsers, FaClock, FaChessKnight, FaTshirt, FaChartLine, FaRocket, FaStar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

/* ======================
   HOW WE WORK SECTION
====================== */
const HowWeWork = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  const workFeatures = [
    {
      id: 1,
      icon: <FaUsers />,
      title: "Understanding Your Requirements",
      description: "We begin by understanding your business goals, target audience, and challenges to create the right strategy using Seo Service in erode and digital insights."
    },
    {
      id: 2,
      icon: <FaClock />,
      title: "Planning & Strategy",
      description: "Our team designs a customized plan using the best tools, technologies, and Online marketing service methods."
    },
    {
      id: 3,
      icon: <FaChessKnight />,
      title: "Design & Development",
      description: "We design with the user in mind and deliver quality solutions aligned with your brand, supported by our top software development company expertise."
    },
    {
      id: 4,
      icon: <IoMdSettings />,
      title: "Execution & Implementation",
      description: "Our professionals execute campaigns and development with precision, whether as an Ad running company in erode or Meta ad running company."
    },
    {
      id: 5,
      icon: <FaChartLine />,
      title: "Testing & Optimization",
      description: "For improved performance, usability, and outcomes, we rigorously evaluate each solution."
    },
    {
      id: 6,
      icon: <FaRocket />,
      title: "Launch & Support",
      description: "To ensure long-term growth, we offer ongoing monitoring, support, and enhancements following a successful launch."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const items = sectionRef.current?.querySelectorAll('.work-card');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-we-work-section" ref={sectionRef}>
      <div className="how-we-work-container">
        <div className="work-content-wrapper">
          <div className="work-image-side">
            <div className="work-image-container">
              <img 
                src="../home/home1.png" 
                alt="IT service and Digital marketing" 
                className="work-main-image"
              />
              <div className="image-decoration"></div>
            </div>
          </div>

          <div className="work-info-side">
            <h2 className="work-main-title">How we works</h2>
            
            <div className="work-features-grid">
              {workFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`work-card ${visibleItems.includes(index) ? 'visible' : ''}`}
                  data-index={index}
                >
                  <div className="work-icon-wrapper">
                    <div className="work-icon">{feature.icon}</div>
                  </div>
                  <div className="work-text-content">
                    <h3 className="work-card-title">{feature.title}</h3>
                    <p className="work-card-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ======================
   TESTIMONIAL SECTION
====================== */
const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Ramesh K",
      role: " Business Owner",
      image: "../howwe/ramesh.png",
      rating: 4,
      text: "LetNext Technologies helped us improve our online presence and generate quality leads. Their Digital marketing company approach delivered real results."
    },
    {
      id: 2,
      name: "Priya S",
      role: " Startup Founder",
      image: "../howwe/priya.png",
      rating: 5,
      text: "The team is professional and responsive. Truly a trusted IT solution company in Erode"
    },
    {
      id: 3,
      name: "Arun M",
      role: "E-commerce Manager",
      image: "../howwe/arun.png",
      rating: 4,
      text: "Their Seo Service and ad campaigns increased traffic and sales for my website. I prefer Letnext Technologies as a go-to partner for IT solutions"
    },
    {
      id: 4,
      name: "Divya R",
      role: "Marketing Head",
      image: "../howwe/diviya.png",
      rating: 5,
      text: "Letnext Technologies's  Meta ad running company and Content marketing company strategies helped us reach the right audience."
    },
    {
      id: 5,
      name: "Suresh P",
      role: " Manufacturing Business Owner",
      image: "../howwe/suresh.png",
      rating: 5,
      text: " From web development to digital marketing, everything was handled professionally by a Letnext Technologies IT Company in erode."
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <h2 className="testimonial-title">What Our Clients Say</h2>
          <p className="testimonial-subtitle">
            Real stories from real clients who transformed their business with us
          </p>
        </div>

        <div className="testimonial-slider">
          <button 
            className="testimonial-nav prev" 
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="testimonial-track">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide ${
                  index === currentSlide ? 'active' : ''
                } ${
                  index === (currentSlide - 1 + testimonials.length) % testimonials.length
                    ? 'prev'
                    : ''
                } ${
                  index === (currentSlide + 1) % testimonials.length ? 'next' : ''
                }`}
              >
                <div className="testimonial-card">
                  <div className="quote-icon">"</div>
                  
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>

                  <p className="testimonial-text">{testimonial.text}</p>

                  <div className="testimonial-author">
                    <img 
                      src={testimonial.image} 
                      alt="IT service and Digital marketing"
                      className="author-image"
                    />
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="testimonial-nav next" 
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ======================
   COMBINED EXPORT
====================== */
const HowWeWorkAndTestimonial = () => {
  return (
    <>
      <HowWeWork />
      <Testimonial />
    </>
  );
};

export default HowWeWorkAndTestimonial;