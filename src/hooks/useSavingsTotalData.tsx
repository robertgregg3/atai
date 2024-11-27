import { CsvDataProps } from '@components/dataVisualisation/DataVisualisation';
import { useState } from 'react'
import prepareChartTotals from '@utils/prepareChartTotals';

const useSavingsTotalData = (data: CsvDataProps[]) => {
    const [ barChartData, setBarChartData ] = useState<number[]>([]);
    // const [ selectedChart, setSelectedChart ] = useState<string>("savings");
    const selectedChart = "savings";

    const chartTotals = prepareChartTotals(data) ?? [0, 0, 0];

    if(chartTotals) {
        setBarChartData([
        chartTotals[0] ?? 0,
        chartTotals[1] ?? 0,
        chartTotals[2] ?? 0
        ]);
    }
    
    return { barChartData, selectedChart }  
}

export default useSavingsTotalData