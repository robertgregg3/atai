import { useContext, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DownloadChart from "@utils/DownloadChart";
import formatChartData from "@utils/formatChartData";
import { StateContext } from "@context/StateProvider";
import { ChartDataFilteredProps } from "./DoughnutChart";
import formatChartLabels from "@utils/formatChartLabels";
import { ComplexBarChartDataTypes } from "./chart.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  chartData: ComplexBarChartDataTypes;
}

const SavingsCostCentreBarChart = ({ chartData }: BarChartProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;
  const exportCostCenterTotalRef = useRef<HTMLDivElement>(null);

  const chartDataFormatted: ChartDataFilteredProps = {
    ActualSavingsForCurrentYear: formatChartData({ chartData: chartData.ActualSavingsForCurrentYear}),
    ActualSavingsForYear: formatChartData({ chartData: chartData.ActualSavingsForYear }),
    ActualSavingsPerMonth: formatChartData({ chartData: chartData.ActualSavingsPerMonth }),
  };

  const chartLabels = formatChartLabels({ chartData: chartData.ActualSavingsForCurrentYear });

  const barChartData = [
    {
      label: "Current Year Savings",
      data: chartDataFormatted.ActualSavingsForCurrentYear,
      backgroundColor: ["#10a8a9"],
    },
    {
      label: "Yearly Savings",
      data: chartDataFormatted.ActualSavingsForYear,
      backgroundColor: ["#000038"],
    },
    {
      label: "Monthly Savings",
      data: chartDataFormatted.ActualSavingsPerMonth,
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
    labels: chartLabels,
    datasets: barChartData,
  };

  if (!chartData) return; // Check if chartData is not null or undefined

  return (
    <div
      className={`chart-horizontal ${!sidebarOpen ? "chart--sidebar-closed" : ""}`}
      ref={exportCostCenterTotalRef}
    >
      <DownloadChart
        reference={exportCostCenterTotalRef}
        title={"Cost Centre Savings"}
      />
      <Bar options={options} data={data} />
    </div>
  );
};

export default SavingsCostCentreBarChart;
