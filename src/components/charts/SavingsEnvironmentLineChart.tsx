import { useContext } from "react";
import "./barChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DownloadChart from "@utils/DownloadChart";
import formatChartData from "@utils/formatChartData";
import { StateContext } from "@context/StateProvider";
import { ChartDataFilteredProps } from "./DoughnutChart";
import { ComplexBarChartDataProps } from "@components/dataVisualisation/DataVisualisation";
import formatChartLabels from "@utils/formatChartLabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  chartData: ComplexBarChartDataProps;
  exportRef: HTMLDivElement | null;}

const SavingsEnvironmentLineChart = ({ chartData, exportRef }: BarChartProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;

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
      backgroundColor: "#10a8a9",
    },
    {
      label: "Yearly Savings",
      data: chartDataFormatted.ActualSavingsForYear,
      backgroundColor: "#000038",
    },
    {
      label: "Monthly Savings",
      data: chartDataFormatted.ActualSavingsPerMonth,
      backgroundColor: "#cccccc",
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
          label: function (tooltipItem: TooltipItem<"line">) {
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
          callback: function (value: string | number) {
            const formattedValue = value
              .toString()
              .split(/(?=(?:...)*$)/)
              .join(",");
            return "$" + formattedValue;
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
        reference={exportRef}
        title={"Cost Centre Savings"}
      />
      <Line options={options} data={data} />
    </div>
  );
};

export default SavingsEnvironmentLineChart;
