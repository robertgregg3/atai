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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SavingsEnvironmentBarChart = ({ chartData, exportEnvironmentTotals }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const chartDataSets = Object.keys(chartData);
    const savingsForCurrentYear = chartData["ActualSavingsForCurrentYear"];
    const savingsPerYear = chartData["ActualSavingsForYear"];
    const savingsPerMonth = chartData["ActualSavingsPerMonth"];

    let chartDataLabels = [];

    chartData &&
      savingsForCurrentYear.map((data) => {
        if (data) {
          for (let key in data) {
            return (chartDataLabels = [...chartDataLabels, key]);
          }
        }
        return [];
      });

    setChartLabels(chartDataLabels);

    let currentYearSavings = [];
    chartData &&
      savingsForCurrentYear?.map((data) => {
        if (data) {
          for (let key in data) {
            return (currentYearSavings = [...currentYearSavings, data[key]]);
          }
        }
        return [];
      });

    let yearSavings = [];
    chartData &&
      savingsPerYear?.map((data) => {
        if (data) {
          for (let key in data) {
            return (yearSavings = [...yearSavings, data[key]]);
          }
        }
        return [];
      });

    let monthSavings = [];
    chartData &&
      savingsPerMonth?.map((data) => {
        if (data) {
          for (let key in data) {
            return (monthSavings = [...monthSavings, data[key]]);
          }
        }
        return [];
      });

    setBarChartData([
      {
        label: chartDataSets[0],
        data: currentYearSavings,
        backgroundColor: ["#10a8a9"],
      },
      {
        label: chartDataSets[1],
        data: yearSavings,
        backgroundColor: ["#000038"],
      },
      {
        label: chartDataSets[2],
        data: monthSavings,
        backgroundColor: ["#cccccc"],
      },
    ]);
  }, [chartData]);

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

  return (
    <div className="chart-horizontal">
      <DownloadChart
        reference={exportEnvironmentTotals}
        title={"Environment Savings"}
      />
      <Bar options={options} data={data} />
    </div>
  );
};

export default SavingsEnvironmentBarChart;
