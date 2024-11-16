// Returns the keys or values for teh chart data
const formatChartData = (chartData, legend) => {
  let formattedChartData = [];

  return (formattedChartData = chartData?.map((data) => {
    return [
      ...formattedChartData,
      legend ? Object.keys(data) : Object.values(data),
    ];
  }));
};

export default formatChartData;
