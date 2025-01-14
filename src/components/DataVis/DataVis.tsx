import { useState, useMemo, useContext, useCallback, } from "react";
import { StateContext } from "@context/StateProvider";
import { DashboardHeader, DashboardSidebar, DashboardChart, type ChartTitlesType } from "@components";
import { chartTitles } from "@utils";
import "./DataVis.css";

// pulling in the data for the dashboard, formatting the data, displaying with the data
export const DataVis = () => {
  const { displayName } = useContext(StateContext).state;

  // used to switch between the different charts, triggered by the sidebar
  const [selectedChart, setSelectedChart] = useState<ChartTitlesType>("product");
  const chartTitle = useMemo(() => chartTitles[selectedChart], [selectedChart]);
  
  const handleChartSelection = useCallback((chart: ChartTitlesType) =>  setSelectedChart(chart),[])

  return (
    <div className="App">
      <DashboardSidebar
        handleSavingsTotals={() => handleChartSelection('savings')}
        handleCostCentreSavings={() => handleChartSelection("cost")}
        handleEnvironmentData={() => handleChartSelection("environment")}
        handleProductSavingsData={() => handleChartSelection("product")}
      />
      <DashboardHeader title={chartTitle} displayName={displayName} />
      <DashboardChart selectedChart={selectedChart} />
    </div>
  );
};
