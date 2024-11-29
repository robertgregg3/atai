import { useContext, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { ChartType, ComplexChartDataTypes } from "./chart.types";
import { StateContext } from "@context/StateProvider";
import { ChartDataFilteredProps } from "./DoughnutChart";
import formatChartData from "@utils/formatChartData";
import DownloadChart from "@utils/DownloadChart";
import formatChartLabels from "@utils/formatChartLabels";
import getChartOptions from "@utils/getChartOptions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: ComplexChartDataTypes;
  type: ChartType;
}

const ComplexChart = ({ data, type = 'bar' }: ChartProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;
  const chartExportRef = useRef<HTMLDivElement>(null);
  const { chartOptions } = getChartOptions({ chartType: type })

  const dataFormatted: ChartDataFilteredProps = {
    ActualSavingsForCurrentYear: formatChartData({ chartData: data.ActualSavingsForCurrentYear}),
    ActualSavingsForYear: formatChartData({ chartData: data.ActualSavingsForYear }),
    ActualSavingsPerMonth: formatChartData({ chartData: data.ActualSavingsPerMonth }),
  };

  const chartLabels = formatChartLabels({ chartData: data.ActualSavingsForCurrentYear });

  const chartData = [
    {
      label: "Current Year Savings",
      data: dataFormatted.ActualSavingsForCurrentYear,
      backgroundColor: "#10a8a9",
    },
    {
      label: "Yearly Savings",
      data: dataFormatted.ActualSavingsForYear,
      backgroundColor: "#000038",
    },
    {
      label: "Monthly Savings",
      data: dataFormatted.ActualSavingsPerMonth,
      backgroundColor: "#cccccc",
    },
  ];

  const preparedChartData = {
    labels: chartLabels,
    datasets: chartData,
  };

  if (!data) return; // Check if data is not null or undefined

  return (
    <div
      className={`chart-horizontal ${!sidebarOpen ? "chart--sidebar-closed" : ""}`}
      ref={chartExportRef}
    >
      <DownloadChart
        reference={chartExportRef}
        title={"Environment Savings"}
      />
      {type === 'line' && <Line options={chartOptions} data={preparedChartData} />}
      {type === 'bar' && <Bar options={chartOptions} data={preparedChartData} />}
    </div>
  );
};

export default ComplexChart;
