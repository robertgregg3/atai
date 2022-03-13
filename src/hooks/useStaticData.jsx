import { useEffect, useState } from "react";
import * as d3 from "d3";
import rawData  from "../api/static-data.csv";
import { useStateValue } from './../Context/StateProvider';

function useStaticDataCsv() {
  const [csvData, setCvsData] = useState([]);
  const [{user}, dispatch] = useStateValue();


  useEffect(() => {
    const fetchData = async () => {
      await d3.csv(rawData).then((rawData) => {
        setCvsData(rawData)
        dispatch({
          type: 'GET_DATA',
          data: rawData
        })
      });
    }
    fetchData();
  }, []);
  return csvData;
};

export default useStaticDataCsv;
