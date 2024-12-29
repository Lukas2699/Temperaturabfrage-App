import React from "react";

export default function ChartButton({ isEnabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!isEnabled}
      style={{
        padding: "10px 20px",
        backgroundColor: isEnabled ? "blue" : "gray",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: isEnabled ? "pointer" : "not-allowed",
        marginTop: "20px",
        width: "300px",
        height: "50px",
        padding: "5px",
        fontSize: "20px",
      }}
    >
      Auswahl bestätigen
    </button>
  );
}
