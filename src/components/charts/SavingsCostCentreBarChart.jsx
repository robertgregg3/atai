import React, { useEffect, useState } from "react";
import "./barChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DownloadChart from "../../utils/downloadChart";
import { useStateValue } from "../../Context/StateProvider";
import formatChartData from "../../utils/formatChartData";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SavingsCostCentreBarChart = ({ chartData, exportCostCenterTotals }) => {
  const [{ sidebarOpen }] = useStateValue();

  const currentYear = formatChartData(chartData.ActualSavingsForCurrentYear);
  const monthSavings = formatChartData(chartData.ActualSavingsForYear);
  const yearSavings = formatChartData(chartData.ActualSavingsPerMonth);
  const chartLabels = formatChartData(
    chartData.ActualSavingsForCurrentYear,
    true
  );

  const barChartData = [
    {
      label: "Current Year Savings",
      data: currentYear,
      backgroundColor: ["#10a8a9"],
    },
    {
      label: "Yearly Savings",
      data: yearSavings,
      backgroundColor: ["#000038"],
    },
    {
      label: "Monthly Savings",
      data: monthSavings,
      backgroundColor: ["#cccccc"],
    },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide the x-axis grid lines
        },
        ticks: {
          padding: 15, // Adds padding between x-axis labels and chart content
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          padding: 15, // Adds padding between y-axis labels and chart content
          callback: function (value) {
            value = value
              .toString()
              .split(/(?=(?:...)*$)/)
              .join(",");
            return "$" + value;
          },
        },
      },
    },
  };

  const data = {
    labels: chartLabels,
    datasets: barChartData,
  };

  if (!chartData) return; // Check if chartData is not null or undefined

  return (
    <div
      className={`chart-horizontal ${
        !sidebarOpen ? "chart--sidebar-closed" : ""
      }`}>
      <DownloadChart
        reference={exportCostCenterTotals}
        title={"Cost Centre Savings"}
      />
      <Bar options={options} data={data} />
    </div>
  );
};

export default SavingsCostCentreBarChart;
