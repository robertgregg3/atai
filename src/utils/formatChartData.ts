interface ChartDataProps {
  [key: string] : { key: string, value: number}[];
};

const formatChartData = ({chartData} :ChartDataProps) => {
    if (Array.isArray(chartData)) {
        return chartData.map((data) => data.value).map(Number);
    }
    return [];
};

export default formatChartData;
