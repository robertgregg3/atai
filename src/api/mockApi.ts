import { CsvDataProps } from "@components/DataCharts";
import { parseCsvData } from "../data/dataService";
import csvFile from "../data/static-data.csv?raw";

export const fetchChartData = (): Promise<CsvDataProps[] | unknown> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(parseCsvData(csvFile)); // Simulate API response
      } catch (error) {
        reject(new Error("Parsing failed")); // Reject the promise if an error occurs
      }
    }, 1000); // Simulate network delay
  });
};