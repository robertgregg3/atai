import { useEffect, useState, memo, useMemo } from "react";
import { ChartTitlesType, ComplexBarChartDataTypes, SavingsTotalsTypes, SavingsTotalType } from "@components/charts/chart.types";
import DoughnutChart from "@charts/DoughnutChart"
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSidebar from "@components/DashboardSidebar/DashboardSidebar";
import SavingsTotalsBarChart from "@components/charts/SavingsTotalsBarChart";
import SavingsCostCentreBarChart from "@charts/SavingsCostCentreBarChart";
import SavingsEnvironmentLineChart from "@components/charts/SavingsEnvironmentLineChart";
import prepareChartTotals from "@utils/prepareChartTotals";
import getFormattedChartData from "@utils/getFormattedChartData";
import "./dataVisualisation.css";

export enum ChartTypes {
  SAVINGS = "savings",
  COST = "cost",
  ENVIRONMENT =  "environment",
  PRODUCT =   "product"
}

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

export interface CsvDataProps {
  ActualSavingsForCurrentYear: string | number
  ActualSavingsForYear: string | number
  ActualSavingsPerMonth: string | number
  CostCenterTag: string | number,
  EnvironmentTag: string | number,
  ProductNameTag: string | number,
  [key: string]: string | number;
}

const initialState: ComplexBarChartDataTypes = {
  ActualSavingsForCurrentYear: [],
  ActualSavingsForYear: [],
  ActualSavingsPerMonth: []
};
interface DataVisProps {
  data: CsvDataProps[];
}

// pulling in the data for the dashboard
// formatting the data
// displaying with teh data
export const DataVisualisation: React.FC<DataVisProps> = memo(({ data } : DataVisProps) => {

  // used for the Savings Bar Chart
  // formatted with formatSavingsTotalData
  const [barChartData, setBarChartData] = useState<number[]>([]);

  // used for the Cost Centre, Environment and Product charts
  // formatted with formatChartData
  const [complexChartData, setComplexChartData] = useState<ComplexBarChartDataTypes>({
    ActualSavingsForCurrentYear: [],
    ActualSavingsForYear: [],
    ActualSavingsPerMonth: []
  });

  // used for the doughnut chart as it has totals displayed
  const [savingsTotals, setSavingsTotals] = useState<SavingsTotalsTypes>({
    ActualSavingsForCurrentYear: 0,
    ActualSavingsForYear: 0,
    ActualSavingsPerMonth: 0
  });
  
  // used to switch between the different charts, triggered by the sidebar
  // component which either calls formatSavingsTotalData or formatChartData
  const [selectedChart, setSelectedChart] = useState<ChartTitlesType>("savings");
  const [triggerAnimation, setTriggerAnimation] = useState<boolean>(false);
  const chartTitle = useMemo(() => chartTitles[selectedChart], [selectedChart]);
  
  // formats the data
  useEffect(() => {
    if (data) {
      const totals = data[data.length -1]
      const savingsCurtrentYear = String(totals.ActualSavingsForCurrentYear).trim().replace(/[^0-9.-]+/g, "");
      const savingsYear = String(totals.ActualSavingsForYear).trim().replace(/[^0-9.-]+/g, "");
      const savingsMonth = String(totals.ActualSavingsPerMonth).trim().replace(/[^0-9.-]+/g, "")

      formatSavingsTotalData();

      setSavingsTotals({
        ActualSavingsForCurrentYear: parseFloat(savingsCurtrentYear),
        ActualSavingsForYear: parseFloat(savingsYear),
        ActualSavingsPerMonth: parseFloat(savingsMonth)
      })
    }
  }, [data]);

  // TODO: abstract into a hook
  const formatSavingsTotalData = () => {
    const chartTotals = prepareChartTotals(data);

    if(chartTotals) {
      setBarChartData([
        chartTotals[0] ?? 0,
        chartTotals[1] ?? 0,
        chartTotals[2] ?? 0
      ]);
    }
    
    setSelectedChart("savings");
  };

  const formatChartData = (
    chartType: ChartTitlesType, 
    useOthersPercentage = false
  ) => {
    const formattedData = getFormattedChartData(chartType, data, useOthersPercentage, savingsTotalLabels);

    setComplexChartData({
      ActualSavingsForCurrentYear: formattedData.ActualSavingsForCurrentYear ?? [],
      ActualSavingsForYear: formattedData.ActualSavingsForYear ?? [],
      ActualSavingsPerMonth: formattedData.ActualSavingsPerMonth ?? []
    });
    setSelectedChart(chartType);
    setTriggerAnimation((prev) => !prev);
  };

  return (
    <div className="App">
      <DashboardSidebar
        handleSavingsTotals={() => formatSavingsTotalData()}
        handleCostCentreSavings={() => formatChartData("cost")}
        handleEnvironmentData={() => formatChartData("environment")}
        handleProductSavingsData={() => formatChartData("product", true)}
      />
      <div className="data-area">
        <DashboardHeader chartTitle={chartTitle} />
        <div className="chart-container">
          {selectedChart === "savings" && <SavingsTotalsBarChart chartData={barChartData} />}
          {selectedChart === "cost" && <SavingsCostCentreBarChart chartData={complexChartData} />}
          {selectedChart === "environment" && <SavingsEnvironmentLineChart chartData={complexChartData} /> }
          {selectedChart === "product" && (
            <DoughnutChart
              chartData={complexChartData}
              savingsTotals={savingsTotals}
              triggerAnimation={triggerAnimation} // Pass the state
              setTriggerAnimation={setTriggerAnimation}
            />
          )}
        </div>
      </div>
    </div>
  );
});
