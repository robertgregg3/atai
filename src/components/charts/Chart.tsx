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
import { getChartOptions, getChartDatasets } from "@utils";
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

export const Chart = ({ data, type = 'bar', labels = [""], isComplex = true }: ChartProps) => {
  const chartOptions = getChartOptions({ chartType: type })
  const chartExportRef = useRef<HTMLDivElement>(null);
  
  const [ chartDatasets ] = getChartDatasets({ dataFormatted: data ?? [], isComplex: isComplex });

  const preparedChartData = {
    labels: labels,
    datasets: chartDatasets,
  };

  if (!data) return; 

  return (
    <div
      className='chart-horizontal'
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
