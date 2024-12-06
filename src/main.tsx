import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StateProvider } from "./context/StateProvider.js";
import App from './App';
import csvFile from "./data/static-data.csv?raw";
import Papa from "papaparse";
import "./App.css";

const parsedCsvData = (csvData: any) => Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
}).data;

const initialData = parsedCsvData(csvFile)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <StateProvider initialData={initialData}>
      <App />
    </StateProvider>
  </StrictMode>,
)
