import Papa from "papaparse";

export const parseCsvData = (csvData: any) => Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
}).data;