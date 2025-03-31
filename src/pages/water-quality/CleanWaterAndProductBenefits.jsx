import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faLeaf,
  faUsers,
  faShieldAlt,
  faFilter,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const CleanWaterAndProductBenefits = () => {
  const [activeCleanWaterPoint, setActiveCleanWaterPoint] = useState(null);
  const [activeProductBenefit, setActiveProductBenefit] = useState(null);

  const cleanWaterPoints = [
    {
      icon: faWater,
      text: "Prevents waterborne diseases",
      details:
        "Clean water reduces the risk of diseases like cholera, dysentery, and typhoid.",
    },
    {
      icon: faLeaf,
      text: "Supports healthy ecosystems",
      details:
        "Clean water is crucial for maintaining biodiversity and ecological balance.",
    },
    {
      icon: faUsers,
      text: "Ensures safe drinking water for communities",
      details:
        "Access to clean water improves overall community health and quality of life.",
    },
  ];

  const productBenefits = [
    {
      icon: faShieldAlt,
      text: "Real-time water quality monitoring",
      details:
        "Our sensors continuously check water quality, ensuring safety at all times.",
    },
    {
      icon: faFilter,
      text: "Advanced filtration system",
      details:
        "Multi-stage filtration removes contaminants, providing crystal-clear water.",
    },
    {
      icon: faBell,
      text: "Alerts for contaminants",
      details:
        "Instant notifications if any harmful substances are detected in your water.",
    },
  ];

  return (
    <div className="cwpb-container">
      <section className="cwpb-clean-water-section">
        <h2 className="cwpb-section-title">Why Clean Water Matters</h2>
        <p className="cwpb-section-description">
          Clean water is essential for drinking, cooking, and hygiene. Poor
          water quality can lead to health issues and environmental damage.
        </p>
        <ul className="cwpb-points-list">
          {cleanWaterPoints.map((point, index) => (
            <li
              key={index}
              className={`cwpb-point ${
                activeCleanWaterPoint === index ? "cwpb-point-active" : ""
              }`}
              onClick={() =>
                setActiveCleanWaterPoint(
                  activeCleanWaterPoint === index ? null : index
                )
              }
            >
              <FontAwesomeIcon icon={point.icon} className="cwpb-point-icon" />
              <span className="cwpb-point-text">{point.text}</span>
              <div
                className={`cwpb-point-details ${
                  activeCleanWaterPoint === index ? "cwpb-details-visible" : ""
                }`}
              >
                {point.details}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="cwpb-product-benefits-section">
        <h2 className="cwpb-section-title">
          How Our Smart Water Dispenser Ensures Water Safety
        </h2>
        <p className="cwpb-section-description">
          Our smart water dispenser uses advanced filtration and monitoring
          technology to provide you with clean, safe water.
        </p>
        <ul className="cwpb-benefits-list">
          {productBenefits.map((benefit, index) => (
            <li
              key={index}
              className={`cwpb-benefit ${
                activeProductBenefit === index ? "cwpb-benefit-active" : ""
              }`}
              onClick={() =>
                setActiveProductBenefit(
                  activeProductBenefit === index ? null : index
                )
              }
            >
              <FontAwesomeIcon
                icon={benefit.icon}
                className="cwpb-benefit-icon"
              />
              <span className="cwpb-benefit-text">{benefit.text}</span>
              <div
                className={`cwpb-benefit-details ${
                  activeProductBenefit === index ? "cwpb-details-visible" : ""
                }`}
              >
                {benefit.details}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CleanWaterAndProductBenefits;
