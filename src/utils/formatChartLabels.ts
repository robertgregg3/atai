interface ChartDataProps {
  chartData:  { key: string; value: number; }[];
}

const formatChartLabels = ({chartData} :ChartDataProps) => {
    if (Array.isArray(chartData)) {
        return chartData.map((data) => data.key);
    }
    return [];
};

export default formatChartLabels;