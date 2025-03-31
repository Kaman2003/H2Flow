import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTint } from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            <FontAwesomeIcon icon={faTint} /> Water Quality Insights
          </h1>
          <p>
            Discover the importance of clean water, learn about contaminants,
            and see how our smart water dispenser ensures your water is safe and
            clean.
          </p>
          <button className="hero-cta" onClick={toggleExpand}>
            Learn More <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <div className="hero-image">
          <img src="./src/assets/water-hero.jpg" alt="Clean Water" />
        </div>
      </div>
      {isExpanded && (
        <div className="hero-expanded">
          <p>
            Clean water is essential for life. Our smart water dispenser uses
            advanced technology to monitor and filter water, ensuring it is free
            from harmful contaminants. Stay hydrated, stay healthy.
          </p>
          <ul>
            <li>Real-time water quality monitoring</li>
            <li>Advanced filtration system</li>
            <li>Alerts for contaminants</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
