import { useEffect, useState, useRef, memo } from "react";
import { useStateValue } from "./../../Context/StateProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAuth, signOut } from "firebase/auth";
import DoughnutChart from "../charts/DoughnutChart";
import SavingsTotalsBarChart from "../charts/SavingsTotalsBarChart";
import Sidebar from "../sidebar/Sidebar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import SavingsCostCentreBarChart from "../charts/SavingsCostCentreBarChart";
import SavingsEnvironmentBarChart from "../charts/SavingsEnvironmentBarChart";
import "./dataVisualisation.css";

const savingsTotals = {
  currentYear: "ActualSavingsForCurrentYear",
  year: "ActualSavingsForYear",
  month: "ActualSavingsPerMonth",
};

export const DataVisualisation = memo(({ data }) => {
  const [{ user, displayName }, dispatch] = useStateValue();

  const [formattedData, setFormattedData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("Chart");

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

  const [selectedChart, setSelectedChart] = useState("savings-total");

  const history = useHistory();

  // formats the data
  useEffect(() => {
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

    if (data) {
      formatData(data);
    }
  }, [user, data, displayName]);

  const formatSavingsTotalData = (data) => {
    // the last row of the csv contains the totals
    // the last row of the csv contains the totals
    // For each key in the array, retrieve the value from the totals array using totals[key].
    // then remove any $, -, or , characters from the value.
    // convert the cleaned string into a floating-point number.
    // Filter Out NaN Values
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
    setSelectedChart("savings-total");
  };

  const formatChartData = (data, labelKey, propKey, chartType) => {
    let labels = [
      "ActualSavingsPerMonth",
      "ActualSavingsForYear",
      "ActualSavingsForCurrentYear",
    ];
    let dataProperties = []; // fia, fii, fio etc
    let newChartData = {}; // the object used for the chart

    data.map((d) => {
      if (dataProperties.indexOf(d[labelKey]) === -1) {
        if (d[labelKey] !== "") {
          return (dataProperties = [...dataProperties, d[labelKey]]);
        }
      }
      return [];
    });

    labels.map((label) => {
      return (newChartData[label] = dataProperties.map((prop) => ({
        [prop]: data
          .filter((item) => item[labelKey] === prop)
          .reduce(
            (total, d) =>
              isNaN(parseFloat(d[label]))
                ? total
                : total + parseFloat(d[label]),
            0
          ),
      })));
    });

    setChartData(newChartData);
    setChartTitle(chartType);
    setSelectedChart(
      chartType === "Cost Centre Savings"
        ? "cost-savings"
        : "environment-savings"
    );
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
    setSelectedChart("product-savings");
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
        handleCostCentreSavings={() =>
          formatChartData(
            formattedData,
            "CostCenterTag",
            "costCenter",
            "Cost Centre Savings"
          )
        }
        handleEnvironmentData={() =>
          formatChartData(
            formattedData,
            "EnvironmentTag",
            "environment",
            "Environment Savings"
          )
        }
        handleProductSavingsData={() => formatProductData(formattedData)}
        handleLogout={(e) => handleLogoutClick(e)}
      />
      <div className="data-area">
        <DashboardHeader chartTitle={chartTitle} />
        <div className="chart-container">
          {selectedChart === "product-savings" && (
            <div className="chart__selection">
              <div className="">
                <div className="percentage-container">
                  <input
                    placeholder={othersPercentage}
                    onChange={updateOtherPercentage}
                    size="3"
                  />
                  <button
                    className="percentage-button"
                    onClick={handleButtonClick}>
                    "Other" %
                  </button>
                </div>
              </div>
              <div>
                <button
                  className={
                    showProductCurrentYearChart ? "chart-selected" : ""
                  }
                  onClick={() => handleChartSelectionClick("currentYear")}>
                  Current Year
                </button>
                <button
                  className={showProductYearChart ? "chart-selected" : ""}
                  onClick={() => handleChartSelectionClick("Year")}>
                  Year
                </button>
                <button
                  className={showProductMonthChart ? "chart-selected" : ""}
                  onClick={() => handleChartSelectionClick("Month")}>
                  Monthly
                </button>
              </div>
            </div>
          )}
          <div ref={exportSavingsTotals}>
            {selectedChart === "savings-total" && (
              <SavingsTotalsBarChart
                chartData={chartData}
                exportSavingsTotals={exportSavingsTotals.current}
              />
            )}
          </div>
          <div ref={exportCostCenterTotals}>
            {selectedChart === "cost-savings" && (
              <SavingsCostCentreBarChart
                chartData={chartData}
                exportCostCenterTotals={exportCostCenterTotals.current}
              />
            )}
          </div>
          <div ref={exportEnvironmentTotals}>
            {selectedChart === "environment-savings" && (
              <SavingsEnvironmentBarChart
                chartData={chartData}
                exportEnvironmentTotals={exportEnvironmentTotals.current}
              />
            )}
          </div>
          {selectedChart === "product-savings" && (
            <>
              <div ref={exportCurrentYear}>
                {showProductCurrentYearChart && (
                  <DoughnutChart
                    chartData={productSavingsCurrentYear}
                    chartTitle={`Current year savings $${currentYearSavingsTotal.toLocaleString()}`}
                    chartLabels={productChartLabels}
                    downloadChartReference={exportCurrentYear.current}
                  />
                )}
              </div>
              <div ref={exportYear}>
                {showProductYearChart && (
                  <DoughnutChart
                    chartData={productSavingsYear}
                    chartTitle={`Year savings $${yearSavingsTotal.toLocaleString()}`}
                    chartLabels={productChartLabels}
                    downloadChartReference={exportYear.current}
                  />
                )}
              </div>
              <div ref={exportMonth}>
                {showProductMonthChart && (
                  <DoughnutChart
                    chartData={productSavingsMonth}
                    chartTitle={`Monthly savings $${monthSavingsTotal.toLocaleString()}`}
                    chartLabels={productChartLabels}
                    downloadChartReference={exportMonth.current}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
