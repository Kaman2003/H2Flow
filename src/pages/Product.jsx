import React, { useState } from 'react';
import { Typography, Button, Dialog, IconButton } from "@material-tailwind/react";
import "../css/product.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Using JSDoc for better IDE support
/**
 * @typedef {Object} Sensor
 * @property {number} id
 * @property {string} name
 * @property {string} i2c
 * @property {string} description
 * @property {string} image
 */

/**
 * @type {Sensor[]}
 */
const sensors = [
  {
    id: 1,
    name: "Touch Sensor",
    i2c: "0x28",
    description: "High-precision digital Touching sensor and the sliding data to",
    image: "src/assets/touch.jpg" // Corrected path
  },
  {
    id: 2,
    name: "Gyro Sensor",
    i2c: "0x29",
    description: "Measure the tilting angle of the robot.",
    image: "/gyro.jpg" // Corrected path
  },
  {
    id: 3,
    name: "Temperature Sensor",
    i2c: "0x30",
    description: "High-precision digital temperature sensor",
    image: "/temp.jpg" // Corrected path
  },
  {
    id: 4,
    name: "Acceleration Sensor",
    i2c: "0x31",
    description: "Measure the acceleration of the Robot.",
    image: "/accel.jpg" // Corrected path
  },
  {
    id: 5,
    name: "Distance Sensor",
    i2c: "0x32",
    description: "Measure the distance between the Robot and the object.",
    image: "/distance.jpg" // Corrected path
  }
];

const Product = () => {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (sensor) => {
    setSelectedSensor(sensor);
    setOpen(true);
  };

  return (
    <div className="product-container">
      <div className="sensor-grid">
        {sensors.map((sensor) => (
          <div 
            key={sensor.id}
            className="sensor-card"
            onClick={() => handleOpen(sensor)}
          >
            <img 
              src={sensor.image} 
              alt={sensor.name}
              className="sensor-image"
            />
            <div className="sensor-info">
              <Typography variant="h5" color="blue-gray">
                {sensor.name}
              </Typography>
              <Typography>
                Click for details
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <Dialog 
        open={open} 
        handler={() => setOpen(false)}
        className="custom-dialog" // Apply custom class to dialog
      >
        {open && (
          <div className="modal-backdrop">
            <div className="modal-content">
              {selectedSensor && (
                <div className="modal-inner-container">
                  <div className="temp">               
                  <div className="modal-details-container">
                    <Typography variant="h3" className="modal-title">
                      {selectedSensor.name}
                    </Typography>
                    <div>
                      <Typography variant="h6" className='heading'>
                        I2C Address:
                      </Typography>
                      <Typography className="text">
                        {selectedSensor.i2c}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h6" className='heading'>
                        Description:
                      </Typography>
                      <Typography className='text'>
                        {selectedSensor.description}
                      </Typography>
                    </div>
                   </div>
                   <img 
                    src={selectedSensor.image} 
                    alt={selectedSensor.name}
                    className="modal-image"
                  />
                  <div className="modal-footer">
                <Button  
                  onClick={() => setOpen(false)}
                >
                  X
                </Button>
              </div>
                   </div>
                   
                </div>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Product;
