import React, { useState } from "react";
import Snowfall from "react-snowfall";
import "../sub-division/digital.css";
// import Footer from "../component/Footer";
import { FaSearch, FaUsers, FaAd, FaChartLine, FaFileAlt } from "react-icons/fa";

const Digital = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      title: "Learning",
      color: "#000000ff",
      image: "./asset/dig1.png",
      description: "Continuous learning and skill development through innovative training programs and educational resources.",
      features: [
        "Interactive Courses",
        "Expert-Led Sessions",
        "Certification Programs",
        "Self-Paced Learning"
      ]
    },
    {
      id: 2,
      title: "Implementing",
      color: "#000000ff",
      image: "./asset/dig2.png",
      description: "Strategic implementation of cutting-edge solutions with seamless integration and deployment processes.",
      features: [
        "Agile Methodology",
        "Best Practices",
        "Quality Assurance",
        "Risk Management"
      ]
    },
    {
      id: 3,
      title: "Testing",
      color: "#000000ff",
      image: "./asset/dig3.png",
      description: "Comprehensive testing frameworks ensuring reliability, performance, and security of digital solutions.",
      features: [
        "Automated Testing",
        "Performance Analysis",
        "Security Audits",
        "User Acceptance Testing"
      ]
    },
    {
      id: 4,
      title: "Growth",
      color: "#000000ff",
      image: "./asset/dig4.png",
      description: "Sustainable growth strategies powered by data-driven insights and continuous optimization.",
      features: [
        "Market Analysis",
        "Scalability Planning",
        "Performance Metrics",
        "Strategic Planning"
      ]
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="digital-section">
      {/* ❄️ SNOWFALL BACKGROUND */}
      <div className="snowfall-wrapper">
        <Snowfall
          snowflakeCount={100}
          radius={[0.5, 2.5]}
          speed={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
        />
      </div>

      <div className="digital-container">
        <div className="digital-header">
          <h2 className="digital-title">Our Digital Journey</h2>
          <p className="digital-subtitle">
            Explore our comprehensive approach to digital transformation
          </p>
        </div>

        <div className="cards-grid">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`digital-card ${expandedCard === card.id ? "expanded" : ""}`}
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

        {/* NEW MARKETING CONTENT SECTION */}
        <div className="marketing-content-section">
          <div className="marketing-content-header">
            <h1 className="marketing-h1">LetNext Technologies – Digital Marketing Services That Drive Real Growth</h1>
          </div>

          <div className="marketing-intro">
            <h2 className="marketing-h2">Introduction to LetNext Technologies</h2>
            <p className="marketing-text">
              In today's ever-changing online business environment, you require a website that is a part of a well-thought-out strategy that aims at attracting people, retaining them, and converting them into loyal clients. At LetNext Technologies, we specialize in full-service online marketing solutions that will scale your business with confidence. If you are launching a business or expanding your existing business, our services will make you stay a step ahead of your competitors.
            </p>

            <h3 className="marketing-h3">The Future of Digital Marketing</h3>
            <p className="marketing-text">
              Going digital doesn't mean being online; rather, it means existing where it counts. LetNext Technologies combines creativity and analytics with technology to make your brand the go-to on search engines, social platforms, and paid advertising. With changing consumer behavior and AI-driven marketing trends, there is no longer a choice to have a digital presence; it's mandatory.
            </p>

            <h3 className="marketing-h3">Why Businesses Choose LetNext</h3>
            <p className="marketing-text">
              Brands trust us because we are an outcome-driven organization and not an activity-driven organization. Our team of professionals knows all about SEO operations, social marketing, Google and Meta ads, and analytics and content strategies. Each one of our clients has customized solutions from us. It is our aim at LetNext to provide all our clients with complete transparency, growth, and an online ally.
            </p>
          </div>

          <div className="marketing-services">
            <h2 className="marketing-h2">Our Complete Digital Marketing Solutions</h2>

            <div className="service-block">
              <div className="service-icon-wrapper">
                <FaSearch className="service-main-icon" />
              </div>
              <h3 className="marketing-h3">SEO Services</h3>
              <p className="marketing-text">
                Search Engine Optimization (SEO) is the cornerstone of online visibility. At LetNext Technologies, our Search Engine Optimization Service ensures higher visibility of the website on Google to generate quality traffic that converts. Starting from the relevant search engine optimization of the keywords to the enhancement of the website structure, our team ensures that your website becomes a search engine favorite. The result-driven Search Engine Optimization services of our company combine the processes of search engine optimization, link development, search engine optimization of metadata, and search engine optimization through content-rich pages.
              </p>
              <p className="marketing-text">
                Increasingly, business owners today want to know the details about the kind of 'SEO services' that will guarantee an increase in organic traffic and conversions.
              </p>

              <div className="service-features">
                <div className="service-feature-item">
                  <h4 className="marketing-h4">On-Page Optimization</h4>
                  <p className="marketing-text">We optimize your site content, internal links, images, and meta elements.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Off Page Optimization & Link Building</h4>
                  <p className="marketing-text">Our high-authority backlinks increase your domain authority, causing your web pages to rank higher on search engines.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Technical SEO for Performance</h4>
                  <p className="marketing-text">However, having a fast, secure, and crawl-friendly website helps ensure that search engines can correctly understand your pages for efficient ranking.</p>
                </div>
              </div>
            </div>

            <div className="service-block">
              <div className="service-icon-wrapper">
                <FaUsers className="service-main-icon" />
              </div>
              <h3 className="marketing-h3">Social Media Marketing</h3>
              <p className="marketing-text">
                Your audience spends several hours on social media networks every day—our social media marketing solutions ensure that your brand is a part of their life. LetNext Technologies crafts engaging content, releases captivating creatives, and manages the campaign that sets off the conversations. We are looking at brand awareness, audience interaction, and customer loyalty to convert your followers into your brand ambassadors. Whether it is Instagram or Facebook, or it is LinkedIn or TikTok, every platform gets its own treatment.
              </p>

              <div className="service-features">
                <div className="service-feature-item">
                  <h4 className="marketing-h4">Social Media Branding & Engagement</h4>
                  <p className="marketing-text">A steady stream of messages associated with the brand, in conjunction with the use of interaction-enabled posts, will assist in creating lasting connections.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Effective Targeted Campaigns</h4>
                  <p className="marketing-text">We find your target audiences and create compelling messages that drive click-throughs, leads, and conversions.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Influencer & Community Building</h4>
                  <p className="marketing-text">Niche partnerships also assist in raising the voice of your brand.</p>
                </div>
              </div>
            </div>

            <div className="service-block">
              <div className="service-icon-wrapper">
                <FaAd className="service-main-icon" />
              </div>
              <h3 className="marketing-h3">Google & Meta Ads Management</h3>
              <p className="marketing-text">
                Paid advertising always provides instant results and is carried out by LetNext Technologies in Google Ads and Meta Ads (Facebook & Instagram) to produce leads and boost conversions and sales. Our team of professional PPC marketers develops targeted advertising methods by using intelligent bidding and advertising creatives. Be it search ads, display ads, shopping ads, or other retargeting advertising campaigns, our goal is to enhance visibility and maximize ROI. Constant and efficient testing and optimization of advertisements help our marketers ensure your ads are shown to the targeted audience at the correct time.
              </p>

              <div className="service-features">
                <div className="service-feature-item">
                  <h4 className="marketing-h4">Pay Per Click Campaign Strategy</h4>
                  <p className="marketing-text">We formulate advertising strategies based upon the behavior of the target audience and the results of key word analysis to maximize the efficiency of the ads.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Retargeting & Audience Segmentation</h4>
                  <p className="marketing-text">Connect with the warm leads who are already interested in your offerings—optimize conversions at a lower cost.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Conversion Optimization</h4>
                  <p className="marketing-text">Every Click Matters—our targeted landing pages optimize lead generation and conversion sales.</p>
                </div>
              </div>
            </div>

            <div className="service-block">
              <div className="service-icon-wrapper">
                <FaChartLine className="service-main-icon" />
              </div>
              <h3 className="marketing-h3">Analytics & Reporting</h3>
              <p className="marketing-text marketing-quote">
                "Data is power, and LetNext Technologies translates this power to growth."
              </p>
              <p className="marketing-text">
                We, at LetNext, use our analytics and reporting solution to monitor the performance of campaigns, behavior, and conversions using sophisticated tools such as Google Analytics, Search Console, Hotjar, and Data Studio. We monitor various parameters such as click-through rate, session duration, bounce rate, return on investment, and demographics, among many others, so that businesses are empowered with information. By monitoring performance closely, we optimize your marketing campaigns and lower your expenditure with higher margins.
              </p>

              <div className="service-features">
                <div className="service-feature-item">
                  <h4 className="marketing-h4">Performance Tracking and Insights</h4>
                  <p className="marketing-text">We learn what is and isn't working.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Website Behavior Analysis</h4>
                  <p className="marketing-text">User heat maps as well as behavioral insights provide information about the manner in which visitors are using your website.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Data-Driven Growth Decisions</h4>
                  <p className="marketing-text">Our insights inform your next marketing step, enabling sustainable and trackable growth.</p>
                </div>
              </div>
            </div>

            <div className="service-block">
              <div className="service-icon-wrapper">
                <FaFileAlt className="service-main-icon" />
              </div>
              <h3 className="marketing-h3">Content Strategy & Marketing</h3>
              <p className="marketing-text marketing-quote">
                "Content is the king of digital marketing."
              </p>
              <p className="marketing-text">
                LetNext Technologies provides the best content strategy for communicating your value proposition and the captivation of the audience. Our team writes content for the web, blog posts, advertisements, social media content, and landing pages that drive the desired results of consumer engagement and conversions. All the content we develop will be related to your business.
              </p>

              <div className="service-features">
                <div className="service-feature-item">
                  <h4 className="marketing-h4">Brand Message Development</h4>
                  <p className="marketing-text">We refine your brand's tone and messaging to build emotional connections with the audience.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Content Calendar Planning</h4>
                  <p className="marketing-text">A structured approach ensures consistency and helps your audience anticipate your content.</p>
                </div>

                <div className="service-feature-item">
                  <h4 className="marketing-h4">Conversion-Driven Content</h4>
                  <p className="marketing-text">We write with purpose keeping persuasion, clarity, and action at the core.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="marketing-why-works">
            <h2 className="marketing-h2">Why Our Digital Marketing Services Work</h2>
            <p className="marketing-text">
              Our approaches are grounded in ROI, audience targeting, and continuous optimization. We dig deep to understand your business thoroughly and create audience-specific marketing funnels that generate excellent outcomes for your bottom-line success.
            </p>

            <div className="why-works-grid">
              <div className="why-works-item">
                <h3 className="marketing-h3">ROI-Centric Strategies</h3>
                <p className="marketing-text">Each kind of service relates to objectives: leads, sales, and brand status.</p>
              </div>

              <div className="why-works-item">
                <h3 className="marketing-h3">Transparency and Monthly Reporting</h3>
                <p className="marketing-text">You see all the numbers that matter – no secret numbers, no techno-speak.</p>
              </div>
            </div>
          </div>

          <div className="marketing-faqs">
            <h2 className="marketing-h2">FAQs</h2>
            
            <div className="faq-list">
              <div className="faq-item">
                <h4 className="faq-question">How long does SEO take to show results?</h4>
                <p className="faq-answer">SEO results typically appear within 3–6 months depending on competition and website strength.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Can social media marketing increase brand awareness?</h4>
                <p className="faq-answer">Yes! With consistent posting, engaging content, and targeted ads, your brand visibility increases significantly.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Do paid ads guarantee conversions?</h4>
                <p className="faq-answer">Paid ads guarantee visibility, but conversion depends on targeting, landing pages, audience relevance, and offer quality.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Why is analytics important in marketing?</h4>
                <p className="faq-answer">Analytics reveal what's effective, allowing smarter budget allocation and campaign improvements.</p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">What makes LetNext Technologies unique?</h4>
                <p className="faq-answer">We deliver complete digital growth solutions backed by data, creativity, and conversion-focused strategies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </section>
  );
};

export default Digital;