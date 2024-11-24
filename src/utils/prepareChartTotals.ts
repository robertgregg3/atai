import { CsvDataProps } from "@components/dataVisualisation/DataVisualisation";

const prepareChartTotals = (data: CsvDataProps[] ) => {
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

export default prepareChartTotals;
