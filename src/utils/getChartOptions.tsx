import { ChartType } from "@components/charts/chart.types";
import { TooltipItem } from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";

interface GetChartOptionsProps {
  chartType: ChartType;
  isResponsive?: boolean;
  showChartTitle?: boolean;
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
    };
    legend: {
      position: | "bottom" | "left" | "right" | "top" | "center" | "chartArea" | _DeepPartialObject<{ [scaleId: string]: number; }> | undefined
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
  scales: {
    x: {
      grid: {
        display: boolean;
      };
      ticks: {
        padding: number;
      };
    };
    y: {
      grid: {
        drawBorder: boolean;
      };
      ticks: {
        padding: number;
        callback: (tickValue: string | number) => string;
      };
    };
  };
}

const getChartOptions = ({
  chartType,
  isResponsive = true, // should be default and option to change
  showChartTitle = false, // should be default and option to change
  legendPosition = "bottom", // should be default and option to change
  labelPadding = 20, // should be default and option to change
  scalePadding = { x: 20, y: 20} // should be default and option to change
}: GetChartOptionsProps) => {
  
  const chartOptions: ChartOptionsType<typeof chartType> = {
    responsive: isResponsive,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: showChartTitle,
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
          label: function (tooltipItem: TooltipItem<typeof chartType>) {
            let label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw as number;

            if (label) {
              label += `: ${value}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide the x-axis grid lines
        },
        ticks: {
          padding: scalePadding.x, // Adds padding between x-axis labels and chart content
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          padding: scalePadding.y, // Adds padding between y-axis labels and chart content
          callback: function (tickValue: string | number) {
            const value = tickValue.toString().split(/(?=(?:...)*$)/).join(",");
            return "$" + value;
          },
        },
      },
    },
  };
    
  return { chartOptions}
}

export default getChartOptions