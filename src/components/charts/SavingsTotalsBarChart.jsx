import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "./savingsTotalsBarChart.css";
import DownloadChart from "../../utils/downloadChart";
ChartJS.register(ArcElement, Tooltip, Legend);

const SavingsTotalsBarChart = ({ chartData, exportSavingsTotals }) => {
  useEffect(() => {}, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
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
    labels: ["Savings Totals"],
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
    <div className="chart-horizontal">
      <DownloadChart reference={exportSavingsTotals} title={"Savings totals"} />
      <Bar data={data} options={options} />
    </div>
  );
};

export default SavingsTotalsBarChart;
