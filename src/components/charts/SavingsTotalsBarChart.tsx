import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement, TooltipItem   } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext, useRef } from "react";
import { StateContext } from "@context/StateProvider";
import DownloadChart from "@utils/DownloadChart";
import getChartOptions from "@utils/getChartOptions";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement );

interface SavingsTotalsBarChartProps {
  data: number[];
}

const SavingsTotalsBarChart = ({data}: SavingsTotalsBarChartProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;
  const exportSavingsTotalsRef = useRef<HTMLDivElement>(null);
  const { chartOptions } = getChartOptions({ chartType: "bar" })

  const preparedChartData = {
    labels: [""],
    datasets: [
      {
        label: "Current Year Savings",
        data: [data[0]],
        backgroundColor: ["#10a8a9"],
      },
      {
        label: "Yearly Savings",
        data: [data[1]],
        backgroundColor: ["#000038"],
      },
      {
        label: "Monthly Savings",
        data: [data[2]],
        backgroundColor: ["#cccccc"],
      },
    ],
  };
  return (
    <div
      className={`chart-horizontal ${!sidebarOpen ? "chart--sidebar-closed" : ""}`}
      ref={exportSavingsTotalsRef}
    >
      <DownloadChart reference={exportSavingsTotalsRef} title={"Savings totals"} />
      <Bar data={preparedChartData} options={chartOptions} />
    </div>
  );
};

export default SavingsTotalsBarChart;
