import React from "react";
import { PurchaseModal } from "./PurchaseModal";
import "../../css/home.css";


const Home = () => {
//  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-background">
          {/* Animated water waves */}
          <div className="home-hero-wave home-hero-wave-1"></div>
          <div className="home-hero-wave home-hero-wave-2"></div>
          <div className="home-hero-wave home-hero-wave-3"></div>
        </div>
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            Welcome to{" "}
            <span className="home-hero-title-highlight">H2</span>
          </h1>
          <p className="home-hero-subtitle">
            Stay Hydrated, Stay Healthy with Our Smart Water Dispensers
          </p>
          <div className="home-hero-buttons">
            <button className="home-hero-button home-hero-button-secondary">
              <span className="home-hero-button-icon">🚀</span>
              Get Started
            </button>
          </div>
          <div className="home-hero-features">
            <div className="home-hero-feature">
              <span className="home-hero-feature-icon">🌿</span>
              <p className="home-hero-feature-text">Eco-Friendly Design</p>
            </div>
            <div className="home-hero-feature">
              <span className="home-hero-feature-icon">📱</span>
              <p className="home-hero-feature-text">Smart App Integration</p>
            </div>
            <div className="home-hero-feature">
              <span className="home-hero-feature-icon">💡</span>
              <p className="home-hero-feature-text">
                Advanced Sensor Technology
              </p>
            </div>
          </div>
        </div>
        <div className="home-hero-image">
          <img
            src="src/assets/hero-img.jpg"
            alt="H2Flow Water Dispenser"
            className="home-hero-image-dispenser"
          />
          <div className="home-hero-image-overlay"></div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-features">
        <div className="home-features-container">
          <h2 className="home-features-title">Why Choose H2Flow?</h2>
          <p className="home-features-subtitle">
            Discover the features that make H2Flow the ultimate choice for
            hydration.
          </p>
          <div className="home-features-grid">
            <div className="home-feature-card">
              <div className="home-feature-card-icon">🤖</div>
              <h3 className="home-feature-card-title">Smart Technology</h3>
              <p className="home-feature-card-description">
                Our dispensers use advanced sensors to provide the perfect water flow.
              </p>
              <div className="home-feature-card-overlay"></div>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-card-icon">🌍</div>
              <h3 className="home-feature-card-title">Eco-Friendly</h3>
              <p className="home-feature-card-description">
                Reduce plastic waste with our reusable bottle-friendly design.
              </p>
              <div className="home-feature-card-overlay"></div>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-card-icon">❤️</div>
              <h3 className="home-feature-card-title">Health Monitoring</h3>
              <p className="home-feature-card-description">
                Track your hydration levels and receive personalized
                recommendations.
              </p>
              <div className="home-feature-card-overlay"></div>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-card-icon">🧹</div>
              <h3 className="home-feature-card-title">Easy Maintenance</h3>
              <p className="home-feature-card-description">
                Simple cleaning and maintenance for hassle-free use.
              </p>
              <div className="home-feature-card-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="home-testimonials">
        <div className="home-testimonials-container">
          <h2 className="home-testimonials-title">What Our Users Say</h2>
          <p className="home-testimonials-subtitle">
            Hear from our community of happy users who love H2Flow.
          </p>
          <div className="home-testimonials-grid">
            {/* Testimonial 1 */}
            <div className="home-testimonial-card">
              <div className="home-testimonial-card-content">
                <div className="home-testimonial-card-icon">💧</div>
                <p className="home-testimonial-text">
                  "H2Flow has completely changed the way I stay hydrated.
                  It's convenient, eco-friendly, and stylish!"
                </p>
                <div className="home-testimonial-author">
                  <img
                    src="src/assets/test-1.jpg" // Replace with actual user image
                    alt="Jane Doe"
                    className="home-testimonial-author-image"
                  />
                  <p className="home-testimonial-author-name">Jane Doe</p>
                  <p className="home-testimonial-author-role">
                    Fitness Enthusiast
                  </p>
                </div>
              </div>
              <div className="home-testimonial-card-background"></div>
            </div>

            {/* Testimonial 2 */}
            <div className="home-testimonial-card">
              <div className="home-testimonial-card-content">
                <div className="home-testimonial-card-icon">📱</div>
                <p className="home-testimonial-text">
                  "I love the health tracking feature. It keeps me motivated to
                  drink more water every day."
                </p>
                <div className="home-testimonial-author">
                  <img
                    src="src/assets/test-2.jpg" // Replace with actual user image
                    alt="John Smith"
                    className="home-testimonial-author-image"
                  />
                  <p className="home-testimonial-author-name">John Smith</p>
                  <p className="home-testimonial-author-role">Tech Blogger</p>
                </div>
              </div>
              <div className="home-testimonial-card-background"></div>
            </div>

            {/* Testimonial 3 */}
            <div className="home-testimonial-card">
              <div className="home-testimonial-card-content">
                <div className="home-testimonial-card-icon">🌡️</div>
                <p className="home-testimonial-text">
                  "The smart technology is amazing. It always knows the perfect
                  temperature for my water."
                </p>
                <div className="home-testimonial-author">
                  <img
                    src="src/assets/test-3.jpg" // Replace with actual user image
                    alt="Emily Johnson"
                    className="home-testimonial-author-image"
                  />
                  <p className="home-testimonial-author-name">Emily Johnson</p>
                  <p className="home-testimonial-author-role">Health Coach</p>
                </div>
              </div>
              <div className="home-testimonial-card-background"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="home-how-it-works">
        <div className="home-how-it-works-container">
          <h2 className="home-how-it-works-title">How It Works</h2>
          <p className="home-how-it-works-subtitle">
            Discover the simple steps to transform your hydration experience
            with H2Flow.
          </p>
          <div className="home-how-it-works-steps">
            {/* Step 1: Set Up */}
            <div className="home-how-it-works-step">
              <div className="home-how-it-works-step-icon">📱</div>
              <div className="home-how-it-works-step-content">
                <h3 className="home-how-it-works-step-title">Step 1: Set Up</h3>
                <p className="home-how-it-works-step-description">
                  Connect your H2Flow Sip dispenser to the app and customize your
                  preferences.
                </p>
              </div>
              <div className="home-how-it-works-step-line"></div>
            </div>

            {/* Step 2: Hydrate */}
            <div className="home-how-it-works-step">
              <div className="home-how-it-works-step-icon">💧</div>
              <div className="home-how-it-works-step-content">
                <h3 className="home-how-it-works-step-title">
                  Step 2: Hydrate
                </h3>
                <p className="home-how-it-works-step-description">
                  Use the dispenser to get perfectly measured water every time.
                </p>
              </div>
              <div className="home-how-it-works-step-line"></div>
            </div>

            {/* Step 3: Track */}
            <div className="home-how-it-works-step">
              <div className="home-how-it-works-step-icon">📊</div>
              <div className="home-how-it-works-step-content">
                <h3 className="home-how-it-works-step-title">Step 3: Track</h3>
                <p className="home-how-it-works-step-description">
                  Monitor your hydration levels and receive insights through the
                  app.
                </p>
              </div>
              <div className="home-how-it-works-step-line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="home-cta">
        <div className="home-cta-background">
          {/* Animated water waves */}
          <div className="home-cta-wave home-cta-wave-1"></div>
          <div className="home-cta-wave home-cta-wave-2"></div>
          <div className="home-cta-wave home-cta-wave-3"></div>
        </div>
        <div className="home-cta-container">
          <h2 className="home-cta-title">
            Ready to{" "}
            <span className="home-cta-title-highlight">Stay Hydrated</span>?
          </h2>
          <p className="home-cta-subtitle">
            Join thousands of happy users and experience the future of
            hydration.
          </p>
          <button className="home-cta-button">
            <span className="home-cta-button-icon">🚀</span>
            Get Your H2Flow Now
          </button>
          <div className="home-cta-stats">
            <div className="home-cta-stat">
              <span className="home-cta-stat-number">10,000+</span>
              <span className="home-cta-stat-label">Happy Users</span>
            </div>
            <div className="home-cta-stat">
              <span className="home-cta-stat-number">99%</span>
              <span className="home-cta-stat-label">Satisfaction Rate</span>
            </div>
            <div className="home-cta-stat">
              <span className="home-cta-stat-number">24/7</span>
              <span className="home-cta-stat-label">Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
