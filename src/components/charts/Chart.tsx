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
import { ChartType } from "./chart.types";
import { StateContext } from "@context/StateProvider";
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

interface ChartProps {
  data: number[][] | number[];
  type: ChartType;
  labels: string[];
  isComplex: boolean;
}

const Chart = ({ data, type = 'bar', labels, isComplex }: ChartProps) => {
  const sidebarOpen = useContext(StateContext).state.sidebarOpen;
  const chartOptions = getChartOptions({ chartType: type })
  const chartExportRef = useRef<HTMLDivElement>(null);
  
  const [ chartDatasets ] = getChartData({ dataFormatted: data, isComplex: isComplex });

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

