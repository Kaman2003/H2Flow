import React, { useState, useEffect } from "react";
import HeroSection from "./water-quality/HeroSection";
import USGSWaterQualitySection from "./water-quality/USGSWaterQualitySection";
import OpenAQDataSection from "./water-quality/OpenAQDataSection";
import WorldBankDataSection from "./water-quality/WorldBankDataSection";
import WaterUsageCalculator from "./water-quality/WaterUsageCalculator";
import ContaminantsSection from "./water-quality/ContaminantsSection";
import CleanWaterAndProductBenefits from "./water-quality/CleanWaterAndProductBenefits";
import "../../css/water-quality.css";

const WaterQuality = () => {
  const [usgsData, setUsgsData] = useState(null);
  const [openaqData, setOpenaqData] = useState(null);
  const [worldBankData, setWorldBankData] = useState(null);
  const [loading, setLoading] = useState({
    usgs: true,
    openaq: true,
    worldBank: true,
  });
  const [error, setError] = useState({
    usgs: null,
    openaq: null,
    worldBank: null,
  });
  const [userInput, setUserInput] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);

  // Fetch USGS Water Quality Data
  useEffect(() => {
    const fetchUsgsData = async () => {
      try {
        const response = await fetch(
          "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500&parameterCd=00010,00095,00300&siteStatus=all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch USGS water quality data");
        }
        const data = await response.json();
        setUsgsData(data);
        setLoading((prev) => ({ ...prev, usgs: false }));
      } catch (err) {
        setError((prev) => ({ ...prev, usgs: err.message }));
        setLoading((prev) => ({ ...prev, usgs: false }));
      }
    };

    fetchUsgsData();
  }, []);

  // Fetch OpenAQ Air and Water Quality Data
  useEffect(() => {
    const fetchOpenaqData = async () => {
      try {
        const response = await fetch(
          "https://api.openaq.org/v2/latest?limit=10&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch OpenAQ data");
        }
        const data = await response.json();
        setOpenaqData(data);
        setLoading((prev) => ({ ...prev, openaq: false }));
      } catch (err) {
        setError((prev) => ({ ...prev, openaq: err.message }));
        setLoading((prev) => ({ ...prev, openaq: false }));
      }
    };

    fetchOpenaqData();
  }, []);

  // Fetch World Bank Water Data
  useEffect(() => {
    const fetchWorldBankData = async () => {
      try {
        const response = await fetch(
          "https://api.worldbank.org/v2/country/all/indicator/ER.H2O.FWTL.ZS?format=json&per_page=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch World Bank water data");
        }
        const data = await response.json();
        setWorldBankData(data);
        setLoading((prev) => ({ ...prev, worldBank: false }));
      } catch (err) {
        setError((prev) => ({ ...prev, worldBank: err.message }));
        setLoading((prev) => ({ ...prev, worldBank: false }));
      }
    };

    fetchWorldBankData();
  }, []);

  // Calculate water usage based on user input
  const calculateWaterUsage = () => {
    const gallons = parseFloat(userInput);
    if (isNaN(gallons)) {
      setCalculationResult("Please enter a valid number.");
      return;
    }
    const liters = gallons * 3.78541; // Convert gallons to liters
    setCalculationResult(
      `${gallons} gallons is approximately ${liters.toFixed(2)} liters.`
    );
  };

  return (
    <div className="water-quality-page">
      {/* Hero Section */}
      <HeroSection />

      {/* USGS Water Quality Data Section */}
      <USGSWaterQualitySection />

      {/* OpenAQ Air and Water Quality Data Section */}
      <OpenAQDataSection />

      {/* World Bank Water Data Section */}
      <WorldBankDataSection />

      {/* Water Usage Calculator Section */}
      <WaterUsageCalculator />

      {/* Contaminants Section */}
      <ContaminantsSection />

      {/* Importance of Clean Water Section */}
      <CleanWaterAndProductBenefits />
    </div>
  );
};

export default WaterQuality;
