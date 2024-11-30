import { useContext, useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { StateContext } from "@context/StateProvider";
import { ComplexChartDataTypes, SavingsTotalsTypes } from "./chart.types";
import formatChartData from "@utils/formatChartData";
import formatChartLabels from "@utils/formatChartLabels";
import DownloadChart from "@utils/DownloadChart";
import getChartOptions from "@utils/getChartOptions";
import getchartDatasets from "@utils/getchartDatasets";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProps {
  chartData: ComplexChartDataTypes;
  savingsTotals: SavingsTotalsTypes;
}

export interface ChartDataFilteredProps {
  ActualSavingsForCurrentYear: number[];
  ActualSavingsForYear: number[];
  ActualSavingsPerMonth: number[];
}

const DoughnutChart = ({
  chartData,
  savingsTotals, 
}: DoughnutChartProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null); // chart rerender when totals change
  const productTotalRef = useRef<HTMLDivElement>(null);

  const chartDataFormatted: ChartDataFilteredProps = {
    ActualSavingsForCurrentYear: formatChartData({ chartData: chartData.ActualSavingsForCurrentYear}),
    ActualSavingsPerMonth: formatChartData({ chartData: chartData.ActualSavingsPerMonth}),
    ActualSavingsForYear: formatChartData({ chartData: chartData.ActualSavingsForYear}),
  };
  
  const [currentChartData, setCurrentChartData] = useState<number[]>(chartDataFormatted.ActualSavingsForCurrentYear);
  const [currentChart, setCurrentChart] = useState<string>(() => "current year");
  const [currentTotal, setCurrentTotal] = useState<string | number>(savingsTotals.ActualSavingsForCurrentYear);
  const chartLabels: string[] = formatChartLabels({chartData: chartData.ActualSavingsForCurrentYear });

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;

      // Temporarily set data to an empty array to force a rerender
      chartInstance.config.data.datasets[0].data = [];
      chartInstance.update();

      // Synchronously update to the desired data
      chartInstance.config.data.datasets[0].data = [...currentChartData];
      chartInstance.update(); // Trigger chart update and animation
    }
  }, [currentTotal]);

  useEffect(() => {
    setCurrentTotal(savingsTotals.ActualSavingsForCurrentYear);
    setCurrentChartData(() => chartDataFormatted.ActualSavingsForCurrentYear);
  }, [chartData])

  interface HandleChartSelectionClickProps {
    filter: number[];
    timeFrame: string;
  }

  const handleChartSelectionClick = ({
    filter,
    timeFrame,
  }: HandleChartSelectionClickProps) => {
    setCurrentChart(timeFrame);
    setCurrentTotal(
      savingsTotals[timeFrame === 'current year' 
        ? 'ActualSavingsForCurrentYear' 
        : timeFrame === 'year' 
        ? 'ActualSavingsForYear' 
        : 'ActualSavingsPerMonth']);
    setCurrentChartData(() => filter);
  };

  
  const chartTitle = `Total Savings for ${currentChart}: $${currentTotal} `;
  const { chartOptions } = getChartOptions({ chartType: "doughnut", chartTitle, showChartTitle: true });
  const [ chartDatasets ] = getchartDatasets({ dataFormatted: currentChartData, isDoughnutChart: true });
 
  const data = {
    labels: chartLabels,
    datasets: chartDatasets
  };
  
  return (
    <div
      className={`chart-horizontal ${!sidebarOpen ? "chart--sidebar-closed" : ""}`}
      ref={productTotalRef}
    >
      <div className="chart__selection">
        <button
          className={currentChart === "current year" ? "chart-selected" : ""}
          onClick={() =>
            handleChartSelectionClick({ filter: chartDataFormatted.ActualSavingsForCurrentYear, timeFrame: "current year" })
          }>
          Current Year
        </button>
        {/* <ChartFilterButton
          text='Current Year'
          onClick={() => handleChartSelectionClick({ filter: chartDataFormatted.ActualSavingsForCurrentYear, timeFrame: "current year" })}
        /> */}
        <button
          className={currentChart === "year" ? "chart-selected" : ""}
          onClick={() => handleChartSelectionClick({ filter: chartDataFormatted.ActualSavingsForYear, timeFrame: "year" })}>
          Year
        </button>
        <button
          className={currentChart === "month" ? "chart-selected" : ""}
          onClick={() => handleChartSelectionClick({ filter: chartDataFormatted.ActualSavingsPerMonth, timeFrame: "month" })}>
          Monthly
        </button>
      </div>
      <DownloadChart
        reference={productTotalRef}
        title={`Total Savings for ${currentChart}`}
      />
      <Doughnut ref={chartRef} data={data} options={chartOptions} />
    </div>
  );
};

export default DoughnutChart;
