import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState("");

  const handleCheckCID = async () => {
    try {
      const response = await fetch(
        "https://ucm-backend.onrender.com/check-cid/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputString }),
        }
      );

      if (!response.ok) {
        const message =
          "CID is unverified. You can click on Process Data to verify the CID.";
        setResult(message);
        throw new Error(message);
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2)); // Convert to JSON and format it nicely
    } catch (error) {
      console.error("Error checking CID:", error);
    }
  };

  const handleProcessData = async () => {
    try {
      const response = await fetch(
        "https://ucm-backend.onrender.com/process-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputString }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process data");
      }

      // Handle the response from the process-data API here
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  return (
    <div className="app-container">
      <h2 className="app-title">Data Verification Explorer</h2>
      <input
        type="text"
        placeholder="Enter CID"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
        className="cid-input"
      />
      <button onClick={handleCheckCID} className="check-cid-button">
        Check CID
      </button>
      {result && <p className="result">Result: {result}</p>}
      <button onClick={handleProcessData} className="process-data-button">
        Process Data
      </button>
    </div>
  );
}

export default App;
