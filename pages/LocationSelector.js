import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LocationSelector({ onLocationSelect }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/py/weather/locations")
      .then((response) => {
        setLocations(response.data.locations);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Standorte:", error);
        setError("Fehler bei der Auswahl");
      });
  }, []);

  const handleSelection = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  return (
    <div>
      <h2>Standort Wählen</h2>
      <select onChange={handleSelection} value={selectedLocation}>
        <option value="" disabled>
          Standort auswählen
        </option>
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}
