import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faSync, faSearch } from "@fortawesome/free-solid-svg-icons";

const WorldBankDataSection = () => {
  const [worldBankData, setWorldBankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryCode, setCountryCode] = useState("USA"); // Default country code
  const [userInput, setUserInput] = useState("");

  // Fetch World Bank Water Data
  const fetchWorldBankData = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.worldbank.org/v2/country/${code}/indicator/ER.H2O.FWTL.ZS?format=json&per_page=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch World Bank water data");
      }
      const data = await response.json();
      setWorldBankData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorldBankData(countryCode);
  }, [countryCode]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setCountryCode(userInput.trim());
    }
  };

  return (
    <section className="world-bank-data-section">
      <div className="world-bank-header">
        <h2>
          <FontAwesomeIcon icon={faGlobe} /> Global Water Data (World Bank)
        </h2>
        <form className="world-bank-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Country Code (e.g., USA)"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      {loading ? (
        <div className="world-bank-loading">
          <FontAwesomeIcon icon={faSync} spin /> Loading World Bank water
          data...
        </div>
      ) : error ? (
        <div className="world-bank-error">Error: {error}</div>
      ) : (
        <div className="world-bank-metrics">
          {worldBankData[1]?.map((indicator, index) => (
            <div key={index} className="world-bank-metric">
              <h3>{indicator.country.value}</h3>
              <p>
                <span>Freshwater Withdrawal:</span> {indicator.value}% of total
                renewable water resources
              </p>
              <p>
                <span>Year:</span> {indicator.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WorldBankDataSection;
