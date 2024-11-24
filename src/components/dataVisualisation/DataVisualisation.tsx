import { useEffect, useState, useRef, memo } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DoughnutChart from "@charts/DoughnutChart"
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import SavingsTotalsBarChart from "@components/charts/SavingsTotalsBarChart";
import SavingsCostCentreBarChart from "@charts/SavingsCostCentreBarChart";
import SavingsEnvironmentLineChart from "@components/charts/SavingsEnvironmentLineChart";
import prepareChartTotals from "@utils/prepareChartTotals";
import getFormattedChartData from "@utils/getFormattedChartData";
import "./dataVisualisation.css";

const chartTitles = {
  "savings-total": "Total Savings Bar Chart",
  "cost-savings": "Cost Savings Bar Chart",
  "environment-savings": "Environment Savings Bar Chart",
  "product-savings": "Product Savings Doughnut Chart",
};

export type ChartTitlesType = | "savings-total" | "cost-savings" | "environment-savings" | "product-savings";
export type SavingsTotalTypes = | "ActualSavingsForCurrentYear" | "ActualSavingsForYear" | "ActualSavingsPerMonth";

const savingsTotalLabels:SavingsTotalTypes[] = [
  "ActualSavingsForCurrentYear",
  "ActualSavingsForYear",
  "ActualSavingsPerMonth",
];

export type CsvDataProps = Partial<{
  ActualSavingsForCurrentYear: string | number
  ActualSavingsForYear: string | number
  ActualSavingsPerMonth: string | number
  CostCenterTag: string | number,
  EnvironmentTag: string | number,
  ProductNameTag: string | number,
  [key: string]: string | number;
}>;

interface DataVisualisationProps {
  data: CsvDataProps[];
}

export interface SavingsTotals {
  ActualSavingsForCurrentYear: string | number;
  ActualSavingsForYear: string | number;
  ActualSavingsPerMonth: string | number;
}

export interface ComplexBarChartDataProps {
  ActualSavingsForCurrentYear: { key: string, value: number}[];
  ActualSavingsForYear: { key: string, value: number}[];
  ActualSavingsPerMonth: { key: string, value: number}[];
}

const initialState: ComplexBarChartDataProps = {
  ActualSavingsForCurrentYear: [],
  ActualSavingsForYear: [],
  ActualSavingsPerMonth: []
};

export const DataVisualisation: React.FC<DataVisualisationProps> = memo(({ data } : DataVisualisationProps) => {
  const [barChartData, setBarChartData] = useState<number[]>([]);
  const [complexChartData, setComplexChartData] = useState<ComplexBarChartDataProps>(initialState);
  const [chartTitle, setChartTitle] = useState<string>("");
  const [savingsTotals, setSavingsTotals] = useState<SavingsTotals>({
    ActualSavingsForCurrentYear: 0,
    ActualSavingsForYear: 0,
    ActualSavingsPerMonth: 0
  });

  const exportSavingsTotalsRef = useRef<HTMLDivElement>(null);
  const exportCostCenterTotalRef = useRef<HTMLDivElement>(null);
  const exportEnvironmentTotalRef = useRef<HTMLDivElement>(null);
  const productTotalRef = useRef<HTMLDivElement>(null);

  const [selectedChart, setSelectedChart] = useState<ChartTitlesType>("savings-total");
  const [triggerAnimation, setTriggerAnimation] = useState<boolean>(false);

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

  const formatSavingsTotalData = () => {
    const chartTotals = prepareChartTotals(data);
    if(chartTotals) {
      setBarChartData([
        chartTotals[0] ?? 0,
        chartTotals[1] ?? 0,
        chartTotals[2] ?? 0
      ]);
    }
    setSelectedChart("savings-total");
  };

  // Update chart title when the chart is updated
  useEffect(() => {
    return setChartTitle(chartTitles[selectedChart]);
  }, [selectedChart]);

  const formatChartData = (
    chartType: ChartTitlesType, 
    labelKey: string,  
    useOthersPercentage = false
  ) => {
    const formattedData = getFormattedChartData(labelKey, data, useOthersPercentage, savingsTotalLabels);
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
      <Sidebar
        handleSavingsTotals={() => formatSavingsTotalData()}
        handleCostCentreSavings={() =>
          formatChartData("cost-savings", "CostCenterTag", false)
        }
        handleEnvironmentData={() =>
          formatChartData("environment-savings", "EnvironmentTag", false)
        }
        handleProductSavingsData={() =>
          formatChartData("product-savings", "ProductNameTag", true)
        }
      />
      <div className="data-area">
        <DashboardHeader chartTitle={chartTitle} />
        <div className="chart-container">
          <div ref={exportSavingsTotalsRef}>
            {selectedChart === "savings-total" && (
              <SavingsTotalsBarChart
                chartData={barChartData}
                exportRef={exportSavingsTotalsRef.current}
              />
            )}
          </div>
          <div ref={exportCostCenterTotalRef}>
            {selectedChart === "cost-savings" && (
              <SavingsCostCentreBarChart
                chartData={complexChartData}
                exportRef={exportCostCenterTotalRef.current}
              />
            )}
          </div>
          <div ref={exportEnvironmentTotalRef}>
            {selectedChart === "environment-savings" && (
              <SavingsEnvironmentLineChart
                chartData={complexChartData}
                exportRef={exportEnvironmentTotalRef.current}
              />
            )}
          </div>
          <div ref={productTotalRef}>
            {selectedChart === "product-savings" && (
              <DoughnutChart
                chartData={complexChartData}
                savingsTotals={savingsTotals}
                exportRef={productTotalRef.current}
                triggerAnimation={triggerAnimation} // Pass the state
                setTriggerAnimation={setTriggerAnimation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
