export interface SavingsTotalsTypes {
    ActualSavingsForCurrentYear: string | number;
    ActualSavingsForYear: string | number;
    ActualSavingsPerMonth: string | number;
  }
  
  export interface ComplexChartDataTypes {
    ActualSavingsForCurrentYear: { key: string, value: number}[];
    ActualSavingsForYear: { key: string, value: number}[];
    ActualSavingsPerMonth: { key: string, value: number}[];
  }

export type ChartTitlesType = | "savings" | "cost" | "environment" | "product";
export type SavingsTotalType = | "ActualSavingsForCurrentYear" | "ActualSavingsForYear" | "ActualSavingsPerMonth";

export type ChartType = | "bar" | "doughnut" | "line";