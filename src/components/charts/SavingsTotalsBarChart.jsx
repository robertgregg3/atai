import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "./savingsTotalsBarChart.css";
import DownloadChart from "../../utils/downloadChart";
import { useStateValue } from "../../Context/StateProvider";
ChartJS.register(ArcElement, Tooltip, Legend);

const SavingsTotalsBarChart = ({ chartData, exportSavingsTotals }) => {
  const [{ sidebarOpen }] = useStateValue();
  useEffect(() => {}, []);

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
      yAxes: {
        ticks: {
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
      <DownloadChart reference={exportSavingsTotals} title={"Savings totals"} />
      <Bar data={data} options={options} />
    </div>
  );
};

export default SavingsTotalsBarChart;
