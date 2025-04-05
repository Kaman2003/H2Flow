import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faRulerVertical, faWind } from "@fortawesome/free-solid-svg-icons";
import { ref, onValue } from "firebase/database";
import "../../css/sensorreading.css"
import { app, database } from '../../firebase/firebase.config';


function SensorReadings() {
  const [sensorData, setSensorData] = useState({
    airQuality: null,
    distance: null,
    touchSlider: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    try {
      // Reference to your sensors data
      const airQualityRef = ref(database, 'CENG355/sensors/air_quality_sensor');
      const distanceRef = ref(database, 'CENG355/sensors/distance_sensor');
      const touchSliderRef = ref(database, 'CENG355/sensors/touch_slider');

      // Listen for changes in air quality data
      const airQualityUnsub = onValue(airQualityRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Get the last entry (most recent)
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData(prev => ({
            ...prev,
            airQuality: lastEntry[1],
            loading: false
          }));
        }
      }, (error) => {
        setSensorData(prev => ({ ...prev, error: "Air quality data error", loading: false }));
      });

      // Listen for changes in distance data
      const distanceUnsub = onValue(distanceRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData(prev => ({
            ...prev,
            distance: lastEntry[1],
            loading: false
          }));
        }
      }, (error) => {
        setSensorData(prev => ({ ...prev, error: "Distance data error", loading: false }));
      });

      // Listen for changes in touch slider data
      const touchSliderUnsub = onValue(touchSliderRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData(prev => ({
            ...prev,
            touchSlider: lastEntry[1],
            loading: false
          }));
        }
      }, (error) => {
        setSensorData(prev => ({ ...prev, error: "Touch slider data error", loading: false }));
      });

      // Cleanup function
      return () => {
        airQualityUnsub();
        distanceUnsub();
        touchSliderUnsub();
      };

    } catch (error) {
      setSensorData(prev => ({ ...prev, error: "Connection error", loading: false }));
    }
  }, []);

  // Helper function to format timestamp
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Unknown";
    const now = new Date();
    const sensorTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - sensorTime) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    return sensorTime.toLocaleTimeString();
  };

  // Determine touch sensor status
  const getTouchStatus = (touchData) => {
    if (!touchData) return "No data";
    const activePads = [touchData.pad1, touchData.pad2, touchData.pad3].filter(Boolean).length;
    return `${activePads} pad${activePads !== 1 ? 's' : ''} active`;
  };

  if (sensorData.loading) {
    return <div className="loading">Loading sensor data...</div>;
  }

  if (sensorData.error) {
    return <div className="error">Error: {sensorData.error}</div>;
  }

  return (
    <div className="sensor-readings-page">
      <h1 className="sensor-readings-title">Real-time Sensor Readings</h1>
      <div className="sensor-readings-container">
        {/* Touch Sensor CAP Card */}
        <div className="sensor-card sensor-card-cap">
          <div className="sensor-card-header">
            <FontAwesomeIcon icon={faWater} className="sensor-icon" />
            <h2 className="sensor-card-title">Touch Sensor CAP</h2>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-metric">
              <span className="metric-label">Current Reading:</span>
              <span className="metric-value">
                {getTouchStatus(sensorData.touchSlider)}
              </span>
            </div>
            <div className="sensor-metric">
              <span className="metric-label">Status:</span>
              <span className={`metric-status ${
                sensorData.touchSlider?.pad1 || 
                sensorData.touchSlider?.pad2 || 
                sensorData.touchSlider?.pad3 ? "active" : "inactive"
              }`}>
                {sensorData.touchSlider?.pad1 || 
                 sensorData.touchSlider?.pad2 || 
                 sensorData.touchSlider?.pad3 ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="sensor-metric">
              <span className="metric-label">Last Updated:</span>
              <span className="metric-time">
                {formatTimeAgo(sensorData.touchSlider?.timestamp)}
              </span>
            </div>
          </div>
        </div>

        {/* ToF Sensor Card */}
        <div className="sensor-card sensor-card-tof">
          <div className="sensor-card-header">
            <FontAwesomeIcon icon={faRulerVertical} className="sensor-icon" />
            <h2 className="sensor-card-title">Distance Sensor</h2>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-metric">
              <span className="metric-label">Distance:</span>
              <span className="metric-value">
                {sensorData.distance?.distance_mm !== undefined 
                  ? `${sensorData.distance.distance_mm} mm` 
                  : "No data"}
              </span>
            </div>
            <div className="sensor-metric">
              <span className="metric-label">Status:</span>
              <span className={`metric-status ${
                sensorData.distance?.distance_mm < 50 ? "warning" : "normal"
              }`}>
                {sensorData.distance?.distance_mm < 50 ? "Close" : "Normal"}
              </span>
            </div>
            <div className="sensor-metric">
              <span className="metric-label">Last Updated:</span>
              <span className="metric-time">
                {formatTimeAgo(sensorData.distance?.timestamp)}
              </span>
            </div>
          </div>
        </div>

        {/* Air Quality Sensor Card */}
        <div className="sensor-card sensor-card-air">
          <div className="sensor-card-header">
            <FontAwesomeIcon icon={faWind} className="sensor-icon" />
            <h2 className="sensor-card-title">Air Quality</h2>
          </div>
          <div className="sensor-card-body">
            <div className="sensor-metric">
              <span className="metric-label">AQI:</span>
              <span className="metric-value">
                {sensorData.airQuality?.aqi !== undefined 
                  ? sensorData.airQuality.aqi 
                  : "No data"}
              </span>
            </div>
            <div className="sensor-metric">
              <span className="metric-label">VOC Index:</span>
              <span className="metric-value">
                {sensorData.airQuality?.tvoc !== undefined 
                  ? sensorData.airQuality.tvoc 
                  : "No data"}
              </span>
            </div>
            <div className="sensor-metric">
              <span className="metric-label">Status:</span>
              <span className={`metric-status ${
                !sensorData.airQuality?.aqi ? "unknown" :
                sensorData.airQuality.aqi <= 1 ? "excellent" :
                sensorData.airQuality.aqi <= 3 ? "good" : "poor"
              }`}>
                {!sensorData.airQuality?.aqi ? "Unknown" :
                 sensorData.airQuality.aqi <= 1 ? "Excellent" :
                 sensorData.airQuality.aqi <= 3 ? "Good" : "Poor"}
              </span>
            </div>
            <div className="sensor-metric">
              <span className="metric-label">Last Updated:</span>
              <span className="metric-time">
                {formatTimeAgo(sensorData.airQuality?.timestamp)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorReadings;