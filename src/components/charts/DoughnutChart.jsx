import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DownloadChart from "../../utils/downloadChart";
import { useStateValue } from "../../Context/StateProvider";
import { useEffect, useRef, useState } from "react";
import formatChartData from "../../utils/formatChartData";
import "./doughnutChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const getCurrentTotal = (currentChartData) => {
  return currentChartData
    .reduce((total, item) => {
      // Get the value of the first (and only) property in the object
      const value = parseFloat(Object.values(item)[0]);
      return total + value;
    }, 0)
    .toFixed(2);
};

const DoughnutChart = ({
  chartData,
  exportProductTotal,
  triggerAnimation,
  setTriggerAnimation,
}) => {
  const chartRef = useRef(null); // Reference to the chart

  const currentYear = formatChartData(chartData.ActualSavingsForCurrentYear);
  const monthSavings = formatChartData(chartData.ActualSavingsPerMonth);
  const yearSavings = formatChartData(chartData.ActualSavingsForYear);
  const [options, setOptions] = useState();
  const [{ sidebarOpen }] = useStateValue();

  const [currentChartData, setCurrentChartData] = useState(currentYear);
  const [currentChart, setCurrentChart] = useState("current year");
  const [currentTotal, setCurrentTotal] = useState(
    getCurrentTotal(currentYear)
  );

  const chartLabels = formatChartData(
    chartData.ActualSavingsForCurrentYear,
    true
  );

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;

      // Temporarily set data to an empty array to force a rerender
      chartInstance.config.data.datasets[0].data = [];
      chartInstance.update();

      // Synchronously update to the desired data
      chartInstance.config.data.datasets[0].data = [...currentChartData];
      chartInstance.update(); // Trigger chart update and animation
    }
  }, [triggerAnimation]);

  const handleChartSelectionClick = (filter, timeFrame) => {
    setCurrentChartData(() => filter);
    setCurrentChart(timeFrame);
    setCurrentTotal(getCurrentTotal(filter));
    setTriggerAnimation((prev) => !prev);
    setCurrentChartData(() => filter);
  };

  useEffect(() => {
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Total Savings for ${currentChart}: $${currentTotal} `,
        },
        legend: {
          position: "bottom",
          display: true,
          labels: {
            usePointStyle: true,
            padding: 15,
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || "";
              if (label) {
                label +=
                  ` -- ${context.label}: $` +
                  Math.round(context.parsed).toFixed(2);
              }
              return label;
            },
          },
        },
      },
    });
  }, [triggerAnimation]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Product Savings",
        data: currentChartData,
        backgroundColor: [
          "#10a8a9",
          "#000038",
          "#cccccc",
          "#f9da7b",
          "#d1da8d",
          "#9dcece",
          "#8989a0",
          "#0b7083",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div
      className={`chart-horizontal ${
        !sidebarOpen ? "chart--sidebar-closed" : ""
      }`}>
      <div className="chart__selection">
        <button
          className={currentChart === "current year" ? "chart-selected" : ""}
          onClick={() =>
            handleChartSelectionClick(currentYear, "current year")
          }>
          Current Year
        </button>
        <button
          className={currentChart === "year" ? "chart-selected" : ""}
          onClick={() => handleChartSelectionClick(yearSavings, "year")}>
          Year
        </button>
        <button
          className={currentChart === "month" ? "chart-selected" : ""}
          onClick={() => handleChartSelectionClick(monthSavings, "month")}>
          Monthly
        </button>
      </div>
      <DownloadChart
        reference={exportProductTotal}
        title={`Total Savings for ${currentChart}`}
      />
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
