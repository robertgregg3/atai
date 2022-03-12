import { useEffect, useState, useRef } from "react";
import { Form } from 'react-bootstrap';
import DoughnutChart from "../charts/DoughnutChart";
import SavingsBarChart from "../charts/SavingsBarChart";
import exportAsImage from '../../utils/exportAsImage';
import SavingsTotalsBarChart from '../charts/SavingsTotalsBarChart';
import "./dataVisualisation.css";

export const DataVisualisation = (rawData) => {
  const {data} = rawData;
  const [formattedData, setFormattedData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState('Chart');

  const [showDoughnutChart, setShowDoughnutChart] = useState(false);
  const [showSavingsTotalChart, setShowSavingsTotalChart] = useState(false);
  const [showBarChart, setBarChart] = useState(false);

  const [othersPercentage, setOthersPercentage] = useState(2)
  const [productSavingsCurrentYear, setProductSavingsCurrentYear] = useState([]);
  const [productSavingsYear, setProductSavingsYear] = useState([]);
  const [productSavingsMonth, setProductSavingsMonth] = useState([]);
  const [productChartLabels, setProductChartLabels] = useState([]);
  
  const [currentYearSavingsTotal, setCurrentYearSavingTotal] = useState(0);
  const [yearSavingsTotal, setYearSavingTotal] = useState(0);
  const [monthSavingsTotal, setMonthSavingTotal] = useState(0);

  const exportCurrentYear = useRef();
  const exportYear = useRef();
  const exportMonth = useRef();
  const exportSavingsTotals = useRef();

  const savingsTotals = {
    currentYear: 'ActualSavingsForCurrentYear',
    year: 'ActualSavingsForYear',
    month: 'ActualSavingsPerMonth',
  }

  useEffect(() => {
    data && formatData(data);
  }, []);

  const formatData = (data) => {
    // remove commas and $ signs from all fields
    let tempFormattedData = [];

    data.map((d) => {
      for (let key in d) {
          d[key] = d[key].replace(/\$|-|,/g, "");
        }
      return (tempFormattedData = [...tempFormattedData, d]);
    });

    setFormattedData(tempFormattedData);
    formatSavingsTotalData(tempFormattedData)
  };

  const formatSavingsTotalData = (data) => {
    // the last row of the csv contains the totals
    const savingsTotalsRow = data[data.length - 1];

    const savingsTotals = {
      ActualSavingsForCurrentYear: savingsTotalsRow.ActualSavingsForCurrentYear,
      ActualSavingsForYear:savingsTotalsRow.ActualSavingsForYear,
      ActualSavingsPerMonth: savingsTotalsRow.ActualSavingsPerMonth,
    };
  
    const formatChartData = Object.values(savingsTotals);

    let savingsValues = [];
    formatChartData.map((t) => {
      t = t.replace(/\$|-|,/g, "");
      t = parseFloat(t);
      return savingsValues = [...savingsValues, t];
    });
    
    setCurrentYearSavingTotal(parseFloat(savingsTotals.ActualSavingsForCurrentYear))
    setYearSavingTotal(parseFloat(savingsTotals.ActualSavingsForYear))
    setMonthSavingTotal(parseFloat(savingsTotals.ActualSavingsPerMonth))
    setChartData(savingsValues);
    setChartTitle('Total Savings Bar Chart')
    setShowSavingsTotalChart(true)
    setShowDoughnutChart(false)
    setBarChart(false)
  };

  const formatCostCenterData = (data) => {
    let costCenterLabels = ['ActualSavingsPerMonth', 'ActualSavingsForYear', 'ActualSavingsForCurrentYear']
    let costCenterProperties = []; // fia, fii, fio etc
    let costCenterData = {}; // the object used for the chart
    
   // grab the properties for the costCenter
   data.map((d) => {
     if (costCenterProperties.indexOf(d.CostCenterTag) === -1) {
       if (d.CostCenterTag !== "") {
         return costCenterProperties = [...costCenterProperties, d.CostCenterTag];
        }
      }
      return []
    });

    // iterate through the labels and return an opject with the labels as the keys
    // then iterate through the properties and assign each key the value of an object
    // in each object (fia, fii etc) map through the data and find total up the values of the column header (key)
    // final check is to convert the string to number in the reduce function
    costCenterLabels.map(label => {
      return costCenterData[label] = 
        costCenterProperties.map(prop => ({ [prop]: data
                            .filter(item => item.CostCenterTag === prop)
                            .reduce((total, d) => (isNaN(parseFloat(d[label]))) ? total : total + parseFloat(d[label]), 0)
      }))
    })
     
    setChartData(costCenterData);
    setChartTitle('Cost Centre Savings')
    setBarChart(true)
    setShowDoughnutChart(false)
    setShowSavingsTotalChart(false)
  };
 
  const formatEnvironmentData = (data) => {
    let environmentLabels = ['ActualSavingsPerMonth', 'ActualSavingsForYear', 'ActualSavingsForCurrentYear']
    let environmentProperties = []; // fia, fii, fio etc
    let environmentData = {}; // the object used for the chart
    
   // grab the properties for the environment
   data.map((d) => {
     if (environmentProperties.indexOf(d.EnvironmentTag) === -1) {
       if (d.EnvironmentTag !== "") {
         return environmentProperties = [...environmentProperties, d.EnvironmentTag];
        }
      } 
      return []
    });

    environmentLabels.map(label => {
      return environmentData[label] = 
        environmentProperties.map(prop => ({ [prop]: data
                            .filter(item => item.EnvironmentTag === prop)
                            .reduce((total, d) => (isNaN(parseFloat(d[label]))) ? total : total + parseFloat(d[label]), 0)
      }))
    })
     
    setChartData(environmentData);
    setChartTitle('Environment Savings')
    setBarChart(true)
    setShowDoughnutChart(false)
    setShowSavingsTotalChart(false)
  };
  
  // three separate charts for the yearly, monthly, current year savings
  const formatProductData = (data) => {
    let productLabels = [savingsTotals.currentYear, savingsTotals.year, savingsTotals.month];
    let productProperties = ['other']; // all different product names and an "other" property for making the chart readible. 
    let productData = {}; // the object used to iterate through and calculate the totals/move items into "other" category
    
    // calculate percentage which is the limit before moving to 'other' property in productProperties.
    const percentageToOther = othersPercentage;
    const maxAmountToOtherCurrentYear = Math.round(currentYearSavingsTotal / 100 * percentageToOther);
    const maxAmountToOtherYear = Math.round(yearSavingsTotal / 100 * percentageToOther);
    const maxAmountToOtherMonth = Math.round(monthSavingsTotal / 100 * percentageToOther);
    
    // get the list of product names
    data.map((d) => {
      if ((d.ProductNameTag !== "") && productProperties.indexOf(d.ProductNameTag) === -1) {
          return productProperties = [...productProperties, d.ProductNameTag];
        }
        return []
      });

    // add up all of the product names for each of the currentYear, Monthly etc  
    productLabels.map(label => {
      return productData[label] = 
        productProperties.map(prop => ({ [prop]: data
                            .filter(item => item.ProductNameTag === prop)
                            .reduce((total, d) => (isNaN(parseFloat(d[label]))) ? total : total + parseFloat(d[label]), 0)
      }))
    })

    // go through ONE of the properties in the productData object and for each item in 
    // if the value for each of the products is not higher than the minimum (maxAmountToOtherCurrentYear)
    // then add it to the others property
    // otherwise add the property and amoun to the object
    let productSavingsCurrentYearOther = { other: 0}
    productData[productLabels[0]].map(item => {
      for(let key in item) {
        if(item[key] > maxAmountToOtherCurrentYear) {
          productSavingsCurrentYearOther = {...productSavingsCurrentYearOther, [key]: item[key]}
        } else {
          return productSavingsCurrentYearOther.other += item[key]
        }
      } return {}
    });
    
    let productSavingsYearOther = { other: 0}
    productData[productLabels[1]].map(item => {
      for(let key in item) {
        if(item[key] > maxAmountToOtherYear) {
          productSavingsYearOther = {...productSavingsYearOther, [key]: item[key]}
        } else {
          return productSavingsYearOther.other += item[key]
        }
      } return {}
    });
   
    let productSavingsMonthOther = { other: 0}
    productData[productLabels[2]].map(item => {
      for(let key in item) {
        if(item[key] > maxAmountToOtherMonth) {
          productSavingsMonthOther = {...productSavingsMonthOther, [key]: item[key]}
        } else {
          return productSavingsMonthOther.other += item[key]
        }
      } return {}
    });    
   
    // set the labels and the data for the three charts
    setProductSavingsCurrentYear(Object.values(productSavingsCurrentYearOther))
    setProductChartLabels(Object.keys(productSavingsCurrentYearOther))
    setProductSavingsYear(Object.values(productSavingsYearOther))
    setProductSavingsMonth(Object.values(productSavingsMonthOther))
    setChartTitle('Product Savings')
    setBarChart(false)
    setShowDoughnutChart(true)
    setShowSavingsTotalChart(false)

  };

  const onFormSelectChange = (e) => {
    const value = e.target.value;
    if(value === 'savingsTotal') formatSavingsTotalData(formattedData)
    if(value === 'costCenter') formatCostCenterData(formattedData)
    if(value === 'environment') formatEnvironmentData(formattedData)
    if(value === 'product') formatProductData(formattedData)
  }

  const updateOtherPercentage = (e) => {
    e.preventDefault();
    setOthersPercentage(e.target.value)
  }

  const handleButtonClick = () => {
    formatProductData(formattedData);
  }

  return (
    <div className="App">
      <div>
        <div className="button-container">
          <button onClick={() => formatSavingsTotalData(formattedData)}>
            Show Savings Totals
          </button>
          <button onClick={() => formatCostCenterData(formattedData)}>
            Show Cost Centre Savings
          </button>
          <button onClick={() => formatEnvironmentData(formattedData)}>
            Show Environment Savings
          </button>
          <button onClick={() => formatProductData(formattedData)}>
            Show Product Savings
          </button>
        </div>
        <div className="options-container">
          <Form.Select aria-label="Default select example" onChange={onFormSelectChange}>
            <option className="select-option">Choose an option</option>
            <option className="select-option" value="savingsTotal">Savings Total</option>
            <option className="select-option" value="costCenter">Cost Center</option>
            <option className="select-option" value="environment">Environment</option>
            <option className="select-option" value="product">Product</option>
          </Form.Select>
        </div>
      </div>
      {showDoughnutChart && (
        <div className="percentage-container">
          <input placeholder={othersPercentage} onChange={(e) => updateOtherPercentage(e)} size="3" />
          <button onClick={handleButtonClick}>Update "Other" percentage</button>
        </div>
      )}
      <div className="chart-container">
        <p>ATAI Data Visualisation</p>
        {showSavingsTotalChart && (
          <div>
            <div className="update-others">
                <button onClick={() => exportAsImage(exportSavingsTotals.current, "Savings Totals")}>Download jpg</button>
            </div>
            <div ref={exportSavingsTotals}>
              <SavingsTotalsBarChart chartData={chartData} chartTitle={chartTitle} />
            </div>
          </div>
        )}
        {showBarChart && (
          <div>
            <div className="update-others">
              <button onClick={() => exportAsImage(exportSavingsTotals.current, "Savings Totals")}>Download jpg</button>
            </div>
            <div ref={exportSavingsTotals}>
              <SavingsBarChart chartData={chartData} chartTitle={chartTitle} />
            </div>
          </div>
        )}
        {showDoughnutChart && (
          <>
          <div>
            <div className="update-others">
                <button onClick={() => exportAsImage(exportCurrentYear.current, "Product - Current Year Savings")}>Download jpg</button>
            </div>
            <div ref={exportCurrentYear}>
              <DoughnutChart 
                chartData={productSavingsCurrentYear} 
                chartTitle={'Product Savings For the Current Year'}
                chartLabels={productChartLabels} />
            </div>
          </div>
          <div>
            <div className="update-others">
                <button onClick={() => exportAsImage(exportYear.current, "Product - Year Savings")}>Download jpg</button>
            </div>
            <div ref={exportYear}>
              <DoughnutChart 
                chartData={productSavingsYear} 
                chartTitle={'Product Savings for the Year'} 
                chartLabels={productChartLabels} />
            </div>
          </div>
          <div>
            <div className="update-others">
                <button onClick={() => exportAsImage(exportMonth.current, "Product - Monthly Savings")}>Download jpg</button>
            </div>
          <div ref={exportMonth}>
            <DoughnutChart 
              chartData={productSavingsMonth} 
              chartTitle={'Product Savings for the Month'} 
              chartLabels={productChartLabels} />
            </div>
          </div>
          </> 
          )
        }
      </div>
    </div>
  );
};