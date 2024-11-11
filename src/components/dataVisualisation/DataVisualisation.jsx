import { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { useStateValue } from "./../../Context/StateProvider";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import DoughnutChart from "../charts/DoughnutChart";
import SavingsBarChart from "../charts/SavingsBarChart";
import exportAsImage from "../../utils/exportAsImage";
import SavingsTotalsBarChart from "../charts/SavingsTotalsBarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./dataVisualisation.css";
import Sidebar from "../sidebar/Sidebar";

const DownloadChart = ({ reference, title }) => {
  const [downloadChartTitle, setDownloadChartTitle] =
    useState("Download Chart...");

  const onDownloadChartFormChange = (e, chartTitle) => {
    const value = e.target.value === "jpeg" ? "jpeg" : "png";
    if (e.target.value !== downloadChartTitle) {
      exportAsImage(reference.current, chartTitle, value);
      setDownloadChartTitle(downloadChartTitle);
    }
  };
  return (
    <div className="download-chart">
      <Form.Select
        aria-label="Download Chart"
        onChange={(e) => onDownloadChartFormChange(e, title)}>
        <option className="select-option">{downloadChartTitle}</option>
        <option className="select-option" value="jpeg">
          JPEG
        </option>
        <option className="select-option" value="png">
          PNG
        </option>
      </Form.Select>
    </div>
  );
};
export const DataVisualisation = (rawData) => {
  const { data } = rawData;
  const [{ user, displayName }, dispatch] = useStateValue();

  const [formattedData, setFormattedData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("Chart");

  const [showDoughnutChart, setShowDoughnutChart] = useState(false);
  const [showSavingsTotalChart, setShowSavingsTotalChart] = useState(false);
  const [showBarChartCostCenter, setBarChartCostCenter] = useState(false);
  const [showBarChartEnvironment, setBarChartEnvironment] = useState(false);
  const [showProductCurrentYearChart, setShowProductCurrentYearChart] =
    useState(true);
  const [showProductYearChart, setShowProductYearChart] = useState(false);
  const [showProductMonthChart, setShowProductMonthChart] = useState(false);

  const [othersPercentage, setOthersPercentage] = useState(2);
  const [productSavingsCurrentYear, setProductSavingsCurrentYear] = useState(
    []
  );
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
  const exportCostCenterTotals = useRef();
  const exportEnvironmentTotals = useRef();

  const history = useHistory();

  const savingsTotals = {
    currentYear: "ActualSavingsForCurrentYear",
    year: "ActualSavingsForYear",
    month: "ActualSavingsPerMonth",
  };

  useEffect(() => {
    data && formatData(data);
    console.log(displayName);
  }, [user, data, displayName]);

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
    formatSavingsTotalData(tempFormattedData);
  };

  const formatSavingsTotalData = (data) => {
    // the last row of the csv contains the totals
    const savingsTotalsRow = data[data.length - 1];

    const savingsTotals = {
      ActualSavingsForCurrentYear: savingsTotalsRow.ActualSavingsForCurrentYear,
      ActualSavingsForYear: savingsTotalsRow.ActualSavingsForYear,
      ActualSavingsPerMonth: savingsTotalsRow.ActualSavingsPerMonth,
    };

    const formatChartData = Object.values(savingsTotals);

    let savingsValues = [];
    formatChartData.map((t) => {
      t = t.replace(/\$|-|,/g, "");
      t = parseFloat(t);
      return (savingsValues = [...savingsValues, t]);
    });

    setCurrentYearSavingTotal(
      parseFloat(savingsTotals.ActualSavingsForCurrentYear)
    );
    setYearSavingTotal(parseFloat(savingsTotals.ActualSavingsForYear));
    setMonthSavingTotal(parseFloat(savingsTotals.ActualSavingsPerMonth));
    setChartData(savingsValues);
    setChartTitle("Total Savings Bar Chart");
    setShowSavingsTotalChart(true);
    setShowDoughnutChart(false);
    setBarChartCostCenter(false);
    setBarChartEnvironment(false);
  };

  const formatCostCenterData = (data) => {
    let costCenterLabels = [
      "ActualSavingsPerMonth",
      "ActualSavingsForYear",
      "ActualSavingsForCurrentYear",
    ];
    let costCenterProperties = []; // fia, fii, fio etc
    let costCenterData = {}; // the object used for the chart

    // grab the properties for the costCenter
    data.map((d) => {
      if (costCenterProperties.indexOf(d.CostCenterTag) === -1) {
        if (d.CostCenterTag !== "") {
          return (costCenterProperties = [
            ...costCenterProperties,
            d.CostCenterTag,
          ]);
        }
      }
      return [];
    });

    // iterate through the labels and return an object with the labels as the keys
    // then iterate through the properties and assign each key the value of an object
    // in each object (fia, fii etc) map through the data and find total up the values of the column header (key)
    // final check is to convert the string to number in the reduce function
    costCenterLabels.map((label) => {
      return (costCenterData[label] = costCenterProperties.map((prop) => ({
        [prop]: data
          .filter((item) => item.CostCenterTag === prop)
          .reduce(
            (total, d) =>
              isNaN(parseFloat(d[label]))
                ? total
                : total + parseFloat(d[label]),
            0
          ),
      })));
    });

    setChartData(costCenterData);
    setChartTitle("Cost Centre Savings");
    setBarChartCostCenter(true);
    setBarChartEnvironment(false);
    setShowSavingsTotalChart(false);
    setShowDoughnutChart(false);
    setShowSavingsTotalChart(false);
  };

  const formatEnvironmentData = (data) => {
    let environmentLabels = [
      "ActualSavingsPerMonth",
      "ActualSavingsForYear",
      "ActualSavingsForCurrentYear",
    ];
    let environmentProperties = []; // fia, fii, fio etc
    let environmentData = {}; // the object used for the chart

    // grab the properties for the environment
    data.map((d) => {
      if (environmentProperties.indexOf(d.EnvironmentTag) === -1) {
        if (d.EnvironmentTag !== "") {
          return (environmentProperties = [
            ...environmentProperties,
            d.EnvironmentTag,
          ]);
        }
      }
      return [];
    });

    environmentLabels.map((label) => {
      return (environmentData[label] = environmentProperties.map((prop) => ({
        [prop]: data
          .filter((item) => item.EnvironmentTag === prop)
          .reduce(
            (total, d) =>
              isNaN(parseFloat(d[label]))
                ? total
                : total + parseFloat(d[label]),
            0
          ),
      })));
    });

    setChartData(environmentData);
    setChartTitle("Environment Savings");
    setBarChartCostCenter(false);
    setBarChartEnvironment(true);
    setShowSavingsTotalChart(false);
    setShowDoughnutChart(false);
    setShowSavingsTotalChart(false);
  };

  // three separate charts for the yearly, monthly, current year savings
  const formatProductData = (data) => {
    let productLabels = [
      savingsTotals.currentYear,
      savingsTotals.year,
      savingsTotals.month,
    ];
    let productProperties = ["other"]; // all different product names and an "other" property for making the chart readible.
    let productData = {}; // the object used to iterate through and calculate the totals/move items into "other" category

    // calculate percentage which is the limit before moving to 'other' property in productProperties.
    const percentageToOther = othersPercentage;
    const maxAmountToOtherCurrentYear = Math.round(
      (currentYearSavingsTotal / 100) * percentageToOther
    );
    const maxAmountToOtherYear = Math.round(
      (yearSavingsTotal / 100) * percentageToOther
    );
    const maxAmountToOtherMonth = Math.round(
      (monthSavingsTotal / 100) * percentageToOther
    );

    // get the list of product names
    data.map((d) => {
      if (
        d.ProductNameTag !== "" &&
        productProperties.indexOf(d.ProductNameTag) === -1
      ) {
        return (productProperties = [...productProperties, d.ProductNameTag]);
      }
      return [];
    });

    // add up all of the product names for each of the currentYear, Monthly etc
    productLabels.map((label) => {
      return (productData[label] = productProperties.map((prop) => ({
        [prop]: data
          .filter((item) => item.ProductNameTag === prop)
          .reduce(
            (total, d) =>
              isNaN(parseFloat(d[label]))
                ? total
                : total + parseFloat(d[label]),
            0
          ),
      })));
    });

    // go through ONE of the properties in the productData object and for each item in
    // if the value for each of the products is not higher than the minimum (maxAmountToOtherCurrentYear)
    // then add it to the others property
    // otherwise add the property and amoun to the object
    let productSavingsCurrentYearOther = { other: 0 };
    productData[productLabels[0]].map((item) => {
      for (let key in item) {
        if (item[key] > maxAmountToOtherCurrentYear) {
          productSavingsCurrentYearOther = {
            ...productSavingsCurrentYearOther,
            [key]: item[key],
          };
        } else {
          return (productSavingsCurrentYearOther.other += item[key]);
        }
      }
      return {};
    });

    let productSavingsYearOther = { other: 0 };
    productData[productLabels[1]].map((item) => {
      for (let key in item) {
        if (item[key] > maxAmountToOtherYear) {
          productSavingsYearOther = {
            ...productSavingsYearOther,
            [key]: item[key],
          };
        } else {
          return (productSavingsYearOther.other += item[key]);
        }
      }
      return {};
    });

    let productSavingsMonthOther = { other: 0 };
    productData[productLabels[2]].map((item) => {
      for (let key in item) {
        if (item[key] > maxAmountToOtherMonth) {
          productSavingsMonthOther = {
            ...productSavingsMonthOther,
            [key]: item[key],
          };
        } else {
          return (productSavingsMonthOther.other += item[key]);
        }
      }
      return {};
    });

    // set the labels and the data for the three charts
    setProductSavingsCurrentYear(Object.values(productSavingsCurrentYearOther));
    setProductChartLabels(Object.keys(productSavingsCurrentYearOther));
    setProductSavingsYear(Object.values(productSavingsYearOther));
    setProductSavingsMonth(Object.values(productSavingsMonthOther));
    setChartTitle("Product Savings");
    setBarChartCostCenter(false);
    setBarChartEnvironment(false);
    setShowSavingsTotalChart(false);
    setShowDoughnutChart(true);
  };

  const onFormSelectChange = (e) => {
    const value = e.target.value;
    if (value === "savingsTotal") formatSavingsTotalData(formattedData);
    if (value === "costCenter") formatCostCenterData(formattedData);
    if (value === "environment") formatEnvironmentData(formattedData);
    if (value === "product") formatProductData(formattedData);
  };

  const updateOtherPercentage = (e) => {
    e.preventDefault();
    setOthersPercentage(e.target.value);
  };

  const handleButtonClick = () => {
    formatProductData(formattedData);
  };

  const handleChartSelectionClick = (value) => {
    setShowProductCurrentYearChart(value === "currentYear" ? true : false);
    setShowProductYearChart(value === "Year" ? true : false);
    setShowProductMonthChart(value === "Month" ? true : false);
  };

  // const handleUploadClick = () => {
  //   history.push("/");
  // };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    console.log(e);
    const auth = getAuth();
    signOut(auth).then((authUser) => {
      console.log("user: ", authUser);
      dispatch({
        type: "SET_USER",
        user: null,
      });
    });
    history.push("/");
  };

  return (
    <div className="App">
      <Sidebar
        handleSavingsTotals={() => formatSavingsTotalData(formattedData)}
        handleCostCentreSavings={() => formatCostCenterData(formattedData)}
        handleEnvironmentData={() => formatEnvironmentData(formattedData)}
        handleProductSavingsData={() => formatProductData(formattedData)}
        handleLogout={(e) => handleLogoutClick(e)}
      />
      <div className="data-area">
        <div
          className={`${
            showDoughnutChart ? "header header-with-options" : "header"
          }`}>
          <h2>ATAI Data Visualisation</h2>
          {showDoughnutChart && (
            <div className="percentage-container">
              <input
                placeholder={othersPercentage}
                onChange={(e) => updateOtherPercentage(e)}
                size="3"
              />
              <button onClick={handleButtonClick}>
                Update "Other" percentage
              </button>
            </div>
          )}
          <div className="options-container">
            <Form.Select
              aria-label="ATI Chart options"
              onChange={onFormSelectChange}>
              <option className="select-option">Choose an option</option>
              <option className="select-option" value="savingsTotal">
                Savings Total
              </option>
              <option className="select-option" value="costCenter">
                Cost Center
              </option>
              <option className="select-option" value="environment">
                Environment
              </option>
              <option className="select-option" value="product">
                Product
              </option>
            </Form.Select>
          </div>
          <div className="user-info">
            <span>
              Hi, {displayName} <AccountCircleIcon />
            </span>
          </div>
        </div>

        <div className={`${showDoughnutChart && "data-area__chart"}`}>
          {showDoughnutChart && (
            <div className="chart__selection">
              <button
                className={showProductCurrentYearChart ? "chart-selected" : ""}
                onClick={() => handleChartSelectionClick("currentYear")}>
                Current Year: ${currentYearSavingsTotal.toLocaleString()}
              </button>
              <button
                className={showProductYearChart ? "chart-selected" : ""}
                onClick={() => handleChartSelectionClick("Year")}>
                Year: ${yearSavingsTotal.toLocaleString()}
              </button>
              <button
                className={showProductMonthChart ? "chart-selected" : ""}
                onClick={() => handleChartSelectionClick("Month")}>
                Monthly: ${monthSavingsTotal.toLocaleString()}
              </button>
            </div>
          )}
          <div className="chart-container">
            {showSavingsTotalChart && (
              <div>
                <div className="update-others">
                  <DownloadChart
                    reference={exportSavingsTotals}
                    title={"Savings totals"}
                  />
                </div>
                <div ref={exportSavingsTotals}>
                  <SavingsTotalsBarChart
                    chartData={chartData}
                    chartTitle={chartTitle}
                  />
                </div>
              </div>
            )}
            {showBarChartCostCenter && (
              <div>
                <div className="update-others">
                  <DownloadChart
                    reference={exportCostCenterTotals}
                    title={"Cost Center Savings"}
                  />
                </div>
                <div ref={exportCostCenterTotals}>
                  <SavingsBarChart
                    chartData={chartData}
                    chartTitle={chartTitle}
                  />
                </div>
              </div>
            )}
            {showBarChartEnvironment && (
              <div>
                <div className="update-others">
                  <DownloadChart
                    reference={exportEnvironmentTotals}
                    title={"Environment Savings"}
                  />
                </div>
                <div ref={exportEnvironmentTotals}>
                  <SavingsBarChart
                    chartData={chartData}
                    chartTitle={chartTitle}
                  />
                </div>
              </div>
            )}
            {showDoughnutChart && (
              <>
                {showProductCurrentYearChart && (
                  <div>
                    <div className="update-others">
                      <DownloadChart
                        reference={exportCurrentYear}
                        title={"Product Savings For the Current Year"}
                      />
                    </div>
                    <div ref={exportCurrentYear}>
                      <DoughnutChart
                        chartData={productSavingsCurrentYear}
                        chartTitle={"Product Savings For the Current Year"}
                        chartLabels={productChartLabels}
                      />
                    </div>
                  </div>
                )}
                {showProductYearChart && (
                  <div>
                    <div className="update-others">
                      <DownloadChart
                        reference={exportYear}
                        title={"Product Savings for the Year"}
                      />
                    </div>
                    <div ref={exportYear}>
                      <DoughnutChart
                        chartData={productSavingsYear}
                        chartTitle={"Product Savings for the Year"}
                        chartLabels={productChartLabels}
                      />
                    </div>
                  </div>
                )}
                {showProductMonthChart && (
                  <div>
                    <div className="update-others">
                      <DownloadChart
                        reference={exportMonth}
                        title={"Product Savings for the Month"}
                      />
                    </div>
                    <div ref={exportMonth}>
                      <DoughnutChart
                        chartData={productSavingsMonth}
                        chartTitle={"Product Savings for the Month"}
                        chartLabels={productChartLabels}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
