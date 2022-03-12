import { useEffect } from "react";
import * as d3 from "d3";
import data from "../data/static-data.csv";

const StaticDataCsv = () => {
  useEffect(() => {
    d3.csv(data).then((data) => {
      return data;
    });
  }, []);
  return <div>StaticData</div>;
};

export default StaticDataCsv;
