import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSkullCrossbones,
  faVial,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

const ContaminantsSection = () => {
  const [activeContaminant, setActiveContaminant] = useState(null);

  const contaminants = [
    {
      name: "Lead",
      icon: faSkullCrossbones,
      description:
        "Lead can enter water through corroded pipes. It is harmful to human health, especially for children.",
      effects:
        "Can cause developmental issues, kidney problems, and high blood pressure.",
      sources:
        "Old plumbing systems, lead service lines, and industrial pollution.",
    },
    {
      name: "Chlorine",
      icon: faVial,
      description:
        "Chlorine is used to disinfect water but can cause an unpleasant taste and odor.",
      effects:
        "May irritate eyes and nose, and potentially form harmful byproducts.",
      sources: "Added during water treatment process to kill harmful bacteria.",
    },
    {
      name: "Nitrates",
      icon: faLeaf,
      description:
        "Nitrates often come from agricultural runoff and can be harmful in high concentrations.",
      effects: 'Can be dangerous for infants, causing "blue baby syndrome".',
      sources: "Fertilizers, septic systems, and animal waste.",
    },
  ];

  return (
    <section className="cs-contaminants-section">
      <h2 className="cs-title">Common Water Contaminants</h2>
      <div className="cs-contaminants-list">
        {contaminants.map((contaminant, index) => (
          <div
            key={index}
            className={`cs-contaminant ${
              activeContaminant === index ? "cs-active" : ""
            }`}
            onClick={() =>
              setActiveContaminant(activeContaminant === index ? null : index)
            }
          >
            <div className="cs-contaminant-header">
              <FontAwesomeIcon
                icon={contaminant.icon}
                className="cs-contaminant-icon"
              />
              <h3 className="cs-contaminant-name">{contaminant.name}</h3>
            </div>
            <p className="cs-contaminant-description">
              {contaminant.description}
            </p>
            <div
              className={`cs-contaminant-details ${
                activeContaminant === index ? "cs-show" : ""
              }`}
            >
              <h4 className="cs-details-title">Health Effects:</h4>
              <p className="cs-details-text">{contaminant.effects}</p>
              <h4 className="cs-details-title">Common Sources:</h4>
              <p className="cs-details-text">{contaminant.sources}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContaminantsSection;
