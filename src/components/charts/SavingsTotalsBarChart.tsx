import { Bar } from "react-chartjs-2";
import { useContext, useRef } from "react";
import { StateContext } from "@context/StateProvider";
import getChartOptions from "@utils/getChartOptions";
import getchartDatasets from "@utils/getChartDatasets";
import ChartSettings from "@components/ChartSettings/ChartSettings";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement   } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement );

interface SavingsTotalsBarChartProps {
  data: number[];
}

const SavingsTotalsBarChart = ({data}: SavingsTotalsBarChartProps) => {
  const sidebarOpen = useContext(StateContext).state.sidebarOpen;
  const chartOptions = getChartOptions({ chartType: "bar" })
  const [ chartDatasets ] = getchartDatasets({ dataFormatted: data, isComplex: false });
  const chartExportRef = useRef<HTMLDivElement>(null);

  const preparedChartData = {
    labels: [""],
    datasets: chartDatasets,
  };
  
  return (
    <div
      className={`chart-horizontal ${!sidebarOpen ? "chart--sidebar-closed" : ""}`}
      ref={chartExportRef}
    >
      <ChartSettings chartExportRef={chartExportRef} title={"Savings totals"} />
      <Bar data={preparedChartData} options={chartOptions} />
    </div>
  );
};

export default SavingsTotalsBarChart;
