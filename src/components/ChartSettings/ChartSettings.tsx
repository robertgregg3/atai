import { chartFilters } from "@components/charts/DoughnutChart";

interface ChartSettingsProps {
    currentChart: chartFilters;
    handleChartSelectionClick: (timeFrame: chartFilters) => void;
  }
  
  const ChartSettings = ({ currentChart, handleChartSelectionClick }: ChartSettingsProps) => {
    return (
      <div className="chart__selection">
        <button
          className={currentChart === "currentYear" ? "chart-selected" : ""}
          onClick={() => handleChartSelectionClick('currentYear')}>
          Current Year
        </button>
        <button
          className={currentChart === "year" ? "chart-selected" : ""}
          onClick={() => handleChartSelectionClick('year')}>
          Year
        </button>
        <button
          className={currentChart === "month" ? "chart-selected" : ""}
          onClick={() => handleChartSelectionClick('month')}>
          Monthly
        </button>
      </div>
    );
  };

  export default ChartSettings;
  