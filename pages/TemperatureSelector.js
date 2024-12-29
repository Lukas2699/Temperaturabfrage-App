import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TemperatureSelector({ onMetricSelect }) {
  const [metrics, setMetrics] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/py/weather/metrics")
      .then((response) => {
        setMetrics(response.data.metrics);
        setError(null);
      })
      .catch((err) => {
        console.error("Fehler beim Abrufen der Metriken:", err);
        setError("Fehler bei der Auswahl");
      });
  }, []);

  const handleSelection = (event) => {
    const metric = event.target.value;
    setSelectedMetric(metric);
    if (onMetricSelect) {
      onMetricSelect(metric);
    }
  };

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <select
          onChange={handleSelection}
          value={selectedMetric}
          style={{
            padding: "5px",
            fontSize: "20px",
            width: "300px",
            height: "50px",
            backgroundColor: "lightgrey",
            borderRadius: "5px",
          }}
        >
          <option value="" disabled>
            Metrik wählen
          </option>
          {metrics.map((metric) => (
            <option key={metric.key} value={metric.key}>
              {metric.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
