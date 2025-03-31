import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater, faSync, faSearch } from "@fortawesome/free-solid-svg-icons";

const USGSWaterQualitySection = () => {
  const [usgsData, setUsgsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siteId, setSiteId] = useState("01646500"); // Default site ID
  const [userInput, setUserInput] = useState("");

  // Fetch USGS Water Quality Data
  const fetchUsgsData = async (site) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${site}&parameterCd=00010,00095,00300&siteStatus=all`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch USGS water quality data");
      }
      const data = await response.json();
      setUsgsData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsgsData(siteId);
  }, [siteId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setSiteId(userInput.trim());
    }
  };

  return (
    <section className="usgs-water-quality-section">
      <div className="usgs-header">
        <h2>
          <FontAwesomeIcon icon={faWater} /> Real-Time Water Quality Data (USGS)
        </h2>
        <form className="usgs-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter USGS Site ID (e.g., 01646500)"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      {loading ? (
        <div className="usgs-loading">
          <FontAwesomeIcon icon={faSync} spin /> Loading water quality data...
        </div>
      ) : error ? (
        <div className="usgs-error">Error: {error}</div>
      ) : (
        <div className="usgs-metrics">
          {usgsData?.value?.timeSeries?.map((series, index) => (
            <div key={index} className="usgs-metric">
              <h3>{series.variable.variableName}</h3>
              <p>
                <span>Value:</span> {series.values[0].value[0].value}{" "}
                {series.variable.unit.unitCode}
              </p>
              <p>
                <span>Date:</span>{" "}
                {new Date(series.values[0].value[0].dateTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default USGSWaterQualitySection;
