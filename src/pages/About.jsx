import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faTint,
  faLeaf,
  faRecycle,
  faUsers,
  faGlobe,
  faFlask,
  faCog,
  faChartLine,
  faMedal,
  faHandshake,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import "../css/about.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const renderTabContent = () => {
    switch (activeTab) {
      case "mission":
        return (
          <div className="ss-about-tab-content ss-about-mission">
            <h3 className="ss-about-tab-title">Our Mission</h3>
            <p className="ss-about-tab-text">
              At Smart Sip, we're on a mission to revolutionize the way people
              consume water. We believe that access to clean, safe drinking
              water is a fundamental right, and we're committed to making this a
              reality for everyone through innovative technology and sustainable
              practices.
            </p>
            <div className="ss-about-mission-goals">
              <div className="ss-about-mission-goal">
                <FontAwesomeIcon icon={faWater} className="ss-about-icon" />
                <h4>Clean Water for All</h4>
                <p>
                  Ensuring access to purified water in homes and offices
                  worldwide.
                </p>
              </div>
              <div className="ss-about-mission-goal">
                <FontAwesomeIcon icon={faLeaf} className="ss-about-icon" />
                <h4>Eco-Friendly Solutions</h4>
                <p>
                  Reducing plastic waste and promoting sustainable water
                  consumption.
                </p>
              </div>
              <div className="ss-about-mission-goal">
                <FontAwesomeIcon icon={faUsers} className="ss-about-icon" />
                <h4>Community Health</h4>
                <p>
                  Improving public health through better hydration and water
                  quality.
                </p>
              </div>
            </div>
          </div>
        );
      case "story":
        return (
          <div className="ss-about-tab-content ss-about-story">
            <h3 className="ss-about-tab-title">Our Story</h3>
            <div className="ss-about-timeline">
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">2018</div>
                <h4>The Idea is Born</h4>
                <p>
                  Our founders, concerned about global water quality, envisioned
                  a smart solution for clean water access.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">2019</div>
                <h4>Research & Development</h4>
                <p>
                  We assembled a team of engineers and water experts to develop
                  our revolutionary filtration technology.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">2020</div>
                <h4>Prototype Launch</h4>
                <p>
                  The first Smart Sip prototype was unveiled, garnering
                  attention from environmentalists and tech enthusiasts.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">2021</div>
                <h4>Global Expansion</h4>
                <p>
                  Smart Sip began rolling out to households and offices across
                  North America and Europe.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">2022</div>
                <h4>Smart Sip 2.0</h4>
                <p>
                  We launched our second-generation device with enhanced AI
                  capabilities and improved filtration.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">Today</div>
                <h4>Continuing Innovation</h4>
                <p>
                  We're constantly improving our technology and expanding our
                  reach to make clean water accessible globally.
                </p>
              </div>
            </div>
          </div>
        );
      case "technology":
        return (
          <div className="ss-about-tab-content ss-about-technology">
            <h3 className="ss-about-tab-title">Our Technology</h3>
            <div className="ss-about-tech-showcase">
              <div className="ss-about-tech-item">
                <FontAwesomeIcon icon={faFlask} className="ss-about-icon" />
                <h4>Advanced Filtration</h4>
                <p>
                  Our multi-stage filtration system removes 99.9999% of
                  contaminants, including bacteria, viruses, and heavy metals.
                </p>
              </div>
              <div className="ss-about-tech-item">
                <FontAwesomeIcon icon={faCog} className="ss-about-icon" />
                <h4>Smart Monitoring</h4>
                <p>
                  AI-powered sensors continuously monitor water quality, flow
                  rate, and filter life.
                </p>
              </div>
              <div className="ss-about-tech-item">
                <FontAwesomeIcon icon={faChartLine} className="ss-about-icon" />
                <h4>Data Analytics</h4>
                <p>
                  Our app provides real-time insights into your water
                  consumption and quality trends.
                </p>
              </div>
            </div>
            <div className="ss-about-tech-patents">
              <h4>Our Patents</h4>
              <ul>
                <li>NanoFiltration™ Technology (Patent #US12345678)</li>
                <li>SmartFlow™ Monitoring System (Patent #US87654321)</li>
                <li>EcoRefill™ Cartridge Design (Patent Pending)</li>
              </ul>
            </div>
          </div>
        );
      case "impact":
        return (
          <div className="ss-about-tab-content ss-about-impact">
            <h3 className="ss-about-tab-title">Our Impact</h3>
            <div className="ss-about-impact-stats">
              <div className="ss-about-impact-stat">
                <span className="ss-about-impact-number">1M+</span>
                <span className="ss-about-impact-label">Households Served</span>
              </div>
              <div className="ss-about-impact-stat">
                <span className="ss-about-impact-number">500M+</span>
                <span className="ss-about-impact-label">Gallons Purified</span>
              </div>
              <div className="ss-about-impact-stat">
                <span className="ss-about-impact-number">10M+</span>
                <span className="ss-about-impact-label">
                  Plastic Bottles Saved
                </span>
              </div>
            </div>
            <div className="ss-about-impact-testimonials">
              <h4>What Our Users Say</h4>
              <div className="ss-about-testimonial">
                <p>
                  "Smart Sip has transformed the way my family drinks water. We
                  feel safer and healthier, and we're doing our part for the
                  environment!"
                </p>
                <span>- Sarah J., California</span>
              </div>
              <div className="ss-about-testimonial">
                <p>
                  "As a business owner, installing Smart Sip in our office has
                  improved employee satisfaction and reduced our plastic waste
                  significantly."
                </p>
                <span>- Michael T., New York</span>
              </div>
            </div>
          </div>
        );
      case "team":
        return (
          <div className="ss-about-tab-content ss-about-team">
            <h3 className="ss-about-tab-title">Our Team</h3>
            <div className="ss-about-team-grid">
              <div className="ss-about-team-member">
                <img
                  src="/path-to-image/john-doe.jpg"
                  alt="John Doe"
                  className="ss-about-team-photo"
                />
                <h4>John Doe</h4>
                <p>Co-Founder & CEO</p>
              </div>
              <div className="ss-about-team-member">
                <img
                  src="/path-to-image/jane-smith.jpg"
                  alt="Jane Smith"
                  className="ss-about-team-photo"
                />
                <h4>Jane Smith</h4>
                <p>Co-Founder & CTO</p>
              </div>
              <div className="ss-about-team-member">
                <img
                  src="/path-to-image/alex-johnson.jpg"
                  alt="Alex Johnson"
                  className="ss-about-team-photo"
                />
                <h4>Alex Johnson</h4>
                <p>Head of Product Design</p>
              </div>
              <div className="ss-about-team-member">
                <img
                  src="/path-to-image/emily-brown.jpg"
                  alt="Emily Brown"
                  className="ss-about-team-photo"
                />
                <h4>Emily Brown</h4>
                <p>Chief Water Scientist</p>
              </div>
            </div>
            <div className="ss-about-join-team">
              <h4>Join Our Team</h4>
              <p>
                We're always looking for passionate individuals to join our
                mission. Check out our current openings:
              </p>
              <a href="/careers" className="ss-about-careers-link">
                View Open Positions
              </a>
            </div>
          </div>
        );
      case "future":
        return (
          <div className="ss-about-tab-content ss-about-future">
            <h3 className="ss-about-tab-title">Our Future</h3>
            <div className="ss-about-future-vision">
              <h4>Vision 2030</h4>
              <p>By 2030, we aim to:</p>
              <ul>
                <li>
                  Provide clean water access to 100 million households globally
                </li>
                <li>Reduce plastic bottle usage by 1 billion annually</li>
                <li>
                  Develop next-gen water purification technology for extreme
                  environments
                </li>
              </ul>
            </div>
            <div className="ss-about-future-initiatives">
              <h4>Upcoming Initiatives</h4>
              <div className="ss-about-initiative">
                <FontAwesomeIcon icon={faGlobe} className="ss-about-icon" />
                <h5>Global Water Quality Map</h5>
                <p>
                  Leveraging our network of Smart Sip devices to create a
                  real-time global water quality monitoring system.
                </p>
              </div>
              <div className="ss-about-initiative">
                <FontAwesomeIcon icon={faRocket} className="ss-about-icon" />
                <h5>Smart Sip for Space</h5>
                <p>
                  Collaborating with space agencies to develop water
                  purification systems for long-term space missions.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ss-about-page">
      <header className="ss-about-header">
        <h1 className="ss-about-title">About Smart Sip</h1>
        <p className="ss-about-subtitle">
          Revolutionizing Water Consumption, One Sip at a Time
        </p>
      </header>

      <nav className="ss-about-nav">
        <button
          className={`ss-about-nav-btn ${
            activeTab === "mission" ? "active" : ""
          }`}
          onClick={() => setActiveTab("mission")}
        >
          Our Mission
        </button>
        <button
          className={`ss-about-nav-btn ${
            activeTab === "story" ? "active" : ""
          }`}
          onClick={() => setActiveTab("story")}
        >
          Our Story
        </button>
        <button
          className={`ss-about-nav-btn ${
            activeTab === "technology" ? "active" : ""
          }`}
          onClick={() => setActiveTab("technology")}
        >
          Our Technology
        </button>
        <button
          className={`ss-about-nav-btn ${
            activeTab === "impact" ? "active" : ""
          }`}
          onClick={() => setActiveTab("impact")}
        >
          Our Impact
        </button>
        <button
          className={`ss-about-nav-btn ${activeTab === "team" ? "active" : ""}`}
          onClick={() => setActiveTab("team")}
        >
          Our Team
        </button>
        <button
          className={`ss-about-nav-btn ${
            activeTab === "future" ? "active" : ""
          }`}
          onClick={() => setActiveTab("future")}
        >
          Our Future
        </button>
      </nav>

      <main className="ss-about-main">{renderTabContent()}</main>

      <section className="ss-about-cta">
        <h2 className="ss-about-cta-title">Join the Smart Sip Revolution</h2>
        <p className="ss-about-cta-text">
          Experience the future of water purification and contribute to a
          sustainable planet.
        </p>
        <div className="ss-about-cta-buttons">
          <a
            href="/products"
            className="ss-about-cta-btn ss-about-cta-btn-primary"
          >
            Explore Our Products
          </a>
          <a
            href="/contact"
            className="ss-about-cta-btn ss-about-cta-btn-secondary"
          >
            Contact Us
          </a>
        </div>
      </section>

      <footer className="ss-about-footer">
        <div className="ss-about-footer-links">
          <a href="/privacy" className="ss-about-footer-link">
            Privacy Policy
          </a>
          <a href="/terms" className="ss-about-footer-link">
            Terms of Service
          </a>
          <a href="/faq" className="ss-about-footer-link">
            FAQ
          </a>
        </div>
        <div className="ss-about-footer-social">
          <a
            href="https://facebook.com/smartsip"
            className="ss-about-social-link"
          >
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </a>
          <a
            href="https://twitter.com/smartsip"
            className="ss-about-social-link"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
          <a
            href="https://instagram.com/smartsip"
            className="ss-about-social-link"
          >
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>
          <a
            href="https://linkedin.com/company/smartsip"
            className="ss-about-social-link"
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </a>
        </div>
        <p className="ss-about-footer-copyright">
          &copy; 2023 Smart Sip. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
