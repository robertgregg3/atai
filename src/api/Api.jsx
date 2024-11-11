import axios from "axios";
import * as d3 from "d3";
import staticData from "./static-data.csv";

const ATAI_DATA_URL = "";

export const getAtainrData = async () => {
  return await axios.get(ATAI_DATA_URL);
};

export const getAtainrDataFromCsv = () => {
  let data = [];
  d3.csv(staticData).then((staticData) => {
    data = staticData;
    console.log(data);
  });
  return data;
};
