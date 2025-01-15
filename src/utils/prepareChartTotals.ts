import { CsvDataProps } from "@components";

export const prepareChartTotals = (data: CsvDataProps[] | null ): number[] | undefined => {
  if (data) {
    const savingsTotalsRow = data[data.length - 1];
    // create an array of the totals
    const savingsTotals = [
      savingsTotalsRow.ActualSavingsForCurrentYear,
      savingsTotalsRow.ActualSavingsForYear,
      savingsTotalsRow.ActualSavingsPerMonth,
    ];

    return savingsTotals.map((t) => typeof t === 'string' ? parseFloat(t.replace(/\$|-|,/g, "")) : t);
  }

  return;
};
