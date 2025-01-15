import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { chartFilters, FormattedChartProps, SavingsTotalsTypes } from "@components";
import { getChartOptions, getChartDatasets } from "@utils";
import { ChartSettings } from "@components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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

export const AdvancedChart = ({
  chartData,
  savingsTotals, 
  labels
}: AdvancedChartProps) => {
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null); // trigger chart animation on button press. 
  const chartExportRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const timeframe = searchParams.get('timeframe') as chartFilters;

  const [currentChart, setCurrentChart] = useState<chartFilters>(() => timeframe || "current-year");
  const [currentChartData, setCurrentChartData] = useState<number[]>(chartData['currentYear']);

  const currentTotals: currentTotalsType = {
    'current-year': savingsTotals.ActualSavingsForCurrentYear,
    'year': savingsTotals.ActualSavingsForYear,
    'month': savingsTotals.ActualSavingsPerMonth,
  }
  
  const [currentTotal, setCurrentTotal] = useState<string | number>(currentTotals['current-year']);
  
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
  
  
  const handleChartSelectionClick = (chartTimeFrame: chartFilters) => {
    setCurrentChartData(chartData[chartTimeFrame as keyof typeof chartData]);
    setCurrentChart(chartTimeFrame);
    setCurrentTotal(currentTotals[chartTimeFrame]);

    // update the url to be used as state. 
    navigate(`/charts/product?timeframe=${chartTimeFrame}`)
  }
  
  const chartTitle = `Total Savings for ${currentChart}: $${currentTotal} `;
  const chartOptions = getChartOptions({ chartType: "doughnut", chartTitle, showChartTitle: true });

  const chartDatasets = getChartDatasets({ dataFormatted: currentChartData, isDoughnutChart: true });
  
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
