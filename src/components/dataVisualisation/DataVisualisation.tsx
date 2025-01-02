import { useState, memo, useMemo, useContext, } from "react";
import { ChartTitlesType } from "@components/charts/chart.types";
import { StateContext } from "@context/StateProvider";
import { Chart, DoughnutChart} from "@components/charts";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSidebar from "@components/DashboardSidebar/DashboardSidebar";
import usePrepareChartData from "@hooks/usePrepareChartData";
import prepareChartTotals from "@utils/prepareChartTotals";
import "./dataVisualisation.css";
import formatChartLabels from "@utils/formatChartLabels";
import formatChartData from "@utils/formatChartData";

const chartTitles: Record<ChartTitlesType, string> = {
  "savings": "Total Savings Bar Chart",
  "cost": "Cost Savings Bar Chart",
  "environment": "Environment Savings Bar Chart",
  "product": "Product Savings Doughnut Chart",
};

// pulling in the data for the dashboard, formatting the data, displaying with the data
export const DataVisualisation = memo(() => {
  const { showTopProducts, data, displayName, sidebarOpen } = useContext(StateContext).state;

  // hooks to format the various chart data
  const simpleBarChartData = useMemo(() => prepareChartTotals(data), [data]) ?? [0,0,0];
  const { chartData: costData } = usePrepareChartData( data, 'cost', false);
  const { chartData: environmentData } = usePrepareChartData(data, 'environment', false);
  const { chartData: productData, savingsTotals } = usePrepareChartData(data, 'product', showTopProducts);

  // formatting the labels for the charts
  const costChartLabels = formatChartLabels({ chartData: costData.ActualSavingsForCurrentYear });
  const environmentChartLabels = formatChartLabels({ chartData: environmentData.ActualSavingsForCurrentYear });

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
  const [selectedChart, setSelectedChart] = useState<ChartTitlesType>(() => "product");
  const chartTitle = useMemo(() => chartTitles[selectedChart], [selectedChart]);

  return (
    <div className="App">
      <DashboardSidebar
        handleSavingsTotals={() => setSelectedChart('savings')}
        handleCostCentreSavings={() => setSelectedChart("cost")}
        handleEnvironmentData={() => setSelectedChart("environment")}
        handleProductSavingsData={() => setSelectedChart("product")}
      />
      <DashboardHeader title={chartTitle} displayName={displayName} />
      <div className="data-area">
        {/* {selectedChart === "savings" && <SavingsTotalsBarChart data={simpleBarChartData} />} */}
        {selectedChart === "savings" && <Chart data={simpleBarChartData} type='bar' labels={[""]} />}
        {selectedChart === "cost" && <Chart data={formattedCostData} type="bar" labels={costChartLabels}  />}
        {selectedChart === "environment" && <Chart data={formattedEnvironmentData} type="line" labels={environmentChartLabels} /> } 
        {selectedChart === "product" && <DoughnutChart chartData={productData} savingsTotals={savingsTotals} />}
        </div>
    </div>
  );
});
