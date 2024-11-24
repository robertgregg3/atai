import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement, TooltipItem   } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { StateContext } from "@context/StateProvider";
import DownloadChart from "@utils/DownloadChart";
import "./savingsTotalsBarChart.css";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement );

interface SavingsTotalsBarChartProps {
  chartData: number[];
  exportRef: HTMLDivElement | null;}

const SavingsTotalsBarChart = ({chartData, exportRef}: SavingsTotalsBarChartProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"bar">) {
            let label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw as number;

            if (label) {
              label += ": ";
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
          callback: function (tickValue: string | number) {
            const value = tickValue.toString().split(/(?=(?:...)*$)/).join(",");
            return "$" + value;
          },
        },
      },
    },
  };

  const data = {
    labels: [""],
    datasets: [
      {
        label: "Current Year Savings",
        data: [chartData[0]],
        backgroundColor: ["#10a8a9"],
      },
      {
        label: "Yearly Savings",
        data: [chartData[1]],
        backgroundColor: ["#000038"],
      },
      {
        label: "Monthly Savings",
        data: [chartData[2]],
        backgroundColor: ["#cccccc"],
      },
    ],
  };
  return (
    <div
      className={`chart-horizontal ${
        !sidebarOpen ? "chart--sidebar-closed" : ""
      }`}>
      <DownloadChart reference={exportRef} title={"Savings totals"} />
      <Bar data={data} options={options} />
    </div>
  );
};

export default SavingsTotalsBarChart;
