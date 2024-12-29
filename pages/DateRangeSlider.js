import React, { useState, useEffect } from "react";
import axios from "axios";
import { Slider, Typography } from "@mui/material";

export default function DateRangeSlider({ onDateRangeSelect }) {
  const [dateRange, setDateRange] = useState([0, 100]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [dateList, setDateList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://temperatabfrage.vercel.app/api/py/weather/date-range")
      .then((response) => {
        setMinDate(response.data.min_date);
        setMaxDate(response.data.max_date);

        const start = new Date(response.data.min_date);
        const end = new Date(response.data.max_date);
        const dates = [];
        while (start <= end) {
          dates.push(new Date(start).toISOString().split("T")[0]);
          start.setDate(start.getDate() + 1);
        }
        setDateList(dates);
      })
      .catch((error) => {
        console.error("Fehler beim Abruf des Datumbereiches:", error);
        setError("Fehler bei der Auswahl");
      });
  }, []);

  const handleSliderChange = (event, newValue) => {
    setDateRange(newValue);
    const startDate =
      dateList[Math.round((newValue[0] / 100) * (dateList.length - 1))];
    const endDate =
      dateList[Math.round((newValue[1] / 100) * (dateList.length - 1))];
    onDateRangeSelect({ startDate, endDate });
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h6">Zeitraum wählen</Typography>
      <Slider
        value={dateRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => {
          const index = Math.round((value / 100) * (dateList.length - 1));
          return dateList[index];
        }}
        min={0}
        max={100}
        step={1}
      />
      <Typography>
        Möglicher Zeitraum: {minDate && maxDate && `${minDate} bis ${maxDate}`}
      </Typography>
      {dateRange && (
        <Typography>
          Ausgewählter Zeitraum:{" "}
          {dateList.length > 0 &&
            `${
              dateList[Math.round((dateRange[0] / 100) * (dateList.length - 1))]
            } bis ${
              dateList[Math.round((dateRange[1] / 100) * (dateList.length - 1))]
            }`}
        </Typography>
      )}
    </div>
  );
}
