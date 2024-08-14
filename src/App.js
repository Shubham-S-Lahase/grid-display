import React, { useState } from "react";
import "./App.css";
import DigitalBoard from "./components/DigitalBoard/DigitalBoard";
import useDebounce from "./useDebounce";

function App() {
  const [inputValue, setInputValue] = useState("Hello");
  const debouncedValue = useDebounce(inputValue, 300);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="App">
        <h1>Digital Game Board</h1>
        <label htmlFor="textInput" className="input-label">
          Enter Text (max 10 chars):
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={10}
          placeholder="Enter text (max 10 chars)"
          className="text-input"
        />
        <DigitalBoard text={debouncedValue} />
      </div>
    </>
  );
}

export default App;
