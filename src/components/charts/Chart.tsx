import { useRef } from "react";
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
import { ChartProps } from "./chart.types";
import getChartOptions from "@utils/getChartOptions";
import getChartData from "@utils/getChartDatasets";
import ChartSettings from "@components/ChartSettings/ChartSettings";

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

const Chart = ({ data, type = 'bar', labels = [""], isComplex = true, sidebarOpen }: ChartProps) => {
  const chartOptions = getChartOptions({ chartType: type })
  const chartExportRef = useRef<HTMLDivElement>(null);
  
  const [ chartDatasets ] = getChartData({ dataFormatted: data ?? [], isComplex: isComplex });

  const preparedChartData = {
    labels: labels,
    datasets: chartDatasets,
  };

  if (!data) return; 

  return (
    <div
      className={`chart-horizontal ${!sidebarOpen ? "chart--sidebar-closed" : ""}`}
      ref={chartExportRef}
    >
      <ChartSettings 
        chartExportRef={chartExportRef} 
        title={"Environment Savings"}
      />
      {type === 'line' && <Line options={chartOptions} data={preparedChartData} />}
      {type === 'bar' && <Bar options={chartOptions} data={preparedChartData} />}
    </div>
  );
};

export default Chart;

