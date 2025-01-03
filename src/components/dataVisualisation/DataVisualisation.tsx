import { useState, useMemo, useContext, useCallback, } from "react";
import { StateContext } from "@context/StateProvider";
import { Chart, DoughnutChart} from "@components/charts";
import { DashboardHeader, DashboardSidebar, type ChartTitlesType } from "@components";
import { formatChartLabels, formatChartData, prepareChartTotals, chartTitles } from "@utils";
import { usePrepareChartData } from "@hooks";
import "./dataVisualisation.css";

// pulling in the data for the dashboard, formatting the data, displaying with the data
export const DataVisualisation = () => {
  const { showTopProducts, data, displayName } = useContext(StateContext).state;

  // hooks to format the various chart data
  const simpleBarChartData = useMemo(() => prepareChartTotals(data), [data]) ?? [0,0,0];
  const { chartData: costData } = usePrepareChartData( data, 'cost', false);
  const { chartData: environmentData } = usePrepareChartData(data, 'environment', false);
  const { chartData: productData, savingsTotals } = usePrepareChartData(data, 'product', showTopProducts);

  // formatting the labels for the charts
  const costChartLabels = formatChartLabels({ chartData: costData.ActualSavingsForCurrentYear });
  const environmentChartLabels = formatChartLabels({ chartData: environmentData.ActualSavingsForCurrentYear });

  // formatting the data for the charts to just an array of values rather than an array of objects
  const formattedCostData: number[][] = [
    formatChartData({ chartData: costData.ActualSavingsForCurrentYear}),
    formatChartData({ chartData: costData.ActualSavingsForYear }),
    formatChartData({ chartData: costData.ActualSavingsPerMonth }),
  ];

  const formattedEnvironmentData: number[][] = [
    formatChartData({ chartData: environmentData.ActualSavingsForCurrentYear}),
    formatChartData({ chartData: environmentData.ActualSavingsForYear }),
    formatChartData({ chartData: environmentData.ActualSavingsPerMonth }),
  ];

  // used to switch between the different charts, triggered by the sidebar
  const [selectedChart, setSelectedChart] = useState<ChartTitlesType>("cost");
  const chartTitle = useMemo(() => chartTitles[selectedChart], [selectedChart]);
  
  const handleChartSelection = useCallback((chart: ChartTitlesType) => {
    setSelectedChart(chart);
  },[])

  return (
    <div className="App">
      <DashboardSidebar
        handleSavingsTotals={() => handleChartSelection('savings')}
        handleCostCentreSavings={() => handleChartSelection("cost")}
        handleEnvironmentData={() => handleChartSelection("environment")}
        handleProductSavingsData={() => handleChartSelection("product")}
      />
      <DashboardHeader title={chartTitle} displayName={displayName} />
      <div className="data-area">
        {selectedChart === "savings" && <Chart data={simpleBarChartData} type='bar' labels={[""]} isComplex={false} />}
        {selectedChart === "cost" && <Chart data={formattedCostData} type="bar" labels={costChartLabels}  isComplex={true} />}
        {selectedChart === "environment" && <Chart data={formattedEnvironmentData} type="line" labels={environmentChartLabels} isComplex={true} />} 
        {selectedChart === "product" && <DoughnutChart chartData={productData} savingsTotals={savingsTotals} />}
        </div>
    </div>
  );
};
