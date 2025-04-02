import React, { useState } from "react";
import "../../css/product.css";

// Import images
import touchImage from "../../assets/touch.jpg";
import ledImage from "../../assets/led.jpg";
import tofImage from "../../assets/tof.jpg";
import motorImage from "../../assets/motor.jpg";
import ensImage from "../../assets/ENS160.jpg";

const sensors = [
  {
    id: 1,
    name: "Touch Sensor",
    i2c: "0x28",
    description:
      "Enables intuitive user interaction with responsive surface controls",
    image: touchImage,
  },
  {
    id: 2,
    name: "OLED Display",
    i2c: "0x3c",
    description:
      "128x64 pixel OLED display with 16-bit color depth. Features ultra-low power consumption and wide viewing angles for clear visibility.",
    image: ledImage,
  },
  {
    id: 3,
    name: "Time of Flight",
    i2c: "0x29",
    description: "Detects cup placement with accurate proximity measurement",
    image: tofImage,
  },
  {
    id: 4,
    name: "Stepper Motor",
    i2c: "0x31",
    description:
      "Powers the peristaltic pump, ensuring precise and controlled liquid dispensing for efficient operation.",
    image: motorImage,
  },
  {
    id: 5,
    name: "Air Quality Sensor",
    i2c: "0x53",
    description:
      "Monitors environmental conditions with precise pollutant detection",
    image: ensImage,
  },
];

const Product = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  // Handle flip logic to ensure only one card flips at a time
  const handleFlip = (id) => {
    if (flippedCard === id) {
      setFlippedCard(null);
    } else {
      setFlippedCard(id);
    }
  };

  return (
    <div className="product-container">
      <h2 className="page-title">Explore Our Sensors</h2>
      <div className="sensor-grid">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            className={`sensor-card ${flippedCard === sensor.id ? "flipped" : ""}`}
            onClick={() => handleFlip(sensor.id)}
          >
            <div className="sensor-card-inner">
              {/* Front Side */}
              <div className="card-front">
                <img
                  src={sensor.image}
                  alt={sensor.name}
                  className="sensor-image"
                />
                <h5 className="font-bold mb-2">{sensor.name}</h5>
                <p className="text-gray-600">Click to view details</p>
              </div>

              {/* Back Side */}
              <div className="card-back">
                <h5 className="back-title">{sensor.name}</h5>

                <div className="back-detail">
                  <h6 className="back-heading">I2C Address:</h6>
                  <p className="i2c-address">{sensor.i2c}</p>
                </div>

                <div className="back-detail">
                  <h6 className="back-heading">Description:</h6>
                  <p className="back-description">{sensor.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
