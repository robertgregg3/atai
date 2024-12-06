import { useState, memo, useMemo, useContext, } from "react";
import { ChartTitlesType, CsvDataProps } from "@components/charts/chart.types";
import { StateContext } from "@context/StateProvider";
import DoughnutChart from "@charts/DoughnutChart"
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSidebar from "@components/DashboardSidebar/DashboardSidebar";
import SavingsTotalsBarChart from "@components/charts/SavingsTotalsBarChart";
import ComplexChart from "@components/charts/ComplexChart";
import useSimpleBarChartData from "@hooks/useSimpleBarChartData";
import useComplexChartData from "@hooks/useComplexChartData";
import "./dataVisualisation.css";
import prepareChartTotals from "@utils/prepareChartTotals";

const chartTitles: Record<ChartTitlesType, string> = {
  "savings": "Total Savings Bar Chart",
  "cost": "Cost Savings Bar Chart",
  "environment": "Environment Savings Bar Chart",
  "product": "Product Savings Doughnut Chart",
};

interface DataVisProps {
  data: CsvDataProps[];
}

// pulling in the data for the dashboard, formatting the data, displaying with the data
export const DataVisualisation: React.FC<DataVisProps> = memo(({ data } : DataVisProps) => {
  const { state } = useContext(StateContext);
  const { showTopProducts } = state;

  // hooks to format the various chart data
  const simpleBarChartData = useMemo(() => prepareChartTotals(data), [data]) ?? [0,0,0];
  const { chartData: costData } = useComplexChartData( data, 'cost', false);
  const { chartData: environmentData } = useComplexChartData(data, 'environment', false);
  const { chartData: productData, savingsTotals } = useComplexChartData(data, 'product', showTopProducts);

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
      <DashboardHeader title={chartTitle} />
      <div className="data-area">
        {selectedChart === "savings" && <SavingsTotalsBarChart data={simpleBarChartData} />}
        {selectedChart === "cost" && <ComplexChart data={costData} type="bar" />}
        {selectedChart === "environment" && <ComplexChart data={environmentData} type="line" /> } 
        {selectedChart === "product" && <DoughnutChart chartData={productData} savingsTotals={savingsTotals} />}
        </div>
    </div>
  );
});
