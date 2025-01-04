import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { chartFilters, FormattedChartProps, SavingsTotalsTypes } from "./chart.types";
import { getChartOptions, getChartDatasets } from "@utils";
import ChartSettings from "@components/ChartSettings/ChartSettings";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface AdvancedChartProps {
  chartData: FormattedChartProps;
  savingsTotals: SavingsTotalsTypes;
  labels: string[];
}

export interface ChartDataFilteredProps {
  currentYear: number[];
  year: number[];
  month: number[];
}

type currentTotalsType = Record<chartFilters, string | number>;

const AdvancedChart = ({
  chartData,
  savingsTotals, 
  labels
}: AdvancedChartProps) => {
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null); // trigger chart animation on button press. 
  const chartExportRef = useRef<HTMLDivElement>(null);
  const [currentChart, setCurrentChart] = useState<chartFilters>(() => "currentYear");
  const [currentChartData, setCurrentChartData] = useState<number[]>(chartData['currentYear']);

  const currentTotals: currentTotalsType = {
    'currentYear': savingsTotals.ActualSavingsForCurrentYear,
    'year': savingsTotals.ActualSavingsForYear,
    'month': savingsTotals.ActualSavingsPerMonth,
  }
  
  const [currentTotal, setCurrentTotal] = useState<string | number>(currentTotals['currentYear']);
  
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;

      if (chartInstance.config?.data?.datasets?.[0]) {
        // Temporarily set data to an empty array to force a rerender
        chartInstance.config.data.datasets[0].data = [];
        chartInstance.update();

        // Synchronously update to the desired data
        chartInstance.config.data.datasets[0].data = [...currentChartData];
        chartInstance.update(); // Trigger chart update and animation
      }
    }
  }, [currentTotal]);
  
  // render the chart on first load with the currentYear data
  useEffect(() => {
    setCurrentTotal(savingsTotals.ActualSavingsForCurrentYear);
    setCurrentChartData(() => chartData['currentYear']);
  }, [chartData]);
  
  
  const handleChartSelectionClick = (timeFrame: chartFilters) => {
    setCurrentChartData(chartData[timeFrame]);
    setCurrentChart(timeFrame);
    setCurrentTotal(currentTotals[timeFrame]);
    // Updating these triggers a rerender as the getChartDataAsets function is called again
  }
  
  const chartTitle = `Total Savings for ${currentChart}: $${currentTotal} `;
  const chartOptions = getChartOptions({ chartType: "doughnut", chartTitle, showChartTitle: true });

  const [ chartDatasets ] = getChartDatasets({ dataFormatted: currentChartData, isDoughnutChart: true });
  
  const data = {
    labels: labels,
    datasets: chartDatasets
  };
  
  return (
    <div
      className='chart-horizontal'
      ref={chartExportRef}
    >
      <ChartSettings 
        currentChart={currentChart} 
        handleChartSelectionClick={handleChartSelectionClick} 
        chartExportRef={chartExportRef}
        isDougnutChart={true}
        title={`Total Savings for ${currentChart}`}
      />
      <Doughnut ref={chartRef} data={data} options={chartOptions} />
    </div>
  );
};

export default AdvancedChart;
