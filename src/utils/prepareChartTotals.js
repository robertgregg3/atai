const prepareChartTotals = (data) => {
  if (data) {
    const savingsTotalsRow = data[data.length - 1];
    // create an array of the totals
    const savingsTotals = [
      savingsTotalsRow.ActualSavingsForCurrentYear,
      savingsTotalsRow.ActualSavingsForYear,
      savingsTotalsRow.ActualSavingsPerMonth,
    ];

    return savingsTotals.map((t) => parseFloat(t.replace(/\$|-|,/g, "")));
  }

  return;
};

export default prepareChartTotals;
