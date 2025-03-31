import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faTint,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const WaterUsageCalculator = () => {
  const [userInput, setUserInput] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  const calculateWaterUsage = () => {
    const gallons = parseFloat(userInput);
    if (!isNaN(gallons)) {
      const liters = gallons * 3.78541;
      setCalculationResult(
        `${gallons} gallons is equal to ${liters.toFixed(2)} liters.`
      );
      animateResult();
    } else {
      setCalculationResult("Please enter a valid number.");
    }
  };

  const animateResult = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setAnimationProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 20);
  };

  return (
    <section className="wuc-water-usage-calculator">
      <div className="wuc-container">
        <h2 className="wuc-title">
          <FontAwesomeIcon icon={faCalculator} className="wuc-icon" />
          Water Usage Calculator
        </h2>
        <p className="wuc-description">
          Calculate how much water you use and its equivalent in liters.
        </p>
        <div className="wuc-calculator-input">
          <div className="wuc-input-wrapper">
            <FontAwesomeIcon icon={faTint} className="wuc-input-icon" />
            <input
              type="text"
              className="wuc-input"
              placeholder="Enter gallons"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <button className="wuc-calculate-btn" onClick={calculateWaterUsage}>
            Calculate
          </button>
        </div>
        {calculationResult && (
          <div className="wuc-calculation-result">
            <p className="wuc-result-text">{calculationResult}</p>
            <div className="wuc-result-animation">
              <div
                className="wuc-water-fill"
                style={{ height: `${animationProgress}%` }}
              ></div>
              <FontAwesomeIcon icon={faChartBar} className="wuc-result-icon" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WaterUsageCalculator;
