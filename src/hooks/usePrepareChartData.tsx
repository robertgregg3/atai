import { useState, useEffect, useContext } from 'react';
import { StateContext } from '@context/StateProvider';
import { useMemo } from 'react';
import { ChartTitlesType, ComplexChartDataTypes, CsvDataProps, SavingsTotalType } from '@components';
import { getFormattedChartData } from '@utils';
import useGetSavingsTotals from './useGetSavingsTotals';


const savingsTotalLabels: SavingsTotalType[] = [
  "ActualSavingsForCurrentYear",
  "ActualSavingsForYear",
  "ActualSavingsPerMonth",
];

export interface PrepareChartDataProps {
  data: CsvDataProps[] | null;
  chartType: ChartTitlesType;
  showTopProducts?: boolean;
}

export const usePrepareChartData = (
    data: CsvDataProps[] | null,
    chartType: ChartTitlesType,
    showTopProducts: boolean = true,
    ) => {
    
    const { savingsTotals } = useGetSavingsTotals(data ?? []);
    const topProductsPercentage = useContext(StateContext).state.topProductsPercentage;

    // initialise chart data variables
    const [chartData, setChartData] = useState<ComplexChartDataTypes>({
      ActualSavingsForCurrentYear: [],
      ActualSavingsForYear: [],
      ActualSavingsPerMonth: []
    });

    // format the data when any of the dependencies change
    const formattedData = useMemo(() => data &&
      getFormattedChartData({chartType, data, showTopProducts, topProductsPercentage, savingsTotalLabels}), 
    [data, chartType, showTopProducts, savingsTotalLabels, topProductsPercentage]);
      
    // update the chart data when the formatted data changes
    useEffect(() => {
      setChartData({
        ActualSavingsForCurrentYear: formattedData?.ActualSavingsForCurrentYear ?? [],
        ActualSavingsForYear: formattedData?.ActualSavingsForYear ?? [],
        ActualSavingsPerMonth: formattedData?.ActualSavingsPerMonth ?? []
      });
    }, [formattedData]);

    return { chartData, savingsTotals };
}
