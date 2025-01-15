export interface ChartDataProps {
  [key: string] : { key: string, value: number}[];
};

export const formatChartData = ({chartData} :ChartDataProps) => {
    if (Array.isArray(chartData)) {
        return chartData.map((data) => data.value).map(Number);
    }
    return [];
};
