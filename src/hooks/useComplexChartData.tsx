import { useState, useEffect } from 'react';
import { ChartTitlesType, ComplexChartDataTypes, CsvDataProps, SavingsTotalType } from '@components/charts/chart.types';
import getFormattedChartData from '@utils/getFormattedChartData';
import useGetSavingsTotals from './useGetSavingsTotals';

const useComplexChartData = (
    data: CsvDataProps[],
    chartType: ChartTitlesType,
    useOthersPercentage: boolean,
    savingsTotalLabels: SavingsTotalType[]
    ) => {
    const { savingsTotals } = useGetSavingsTotals(data);

    const [chartData, setChartData] = useState<ComplexChartDataTypes>({
        ActualSavingsForCurrentYear: [],
        ActualSavingsForYear: [],
        ActualSavingsPerMonth: []
      });

      useEffect(() => {
          const formattedData = getFormattedChartData(chartType, data, useOthersPercentage, savingsTotalLabels);
          setChartData({
              ActualSavingsForCurrentYear: formattedData.ActualSavingsForCurrentYear ?? [],
              ActualSavingsForYear: formattedData.ActualSavingsForYear ?? [],
              ActualSavingsPerMonth: formattedData.ActualSavingsPerMonth ?? []
          });
      }, [data, chartType, useOthersPercentage, savingsTotalLabels]);

    return { chartData, savingsTotals };
}

export default useComplexChartData;