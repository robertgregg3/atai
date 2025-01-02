import { ComplexChartDataTypes } from "@components/charts/chart.types";

export const isComplexChartData = (data: unknown): data is ComplexChartDataTypes => {
    return (
      typeof data === "object" &&
      data !== null &&
      "ActualSavingsForCurrentYear" in data &&
      "ActualSavingsForYear" in data &&
      "ActualSavingsPerMonth" in data &&
      Array.isArray((data as ComplexChartDataTypes).ActualSavingsForCurrentYear) &&
      Array.isArray((data as ComplexChartDataTypes).ActualSavingsForYear) &&
      Array.isArray((data as ComplexChartDataTypes).ActualSavingsPerMonth) &&
      (data as ComplexChartDataTypes).ActualSavingsForCurrentYear.every(
        (item) => typeof item.key === "string" && typeof item.value === "number"
      ) &&
      (data as ComplexChartDataTypes).ActualSavingsForYear.every(
        (item) => typeof item.key === "string" && typeof item.value === "number"
      ) &&
      (data as ComplexChartDataTypes).ActualSavingsPerMonth.every(
        (item) => typeof item.key === "string" && typeof item.value === "number"
      )
    );
  }