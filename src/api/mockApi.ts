import { CsvDataProps } from "@components/charts";
import { parseCsvData } from "../data/dataService";
import csvFile from "../data/static-data.csv?raw";

export const fetchChartData = (): Promise<CsvDataProps[] | unknown> => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(parseCsvData(csvFile)); // Simulate API response
      }, 1000); // Simulate network delay
  });
};