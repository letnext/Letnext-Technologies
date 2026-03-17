import { useState, useEffect } from "react";
import "../styles/cookieconsent.css";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const consent = localStorage.getItem("letnext_cookie_consent");
    if (!consent) {
      // Show banner after a short delay so it doesn't block first paint
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Helper — safely calls gtag if it's available (loaded by index.html)
  const updateGtagConsent = (analytics, marketing) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      'ad_storage':              marketing ? 'granted' : 'denied',
      'ad_user_data':            marketing ? 'granted' : 'denied',
      'ad_personalization':      marketing ? 'granted' : 'denied',
      'analytics_storage':       analytics ? 'granted' : 'denied',
      'functionality_storage':   'granted',
      'personalization_storage': analytics ? 'granted' : 'denied',
    });
  };

  const handleAcceptAll = () => {
    localStorage.setItem("letnext_cookie_consent", "accepted");
    localStorage.setItem("letnext_cookie_analytics", "true");
    localStorage.setItem("letnext_cookie_marketing", "true");
    updateGtagConsent(true, true);   // ✅ Grant all — full GA tracking
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("letnext_cookie_consent", "declined");
    localStorage.setItem("letnext_cookie_analytics", "false");
    localStorage.setItem("letnext_cookie_marketing", "false");
    updateGtagConsent(false, false); // ❌ Deny all — no GA tracking
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("letnext_cookie_consent", "essential");
    localStorage.setItem("letnext_cookie_analytics", "false");
    localStorage.setItem("letnext_cookie_marketing", "false");
    updateGtagConsent(false, false); // ❌ Deny analytics/marketing — essential only
    setVisible(false);
  };


  if (!visible) return null;

  return (
    <div className="cookie-overlay" role="dialog" aria-label="Cookie Consent">
      <div className="cookie-banner">
        {/* Cookie Icon */}
        <div className="cookie-icon" aria-hidden="true">🍪</div>

        <div className="cookie-content">
          <h3 className="cookie-title">We Value Your Privacy</h3>
          <p className="cookie-text">
            We use cookies to enhance your browsing experience, serve personalised ads or content,
            and analyse our traffic. By clicking <strong>"Accept All"</strong>, you consent to our use of cookies.{" "}
            <button
              className="cookie-details-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide details ▲" : "Learn more ▼"}
            </button>
          </p>

          {showDetails && (
            <div className="cookie-details">
              <div className="cookie-type">
                <span className="cookie-badge essential">✔ Essential</span>
                <p>Required for the website to function. Always active.</p>
              </div>
              <div className="cookie-type">
                <span className="cookie-badge analytics">Analytics</span>
                <p>Helps us understand how visitors interact with our website (Google Analytics).</p>
              </div>
              <div className="cookie-type">
                <span className="cookie-badge marketing">Marketing</span>
                <p>Used to track visitors across websites to display relevant ads.</p>
              </div>
            </div>
          )}
        </div>

        <div className="cookie-actions">
          <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
            Decline All
          </button>
          <button className="cookie-btn cookie-btn-essential" onClick={handleEssentialOnly}>
            Essential Only
          </button>
          <button className="cookie-btn cookie-btn-accept" onClick={handleAcceptAll}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
