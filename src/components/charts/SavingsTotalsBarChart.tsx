import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement   } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext, useRef } from "react";
import { StateContext } from "@context/StateProvider";
import DownloadChart from "@utils/DownloadChart";
import getChartOptions from "@utils/getChartOptions";
import getChartDatasets from "@utils/getChartDatasets";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement );

interface SavingsTotalsBarChartProps {
  data: number[];
}

const SavingsTotalsBarChart = ({data}: SavingsTotalsBarChartProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;
  const { chartOptions } = getChartOptions({ chartType: "bar" })
  const [ chartDataSets ] = getChartDatasets({ dataFormatted: data, isComplex: false });
  const chartExportRef = useRef<HTMLDivElement>(null);

  const preparedChartData = {
    labels: [""],
    datasets: chartDataSets,
  };
  return (
    <div
      className={`chart-horizontal ${!sidebarOpen ? "chart--sidebar-closed" : ""}`}
      ref={chartExportRef}
    >
      <DownloadChart reference={chartExportRef} title={"Savings totals"} />
      <Bar data={preparedChartData} options={chartOptions} />
    </div>
  );
};

export default SavingsTotalsBarChart;
