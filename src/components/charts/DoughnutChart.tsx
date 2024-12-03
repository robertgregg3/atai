import { useContext, useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { StateContext } from "@context/StateProvider";
import { ComplexChartDataTypes, SavingsTotalsTypes } from "./chart.types";
import formatChartData from "@utils/formatChartData";
import formatChartLabels from "@utils/formatChartLabels";
import getChartOptions from "@utils/getChartOptions";
import getchartDatasets from "@utils/getchartDatasets";
import ChartSettings from "@components/ChartSettings/ChartSettings";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProps {
  chartData: ComplexChartDataTypes;
  savingsTotals: SavingsTotalsTypes;
}

export interface ChartDataFilteredProps {
  currentYear: number[];
  year: number[];
  month: number[];
}

export type chartFilters = 'currentYear' | 'year' | 'month';
type currentTotals = Record<chartFilters, string | number>;

const DoughnutChart = ({
  chartData,
  savingsTotals, 
}: DoughnutChartProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null); // trigger chart animation on button press. 
  const productTotalRef = useRef<HTMLDivElement>(null);
  const [currentChart, setCurrentChart] = useState<chartFilters>(() => "currentYear");

  const formattedData = {
    'currentYear': formatChartData({ chartData: chartData.ActualSavingsForCurrentYear }),
    'year': formatChartData({ chartData: chartData.ActualSavingsForYear }),
    'month': formatChartData({ chartData: chartData.ActualSavingsPerMonth }),
  }

  const [currentChartData, setCurrentChartData] = useState<number[]>(formattedData['currentYear']);

  const currentTotals: currentTotals = {
    'currentYear': savingsTotals.ActualSavingsForCurrentYear,
    'year': savingsTotals.ActualSavingsForYear,
    'month': savingsTotals.ActualSavingsPerMonth,
  }
  
  const [currentTotal, setCurrentTotal] = useState<string | number>(currentTotals['currentYear']);
  
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
  
  // render the chart on first load with the currentYear data
  useEffect(() => {
    setCurrentTotal(savingsTotals.ActualSavingsForCurrentYear);
    setCurrentChartData(() => formattedData['currentYear']);
  }, [chartData]);
  
  
  const handleChartSelectionClick = (timeFrame: chartFilters) => {
    setCurrentChartData(formattedData[timeFrame]);
    setCurrentChart(timeFrame);
    setCurrentTotal(currentTotals[timeFrame]);
    // Updating these triggers a rerender as the getchartDatasets function is called again
  }
  
  const chartTitle = `Total Savings for ${currentChart}: $${currentTotal} `;
  const { chartOptions } = getChartOptions({ chartType: "doughnut", chartTitle, showChartTitle: true });

  const [ chartDatasets ] = getchartDatasets({ dataFormatted: currentChartData, isDoughnutChart: true });
  const chartLabels: string[] = formatChartLabels({chartData: chartData.ActualSavingsForCurrentYear });
  
  const data = {
    labels: chartLabels,
    datasets: chartDatasets
  };
  
  return (
    <div
      className={`chart-horizontal ${!sidebarOpen ? "chart--sidebar-closed" : ""}`}
      ref={productTotalRef}
    >
      <ChartSettings 
        currentChart={currentChart} 
        handleChartSelectionClick={handleChartSelectionClick} 
        productTotalRef={productTotalRef}
        isDougnutChart={true}
        title={`Total Savings for ${currentChart}`}
      />
      <Doughnut ref={chartRef} data={data} options={chartOptions} />
    </div>
  );
};

export default DoughnutChart;
