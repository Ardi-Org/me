"use client";

import useSWR from "swr";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error } = useSWR("/api/stats", fetcher, {
    refreshInterval: 60000, // update every 1 min
  });

  if (error) return <p>Error loading</p>;
  if (!data) return <p>Loading...</p>;

  const labels = data.map((d) => d.day);
  const values = data.map((d) => d.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Proses integrasi dengan SIASN BKN",
        data: values,
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Articles Dashboard</h1>

      {/* TEXT (FASTEST) */}
      <h3>Summary</h3>
      <p>Total days shown: {data.length}</p>
      <p>Latest day count: {values[0]}</p>

      {/* LINE */}
      <h3>Line Chart</h3>
      <Line data={chartData} />

      {/* BAR */}
      <h3>Bar Chart</h3>
      <Bar data={chartData} />

      {/* PIE */}
      <h3>Pie Chart</h3>
      <Pie data={chartData} />
    </div>
  );
}
