import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationSelector from "./LocationSelector";
import DateRangeSlider from "./DateRangeSlider";
import TemperatureSelector from "./TemperatureSelector";
import ChartButton from "./ChartButton";
import Diagramm from "./Diagramm";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log("Ausgewählter Standort:", location);
  };

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    axios
      .get("https://temperatabfrage.vercel.app/api/py/weather/date-range")
      .then((response) => {
        setSelectedDateRange({
          startDate: response.data.min_date,
          endDate: response.data.max_date,
        });
        console.log("Datensatz-Datumbereich:", response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen des Datumsbereiches:", error);
      });
  }, []);

  const handleDateRangeSelect = (range) => {
    setSelectedDateRange(range);
    console.log("Ausgewählter Zeitraum:", range);
  };

  const [selectedMetric, setSelectedMetric] = useState("");
  const handleMetricSelect = (metric) => {
    setSelectedMetric(metric);
    console.log("Ausgewählte Metrik:", metric);
  };

  const isButtonEnabled = selectedLocation && selectedMetric;

  const [filteredData, setFilteredData] = useState([]);

  const handleSubmit = () => {
    axios
      .get("https://temperatabfrage.vercel.app/api/py/weather/filter", {
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

  return (
    <>
      <div>
        <h1
          style={{
            marginLeft: "20px",
            backgroundColor: "lightblue",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Temperaturabfrage-App
        </h1>
      </div>
      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>
      <div>
        <DateRangeSlider onDateRangeSelect={handleDateRangeSelect} />
      </div>
      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <TemperatureSelector onMetricSelect={handleMetricSelect} />
      </div>
      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <ChartButton isEnabled={isButtonEnabled} onClick={handleSubmit} />
      </div>
      <div>
        {filteredData.length > 0 ? (
          <Diagramm
            data={filteredData.map((item) => ({
              Datum: item.Datum,
              value: item[selectedMetric],
            }))}
          />
        ) : null}
      </div>
    </>
  );
}
