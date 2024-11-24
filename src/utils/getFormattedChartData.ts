import { ComplexBarChartDataProps, CsvDataProps, SavingsTotalTypes } from "@components/dataVisualisation/DataVisualisation";

const getFormatedChartData = (
  labelKey: string,
  data: CsvDataProps[],
  useOthersPercentage = false,
  savingsTotalLabels: SavingsTotalTypes[] 
): Partial<ComplexBarChartDataProps>  => {
  
  const newChartData: { [key: string]: { key: string; value: number; }[] } = {
    ActualSavingsForCurrentYear: [],
    ActualSavingsForYear: [],
    ActualSavingsPerMonth: [],
  };

  savingsTotalLabels.forEach((label) => {
    // Create a map to store totals by tag
    const totalsByTag: { [key: string]: number } = {};
    let overallTotal = 0;

    // Iterate over data and accumulate totals
    data.map((item: CsvDataProps) => {
      if (typeof item[labelKey] === 'string') {
        item[labelKey] = item[labelKey].trim();
        const cleanedValue = item[label] && typeof item[label] === 'string' ? 
        parseFloat(item[label].replace(/[^0-9.-]+/g, "")) || 0 : 0;
        if (useOthersPercentage) overallTotal += cleanedValue;

        totalsByTag[item[labelKey]] =
          (totalsByTag[item[labelKey]] || 0) + cleanedValue;
      }
    });

    // Convert totalsByTag into an array
    let formattedArray = Object.entries(totalsByTag).map(([tag, total]) => ({
      key: tag,
      value: parseFloat(total.toFixed(2)),
    }));

    if (useOthersPercentage) {
      const maxAmountToOther = (overallTotal / 100) * 2;
      let othersTotal = 0;

      formattedArray = formattedArray.filter(({ key, value }) => {
        if (value > maxAmountToOther) return true;
        othersTotal += value;
        return false;
      });

      if (othersTotal > 0) {
        formattedArray.push({
          key: "other",
          value: parseFloat(othersTotal.toFixed(2)),
        });
      }
    }

    newChartData[label] = formattedArray;
  });

  return newChartData;
};

export default getFormatedChartData;
