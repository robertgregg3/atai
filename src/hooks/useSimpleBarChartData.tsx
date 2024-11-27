import { useMemo } from 'react';
import { CsvDataProps } from '@components/dataVisualisation/DataVisualisation';
import prepareChartTotals from '@utils/prepareChartTotals';

const useSimpleBarChartData = (data: CsvDataProps[]) => {
    const chartTotals = useMemo(() => prepareChartTotals(data) ?? [0, 0, 0], [data]);

    const barChartData = useMemo(() => [
        chartTotals[0] ?? 0,
        chartTotals[1] ?? 0,
        chartTotals[2] ?? 0,
    ], [chartTotals]);

    return { barChartData };
}

export default useSimpleBarChartData;