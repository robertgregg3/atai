export interface CsvDataProps {
  ActualSavingsForCurrentYear: string | number
  ActualSavingsForYear: string | number
  ActualSavingsPerMonth: string | number
  CostCenterTag: string | number,
  EnvironmentTag: string | number,
  ProductNameTag: string | number,
  [key: string]: string | number;
}
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

export enum ChartTypes {
  SAVINGS = "savings",
  COST = "cost",
  ENVIRONMENT =  "environment",
  PRODUCT =   "product"
}

export interface ChartProps {
  data: number[][] | number[] | null;
  type?: ChartType;
  labels?: string[];
  isComplex?: boolean;
}

export interface FormattedChartProps {
  currentYear: number[];
  year: number[];
  month: number[];
}

export type chartFilters = 'currentYear' | 'year' | 'month';

export type ChartType = | "bar" | "doughnut" | "line";