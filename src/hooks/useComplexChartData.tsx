import { useState, useEffect, useContext } from 'react';
import { ChartTitlesType, ComplexChartDataTypes, CsvDataProps, SavingsTotalType } from '@components/charts/chart.types';
import getFormattedChartData from '@utils/getFormattedChartData';
import useGetSavingsTotals from './useGetSavingsTotals';
import { StateContext } from '@context/StateProvider';

const useComplexChartData = (
    data: CsvDataProps[],
    chartType: ChartTitlesType,
    useOthersPercentage: boolean,
    savingsTotalLabels: SavingsTotalType[]
    ) => {
    const { savingsTotals } = useGetSavingsTotals(data);
    const { state } = useContext(StateContext);
    const { othersPercentage } = state;

    const [chartData, setChartData] = useState<ComplexChartDataTypes>({
        ActualSavingsForCurrentYear: [],
        ActualSavingsForYear: [],
        ActualSavingsPerMonth: []
      });

      useEffect(() => {
          const formattedData = getFormattedChartData({chartType, data, useOthersPercentage, othersPercentage, savingsTotalLabels});
          setChartData({
              ActualSavingsForCurrentYear: formattedData.ActualSavingsForCurrentYear ?? [],
              ActualSavingsForYear: formattedData.ActualSavingsForYear ?? [],
              ActualSavingsPerMonth: formattedData.ActualSavingsPerMonth ?? []
          });
      }, [data, chartType, useOthersPercentage, savingsTotalLabels, othersPercentage]);

    return { chartData, savingsTotals };
}

export default useComplexChartData;