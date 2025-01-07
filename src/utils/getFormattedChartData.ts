import { type ChartTitlesType, type CsvDataProps, type SavingsTotalType } from "@components";

export enum ChartTypes {
  SAVINGS = "savings",
  COST = "cost",
  ENVIRONMENT =  "environment",
  PRODUCT =   "product"
}
const labelKeyMap = new Map<ChartTitlesType, string>([
  [ChartTypes.SAVINGS, ''],
  [ChartTypes.COST, 'CostCenterTag'],
  [ChartTypes.ENVIRONMENT, 'EnvironmentTag'],
  [ChartTypes.PRODUCT, 'ProductNameTag']
])

const mapLabelKeys = (labelKey: ChartTitlesType) => {
  return labelKeyMap.get(labelKey)
}

interface GetFormattedChartDataProps {
  chartType: ChartTitlesType;
  data: CsvDataProps[];
  showTopProducts?: boolean;
  topProductsPercentage?: number;
  savingsTotalLabels: SavingsTotalType[];
}
export const getFormattedChartData = ({
  chartType,
  data,
  showTopProducts = false,
  topProductsPercentage = 1,
  savingsTotalLabels,
}: GetFormattedChartDataProps) => {
  const labelKey = mapLabelKeys(chartType) ?? '';
  
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
        if (showTopProducts) overallTotal += cleanedValue;

        totalsByTag[item[labelKey]] =
          (totalsByTag[item[labelKey]] || 0) + cleanedValue;
      }
    });

    // Convert totalsByTag into an array
    let formattedArray = Object.entries(totalsByTag).map(([tag, total]) => {
      return {
        key: tag,
        value: parseFloat(total.toFixed(2)),
      }
    });

    if (showTopProducts) {
      const maxAmountToOther = (overallTotal / 100) * (topProductsPercentage / 2);
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

    // one item has an empty key which is the total, remove it
    newChartData[label] = formattedArray.filter(( item ) => item.key !== '');
  });

  return newChartData;
};
