import { useState, memo, useMemo } from "react";
import { ChartTitlesType, CsvDataProps, SavingsTotalType } from "@components/charts/chart.types";
import DoughnutChart from "@charts/DoughnutChart"
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSidebar from "@components/DashboardSidebar/DashboardSidebar";
import SavingsTotalsBarChart from "@components/charts/SavingsTotalsBarChart";
import ComplexChart from "@components/charts/ComplexChart";
import useSimpleBarChartData from "@hooks/useSimpleBarChartData";
import useComplexChartData from "@hooks/useComplexChartData";
import "./dataVisualisation.css";


const chartTitles: Record<ChartTitlesType, string> = {
  "savings": "Total Savings Bar Chart",
  "cost": "Cost Savings Bar Chart",
  "environment": "Environment Savings Bar Chart",
  "product": "Product Savings Doughnut Chart",
};

const savingsTotalLabels:SavingsTotalType[] = [
  "ActualSavingsForCurrentYear",
  "ActualSavingsForYear",
  "ActualSavingsPerMonth",
];

interface DataVisProps {
  data: CsvDataProps[];
}

// pulling in the data for the dashboard, formatting the data, displaying with the data
export const DataVisualisation: React.FC<DataVisProps> = memo(({ data } : DataVisProps) => {

  // hooks to format the various chart data
  const { barChartData } = useSimpleBarChartData(data);
  const { complexChartData: costData } = useComplexChartData( data, 'cost', false, savingsTotalLabels);
  const { complexChartData: environmentData } = useComplexChartData(data, 'environment', false, savingsTotalLabels);
  const { complexChartData: productData, savingsTotals } = useComplexChartData(data, 'product', true, savingsTotalLabels);

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
      <div className="data-area">
        <DashboardHeader chartTitle={chartTitle} />
          {selectedChart === "savings" && <SavingsTotalsBarChart data={barChartData} />}
          {selectedChart === "cost" && <ComplexChart data={costData} type="bar" />}
          {selectedChart === "environment" && <ComplexChart data={environmentData} type="line" /> } 
          {selectedChart === "product" && <DoughnutChart chartData={productData} savingsTotals={savingsTotals} />}
        </div>
    </div>
  );
});
