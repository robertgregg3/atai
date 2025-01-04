import { useContext, useMemo } from "react";
import { usePrepareChartData } from "@hooks";
import { Chart, DoughnutChart} from "@components/charts";
import { formatChartLabels, formatChartData, prepareChartTotals, chartTitles } from "@utils";
import { StateContext } from "@context/StateProvider";

interface DashboardChartProps {
    selectedChart: string
}

export const DashboardChart = ({ selectedChart }:  DashboardChartProps) => {
    const { showTopProducts, data, sidebarOpen } = useContext(StateContext).state;

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

    return (
        <div className="data-area">
        {selectedChart === "savings" && <Chart data={simpleBarChartData} isComplex={false} sidebarOpen={sidebarOpen} />}
        {selectedChart === "cost" && <Chart data={formattedCostData} labels={costChartLabels} sidebarOpen={sidebarOpen} />}
        {selectedChart === "environment" && <Chart data={formattedEnvironmentData} type="line" labels={environmentChartLabels} sidebarOpen={sidebarOpen} />} 
        {selectedChart === "product" && <DoughnutChart chartData={productData} savingsTotals={savingsTotals} sidebarOpen={sidebarOpen} />}
      </div>
    )
}