import React, { useEffect, useState } from "react";
import "./Calculator.css";
const MAX_DISPLAY_LENGTH = 25;

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (
        (/[0-9]/.test(key) ||
          ["+", "-", "*", "/", ".", "=", "Enter"].includes(key)) &&
        key !== " "
      ) {
        handleButtonClick(key);
      } else if (key === "Escape") {
        handleButtonClick("C");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleButtonClick = (value) => {
    if (value === "C") {
      setDisplay("");
      setResult("");
    } else if (value === "=") {
      try {
        setResult(eval(display));
      } catch (error) {
        setResult("Error");
      }
    } else {
      if (display.length < MAX_DISPLAY_LENGTH) {
        setDisplay((prevDisplay) => prevDisplay + value);
      }
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="result">{result}</div>
      <div className="buttons">
        {buttons.map((button, index) => (
          <button key={index} onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
