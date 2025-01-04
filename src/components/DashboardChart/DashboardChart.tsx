import { useContext, useMemo } from "react";
import { usePrepareChartData } from "@hooks";
import { Chart, AdvancedChart, FormattedChartProps} from "@components/charts";
import { formatChartLabels, formatChartData, prepareChartTotals } from "@utils";
import { StateContext } from "@context/StateProvider";

interface DashboardChartProps {
    selectedChart: string
}

/*
  There are three types of charts:
    1. Simple chart
    2. Complex chart with multiple datasets
    3. Advancec chart with options to filter the data
*/

export const DashboardChart = ({ selectedChart }:  DashboardChartProps) => {
    const { showTopProducts, data } = useContext(StateContext).state;

    // hooks to format the various chart data
    const simpleBarChartData = useMemo(() => prepareChartTotals(data), [data]) ?? [0,0,0];
    const { chartData: costData } = usePrepareChartData( data, 'cost', false);
    const { chartData: environmentData } = usePrepareChartData(data, 'environment', false);
    const { chartData: productData, savingsTotals } = usePrepareChartData(data, 'product', showTopProducts);
  
    // formatting the labels for the charts
    const costChartLabels = formatChartLabels({ chartData: costData.ActualSavingsForCurrentYear });
    const environmentChartLabels = formatChartLabels({ chartData: environmentData.ActualSavingsForCurrentYear });
    const productChartLabels: string[] = formatChartLabels({chartData: productData.ActualSavingsForCurrentYear });
  
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

    const formattedProductData: FormattedChartProps = {
      'currentYear': formatChartData({ chartData: productData.ActualSavingsForCurrentYear }),
      'year': formatChartData({ chartData: productData.ActualSavingsForYear }),
      'month': formatChartData({ chartData: productData.ActualSavingsPerMonth }),
    }

    return (
        <div className="data-area">
        {selectedChart === "savings" && <Chart data={simpleBarChartData} isComplex={false} />}
        {selectedChart === "cost" && <Chart data={formattedCostData} labels={costChartLabels} />}
        {selectedChart === "environment" && <Chart data={formattedEnvironmentData} type="line" labels={environmentChartLabels} />} 
        {selectedChart === "product" && <AdvancedChart chartData={formattedProductData} savingsTotals={savingsTotals} labels={productChartLabels} />}
      </div>
    )
}