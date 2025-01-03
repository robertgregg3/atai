interface ChartDataProps {
  chartData:  { key: string; value: number; }[];
}

export const formatChartLabels = ({chartData} :ChartDataProps) => {
    if (Array.isArray(chartData)) {
        return chartData.map((data) => data.key);
    }
    return [];
};
