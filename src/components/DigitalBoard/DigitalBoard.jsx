import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';

const DigitalBoard = ({ text }) => {
  const gridWidth = 15;
  const gridHeight = 20;
  const cellSize = 10; 
  const [textX, setTextX] = useState(0); 
  const [fillColor, setFillColor] = useState([255, 0, 0]); 

  useEffect(() => {
    const changeColor = () => {
      const randomColor = [
        Math.floor(Math.random() * 156) + 100,
        Math.floor(Math.random() * 156) + 100,
        Math.floor(Math.random() * 156) + 100
      ];
      setFillColor(randomColor);
    };

    const intervalId = setInterval(changeColor, 2000);

    return () => clearInterval(intervalId); 
  }, []);

  const setup = (p5, parent) => {
    p5.createCanvas(gridWidth * cellSize, gridHeight * cellSize).parent(parent);
  };

  const draw = (p5) => {
    p5.background(0);

    const offScreenGraphics = p5.createGraphics(gridWidth * cellSize, gridHeight * cellSize);
    offScreenGraphics.textSize(120);
    offScreenGraphics.textAlign(p5.LEFT, p5.CENTER);
    offScreenGraphics.fill(255);
    offScreenGraphics.text(text, textX, offScreenGraphics.height / 2 - 10);
    offScreenGraphics.loadPixels();

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const pixelIndex = (x * cellSize + y * cellSize * offScreenGraphics.width) * 4;
        const brightness = offScreenGraphics.pixels[pixelIndex];
        const isLit = brightness > 128;

        if (isLit) {
          p5.fill(...fillColor);
        } else {
          p5.fill(50);
        }
        p5.rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    setTextX((prevTextX) => {
      const newTextX = prevTextX - 2; 
      const textWidth = p5.textWidth(text) * 8;
      return newTextX <= -textWidth ? gridWidth * cellSize : newTextX;
    });
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default DigitalBoard;