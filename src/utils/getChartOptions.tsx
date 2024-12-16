import { ChartType } from "@components/charts/chart.types";
import { TooltipItem } from "chart.js";

interface GetChartOptionsProps {
  chartType: ChartType;
  isResponsive?: boolean;
  showChartTitle?: boolean;
  chartTitle?: string;
  legendPosition?: "bottom" | "left" | "right" | "top" | "center" | "chartArea";
  labelPadding?: number;
  scalePadding?: { x: number; y: number };
}

interface ChartOptionsType<T extends ChartType> {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins: {
    title: {
      display: boolean;
      text?: string;
    };
    legend: {
      position: "bottom" | "left" | "right" | "top" | "center" | "chartArea";
      labels: {
        usePointStyle: boolean;
        padding: number;
      };
    };
    tooltip: {
      callbacks: {
        label: (tooltipItem: TooltipItem<T>) => string;
      };
    };
  };
  scales?: {
    [key: string]: {
      grid: {
        display: boolean;
      };
      ticks: {
        padding: number;
        callback?: (tickValue: string | number) => string;
      };
    };
  };
}

const getChartOptions = ({
  chartType,
  isResponsive = true, 
  showChartTitle = false,
  chartTitle, 
  legendPosition = "bottom", 
  labelPadding = 20, 
  scalePadding = { x: 20, y: 20 }
}: GetChartOptionsProps): ChartOptionsType<ChartType> => {
  return {
    responsive: isResponsive,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: showChartTitle,
        text: chartTitle,
      },
      legend: {
        position: legendPosition,
        labels: {
          usePointStyle: true,
          padding: labelPadding,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<ChartType>) => `Value: ${tooltipItem.raw}`,
        },
      },
    },
    scales: chartType === 'doughnut' ? undefined : {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          padding: scalePadding.x,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          padding: scalePadding.y,
          callback: (tickValue: string | number) => tickValue.toString(),
        },
      },
    },
  };
};

export default getChartOptions;
