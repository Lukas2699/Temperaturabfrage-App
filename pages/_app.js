import React, { useState } from "react";
import LocationSelector from "./LocationSelector";
import DateRangeSlider from "./DateRangeSlider";
import TemperatureSelector from "./TemperatureSelector";
import ChartButtonButton from "./ChartButtonButton";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log("Ausgewählter Standort:", location);
  };

  const [selectedDateRange, setSelectedDateRange] = useState({});

  const handleDateRangeSelect = (range) => {
    setSelectedDateRange(range);
    console.log("Ausgewählter Zeitraum:", range);
  };

  const [selectedMetric, setSelectedMetric] = useState("");

  const handleMetricSelect = (metric) => {
    setSelectedMetric(metric);
    console.log("Ausgewählte Metrik:", metric);
  };

  const [filteredData, setFilteredData] = useState([]);

  const isButtonEnabled =
    selectedLocation &&
    selectedDateRange.startDate &&
    selectedDateRange.endDate &&
    selectedMetric;

    const handleSubmit = () => {
      axios
        .get("http://localhost:3000/api/py/weather/filter", {
          params: {
            location: selectedLocation,
            start_date: selectedDateRange.startDate,
            end_date: selectedDateRange.endDate,
            metric: selectedMetric,
          },
        })
        .then((response) => {
          setFilteredData(response.data.data);
          console.log("Gefilterte Daten:", response.data.data);
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Daten:", error);
        });
    };
  }

  return (
    <>
      <div>
        <h1>Wetterdaten-App</h1>
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>
      <div>
        <DateRangeSlider onDateRangeSelect={handleDateRangeSelect} />
      </div>
      <div>
        <TemperatureSelector onMetricSelect={handleMetricSelect} />
      </div>
      <div>
      <ChartButton isEnabled={isButtonEnabled} onClick={handleSubmit} /></div>
      <div>{filteredData.length > 0 && ()}</div>
    </>
  );

