import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const date = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") {
      date.push(new Date(arr[i][0]).toTimeString().split(" ")[0]); // Just take time part
    } else {
      date.push(new Date(arr[i][0]).toDateString());
    }
    prices.push(arr[i][1]); // Assuming arr[i][1] holds the price
  }

  const chartData = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(255,99,132,0.5)",
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
      }}
      data={chartData}
    />
  );
};

export default Chart;
