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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { ChartType, ComplexChartDataTypes } from "./chart.types";
import { StateContext } from "@context/StateProvider";
import formatChartData from "@utils/formatChartData";
import DownloadChart from "@utils/DownloadChart";
import formatChartLabels from "@utils/formatChartLabels";
import getChartOptions from "@utils/getChartOptions";
import getChartData from "@utils/getchartDatasets";

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
  const { chartOptions } = getChartOptions({ chartType: type })
  const chartExportRef = useRef<HTMLDivElement>(null);

  const dataFormatted: number[][] = [
    formatChartData({ chartData: data.ActualSavingsForCurrentYear}),
    formatChartData({ chartData: data.ActualSavingsForYear }),
    formatChartData({ chartData: data.ActualSavingsPerMonth }),
  ];
  
  const chartLabels = formatChartLabels({ chartData: data.ActualSavingsForCurrentYear });
  const [ chartDatasets ] = getChartData({ dataFormatted, isComplex: true });

  const preparedChartData = {
    labels: chartLabels,
    datasets: chartDatasets,
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
