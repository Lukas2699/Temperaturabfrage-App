import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Diagramm({ data }) {
  const chartData = {
    labels: data.map((item) => item.Datum),
    datasets: [
      {
        label: "Temperaturverlauf",
        data: data.map((item) => item.value),
        borderColor: "rgb(224, 22, 22)",
        pointBackgroundColor: "rgb(224, 22, 22)",
        pointBorderColor: "rgba(0,0,0,0.5)",
        pointRadius: 3.5,
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Temperatur: ${value} °C`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Datum",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperatur (°C)",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      {" "}
      {}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
