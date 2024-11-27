import { useContext, useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { StateContext } from "@context/StateProvider";
import formatChartData from "@utils/formatChartData";
import formatChartLabels from "@utils/formatChartLabels";
import DownloadChart from "@utils/DownloadChart";
import "./doughnutChart.css";
import { ComplexBarChartDataTypes, SavingsTotalsTypes } from "./chart.types";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProps {
  chartData: ComplexBarChartDataTypes;
  savingsTotals: SavingsTotalsTypes;
  triggerAnimation: boolean;
  setTriggerAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChartDataFilteredProps {
  ActualSavingsForCurrentYear: number[];
  ActualSavingsForYear: number[];
  ActualSavingsPerMonth: number[];
}

const DoughnutChart = ({
  chartData,
  savingsTotals, 
  triggerAnimation,
  setTriggerAnimation,
}: DoughnutChartProps) => {
  const [ options, setOptions ] = useState<any>();
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
  const [currentChart, setCurrentChart] = useState<string>("current year");
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
  }, [triggerAnimation]);

  interface HandleChartSelectionClickProps {
    filter: number[];
    timeFrame: string;
  }

  const handleChartSelectionClick = ({
    filter,
    timeFrame,
  }: HandleChartSelectionClickProps) => {
    setCurrentChart(timeFrame);
    setCurrentTotal(savingsTotals[timeFrame === 'current year' ? 'ActualSavingsForCurrentYear' : timeFrame === 'year' ? 'ActualSavingsForYear' : 'ActualSavingsPerMonth']);
    setTriggerAnimation((prev: boolean) => !prev);
    setCurrentChartData(() => filter);
  };

  useEffect(() => {
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
      title: {
        display: true,
        text: `Total Savings for ${currentChart}: $${currentTotal} `,
      },
      legend: {
        position: "bottom",
        display: true,
        labels: {
        usePointStyle: true,
        padding: 15,
        },
      },
      tooltip: {
        callbacks: {
        label: (context: { dataset: { label: string }; label: string; parsed: number }) => {
          let label = context.dataset.label || "";
          if (label) {
          label +=
            ` -- ${context.label}: $` +
            Math.round(context.parsed).toFixed(2);
          }
          return label;
        },
        },
      },
      },
    });
  }, [triggerAnimation]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Product Savings",
        data: currentChartData,
        backgroundColor: [
          "#10a8a9",
          "#000038",
          "#cccccc",
          "#f9da7b",
          "#d1da8d",
          "#9dcece",
          "#8989a0",
          "#0b7083",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 0,
      },
    ],
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
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
