import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/dashboard.css"
import {
  faTint,
  faChartLine,
  faBell,
  faServer,
  faDatabase,
  faThermometerHalf,
  faClock,
  faExclamationTriangle,
  faCheckCircle,
  faWater,
  faRulerVertical,
  faWind,
  faBolt,
  faHistory
} from "@fortawesome/free-solid-svg-icons";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase/firebase.config";
import { useState, useEffect } from "react";

function Dashboard() {
  const { currentUser } = useAuth();
  const [sensorData, setSensorData] = useState({
    airQuality: null,
    distance: null,
    touchSlider: null,
    loading: true,
    error: null
  });

  // Fetch real-time sensor data
  useEffect(() => {
    try {
      const airQualityRef = ref(database, 'CENG355/sensors/air_quality_sensor');
      const distanceRef = ref(database, 'CENG355/sensors/distance_sensor');
      const touchSliderRef = ref(database, 'CENG355/sensors/touch_slider');

      const airQualityUnsub = onValue(airQualityRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData(prev => ({
            ...prev,
            airQuality: lastEntry[1],
            loading: false
          }));
        }
      });

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
      });

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
      });

      return () => {
        airQualityUnsub();
        distanceUnsub();
        touchSliderUnsub();
      };
    } catch (error) {
      setSensorData(prev => ({ ...prev, error: error.message, loading: false }));
    }
  }, []);

  // Helper functions
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Just now";
    const now = new Date();
    const sensorTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - sensorTime) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    return sensorTime.toLocaleTimeString();
  };

  const getTouchStatus = (touchData) => {
    if (!touchData) return "No contact";
    const activePads = [touchData.pad1, touchData.pad2, touchData.pad3].filter(Boolean).length;
    return `${activePads} pad${activePads !== 1 ? 's' : ''} active`;
  };

  // System status based on sensor data
  const systemStatus = {
    sensors: sensorData.loading ? "checking..." : 
             sensorData.error ? "offline" : "online",
    database: "online",
    api: "online",
    alerts: sensorData.airQuality?.aqi > 3 ? "1 active" : "none"
  };

  // Recent activity log
  const recentActivity = [
    {
      time: formatTimeAgo(sensorData.airQuality?.timestamp),
      event: `Air quality update: AQI ${sensorData.airQuality?.aqi || '--'}`,
      status: sensorData.airQuality?.aqi > 3 ? "warning" : "info"
    },
    {
      time: formatTimeAgo(sensorData.distance?.timestamp),
      event: `Distance measured: ${sensorData.distance?.distance_mm || '--'} mm`,
      status: sensorData.distance?.distance_mm < 50 ? "warning" : "info"
    },
    {
      time: formatTimeAgo(sensorData.touchSlider?.timestamp),
      event: `Touch sensor: ${getTouchStatus(sensorData.touchSlider)}`,
      status: "info"
    },
    {
      time: "System boot",
      event: "Dashboard initialized",
      status: "success"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>
            <FontAwesomeIcon icon={faChartLine} />
            H2Flow Dashboard
          </h1>
          <p className="welcome-message">
            Welcome back, <strong>{currentUser?.name || "Operator"}</strong>
          </p>
        </div>
        <div className="header-actions">
          <button className="notification-badge">
            <FontAwesomeIcon icon={faBell} />
            {systemStatus.alerts !== "none" && <span className="alert-dot"></span>}
          </button>
        </div>
      </header>

      {/* Real-time Sensor Status Cards */}
      <section className="sensor-grid">
        {/* Air Quality Card */}
        <div className={`sensor-card ${!sensorData.airQuality ? 'loading' : ''}`}>
          <div className="card-header">
            <FontAwesomeIcon icon={faWind} className="card-icon" />
            <h3>Air Quality</h3>
            <span className={`status-badge ${
              !sensorData.airQuality?.aqi ? 'unknown' :
              sensorData.airQuality.aqi <= 1 ? 'excellent' :
              sensorData.airQuality.aqi <= 3 ? 'good' : 'poor'
            }`}>
              {!sensorData.airQuality?.aqi ? '--' :
               sensorData.airQuality.aqi <= 1 ? 'Excellent' :
               sensorData.airQuality.aqi <= 3 ? 'Good' : 'Poor'}
            </span>
          </div>
          <div className="card-body">
            <div className="metric">
              <span>AQI</span>
              <strong>{sensorData.airQuality?.aqi || '--'}</strong>
            </div>
            <div className="metric">
              <span>VOC</span>
              <strong>{sensorData.airQuality?.tvoc || '--'} ppm</strong>
            </div>
            <div className="metric">
              <span>Updated</span>
              <strong>{formatTimeAgo(sensorData.airQuality?.timestamp)}</strong>
            </div>
          </div>
        </div>

        {/* Distance Sensor Card */}
        <div className={`sensor-card ${!sensorData.distance ? 'loading' : ''}`}>
          <div className="card-header">
            <FontAwesomeIcon icon={faRulerVertical} className="card-icon" />
            <h3>Distance</h3>
            <span className={`status-badge ${
              sensorData.distance?.distance_mm < 50 ? 'warning' : 'normal'
            }`}>
              {sensorData.distance?.distance_mm < 50 ? 'Close' : 'Normal'}
            </span>
          </div>
          <div className="card-body">
            <div className="metric">
              <span>Current</span>
              <strong>{sensorData.distance?.distance_mm || '--'} mm</strong>
            </div>
            <div className="metric">
              <span>Status</span>
              <strong>
                {sensorData.distance?.distance_mm < 50 ? 
                 'Object detected' : 'Clear'}
              </strong>
            </div>
            <div className="metric">
              <span>Updated</span>
              <strong>{formatTimeAgo(sensorData.distance?.timestamp)}</strong>
            </div>
          </div>
        </div>

        {/* Touch Sensor Card */}
        <div className={`sensor-card ${!sensorData.touchSlider ? 'loading' : ''}`}>
          <div className="card-header">
            <FontAwesomeIcon icon={faWater} className="card-icon" />
            <h3>Touch Sensor</h3>
            <span className={`status-badge ${
              sensorData.touchSlider?.pad1 || 
              sensorData.touchSlider?.pad2 || 
              sensorData.touchSlider?.pad3 ? 'active' : 'inactive'
            }`}>
              {sensorData.touchSlider?.pad1 || 
               sensorData.touchSlider?.pad2 || 
               sensorData.touchSlider?.pad3 ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="card-body">
            <div className="metric">
              <span>Status</span>
              <strong>{getTouchStatus(sensorData.touchSlider)}</strong>
            </div>
            <div className="metric">
              <span>Pads</span>
              <strong>
                {sensorData.touchSlider ? 
                 `${sensorData.touchSlider.pad1 ? '1 ' : ''}${sensorData.touchSlider.pad2 ? '2 ' : ''}${sensorData.touchSlider.pad3 ? '3' : ''}` : 
                 '-- -- --'}
              </strong>
            </div>
            <div className="metric">
              <span>Updated</span>
              <strong>{formatTimeAgo(sensorData.touchSlider?.timestamp)}</strong>
            </div>
          </div>
        </div>

        {/* System Health Card */}
        <div className="sensor-card system-health">
          <div className="card-header">
            <FontAwesomeIcon icon={faServer} className="card-icon" />
            <h3>System Health</h3>
            <span className="status-badge online">Online</span>
          </div>
          <div className="card-body">
            <div className="health-metric">
              <span>Sensors</span>
              <div className="status-indicator online"></div>
              <strong>{systemStatus.sensors}</strong>
            </div>
            <div className="health-metric">
              <span>Database</span>
              <div className="status-indicator online"></div>
              <strong>{systemStatus.database}</strong>
            </div>
            <div className="health-metric">
              <span>API</span>
              <div className="status-indicator online"></div>
              <strong>{systemStatus.api}</strong>
            </div>
            <div className="health-metric">
              <span>Alerts</span>
              <div className={`status-indicator ${
                systemStatus.alerts !== "none" ? 'warning' : 'ok'
              }`}></div>
              <strong>{systemStatus.alerts}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Charts and Activity Section */}
      <section className="dashboard-content">
        {/* Activity Log */}
        <div className="activity-log">
          <div className="section-header">
            <FontAwesomeIcon icon={faHistory} />
            <h2>Recent Activity</h2>
          </div>
          <div className="log-entries">
            {recentActivity.map((activity, index) => (
              <div key={index} className={`log-entry ${activity.status}`}>
                <div className="entry-time">{activity.time}</div>
                <div className="entry-event">{activity.event}</div>
                <div className="entry-icon">
                  {activity.status === "success" ? (
                    <FontAwesomeIcon icon={faCheckCircle} />
                  ) : (
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Consumption Chart */}
        <div className="consumption-chart">
          <div className="section-header">
            <FontAwesomeIcon icon={faTint} />
            <h2>Water Consumption</h2>
          </div>
          <div className="chart-placeholder">
            <p>Daily consumption analytics will appear here</p>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="color-swatch today"></span>
                Today
              </span>
              <span className="legend-item">
                <span className="color-swatch average"></span>
                Daily Average
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* System Metrics */}
      <section className="system-metrics">
        <div className="metric-card">
          <FontAwesomeIcon icon={faBolt} className="metric-icon" />
          <div className="metric-value">24V</div>
          <div className="metric-label">Power Supply</div>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faThermometerHalf} className="metric-icon" />
          <div className="metric-value">
            {sensorData.airQuality?.eco2 || '--'} ppm
          </div>
          <div className="metric-label">CO₂ Levels</div>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faDatabase} className="metric-icon" />
          <div className="metric-value">1.2MB</div>
          <div className="metric-label">Data Today</div>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faClock} className="metric-icon" />
          <div className="metric-value">
            {sensorData.loading ? '--' : '0.4'}s
          </div>
          <div className="metric-label">Avg Response</div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;