import { useEffect, useState, useRef, memo } from "react";
import { useStateValue } from "./../../Context/StateProvider";
import DoughnutChart from "../charts/DoughnutChart";
import SavingsTotalsBarChart from "../charts/SavingsTotalsBarChart";
import Sidebar from "../sidebar/Sidebar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import SavingsCostCentreBarChart from "../charts/SavingsCostCentreBarChart";
import SavingsEnvironmentBarChart from "../charts/SavingsEnvironmentBarChart";
import prepareChartTotals from "../../utils/prepareChartTotals";
import "./dataVisualisation.css";

const savingsTotalLabels = [
  "ActualSavingsForCurrentYear",
  "ActualSavingsForYear",
  "ActualSavingsPerMonth",
];

const chartTitles = {
  "savings-total": "Total Savings Bar Chart",
  "cost-savings": "Cost Savings Bar Chart",
  "environment-savings": "Environment Savings Bar Chart",
  "product-savings": "Product Savings Doughnut Chart",
};

export const DataVisualisation = memo(({ data }) => {
  const [{ user, displayName }] = useStateValue();

  const [formattedData, setFormattedData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");

  const exportSavingsTotalsRef = useRef();
  const exportCostCenterTotalRef = useRef();
  const exportEnvironmentTotalRef = useRef();
  const productTotalRef = useRef();

  const [selectedChart, setSelectedChart] = useState("savings-total");
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  // formats the data
  useEffect(() => {
    const formatData = (data) => {
      // remove commas and $ signs from all fields
      let tempFormattedData = data.map((d) => {
        for (let key in d) {
          return (d[key] = d[key].replace(/\$|-|,/g, ""));
        }
      });

      setFormattedData(tempFormattedData);
      formatSavingsTotalData();
    };

    if (data) {
      formatData(data);
    }
  }, [user, data, displayName]);

  const formatSavingsTotalData = () => {
    const chartTotals = prepareChartTotals(data);
    setChartData([chartTotals[0], chartTotals[1], chartTotals[2]]);
    setSelectedChart("savings-total");
  };

  // Update chart title when the chart is updated
  useEffect(() => {
    return setChartTitle(chartTitles[selectedChart] || "");
  }, [selectedChart]);

  const formatChartData = (
    chartType,
    labelKey,
    useOthersPercentage = false
  ) => {
    const newChartData = savingsTotalLabels.reduce((acc, label) => {
      acc[label] = [];

      // Create a map to store totals by tag
      const totalsByTag = {};

      let overallTotal = 0;

      // Use forEach to iterate over the data and accumulate totals
      data.forEach((item) => {
        if (item[labelKey] && item[labelKey].trim() !== "") {
          // Clean the value and convert to a number
          const cleanedValue =
            parseFloat(item[label].replace(/[^0-9.-]+/g, "")) || 0;

          // Accumulate the overall total if the "others" percentage logic is used
          if (useOthersPercentage) {
            overallTotal += cleanedValue;
          }

          // Initialize the total for the current tag if not already done
          if (!totalsByTag[item[labelKey]]) {
            totalsByTag[item[labelKey]] = 0;
          }
          totalsByTag[item[labelKey]] += cleanedValue;
        }
      });

      // Convert the totalsByTag object to an array
      let formattedArray = Object.keys(totalsByTag).map((tag) => ({
        [tag]: parseFloat(totalsByTag[tag].toFixed(2)),
      }));

      if (useOthersPercentage) {
        // Calculate the maximum amount allowed before moving to "other"
        const percentageToOther = 2; // Adjust as needed
        const maxAmountToOther = (overallTotal / 100) * percentageToOther;

        // Separate the totals into those above and below the threshold
        let othersTotal = 0;
        formattedArray = Object.keys(totalsByTag).reduce((result, tag) => {
          if (totalsByTag[tag] > maxAmountToOther) {
            result.push({ [tag]: parseFloat(totalsByTag[tag].toFixed(2)) });
          } else {
            othersTotal += totalsByTag[tag];
          }
          return result;
        }, []);

        // Add the "other" category if there are any accumulated amounts
        if (othersTotal > 0) {
          formattedArray.push({ other: parseFloat(othersTotal.toFixed(2)) });
        }
      }

      // Assign the formatted array to the current label
      acc[label] = formattedArray;

      return acc;
    }, {});

    setChartData(newChartData);
    setSelectedChart(chartType);
    setTriggerAnimation((prev) => !prev);
  };

  return (
    <div className="App">
      <Sidebar
        handleSavingsTotals={() => formatSavingsTotalData(formattedData)}
        handleCostCentreSavings={() =>
          formatChartData("cost-savings", "CostCenterTag", false)
        }
        handleEnvironmentData={() =>
          formatChartData("environment-savings", "EnvironmentTag", false)
        }
        handleProductSavingsData={() =>
          formatChartData("product-savings", "ProductNameTag", true)
        }
      />
      <div className="data-area">
        <DashboardHeader chartTitle={chartTitle} />
        <div className="chart-container">
          <div ref={exportSavingsTotalsRef}>
            {selectedChart === "savings-total" && (
              <SavingsTotalsBarChart
                chartData={chartData}
                exportSavingsTotals={exportSavingsTotalsRef.current}
              />
            )}
          </div>
          <div ref={exportCostCenterTotalRef}>
            {selectedChart === "cost-savings" && (
              <SavingsCostCentreBarChart
                chartData={chartData}
                exportCostCenterTotals={exportCostCenterTotalRef.current}
              />
            )}
          </div>
          <div ref={exportEnvironmentTotalRef}>
            {selectedChart === "environment-savings" && (
              <SavingsEnvironmentBarChart
                chartData={chartData}
                exportEnvironmentTotals={exportEnvironmentTotalRef.current}
              />
            )}
          </div>
          <div ref={productTotalRef}>
            {selectedChart === "product-savings" && (
              <DoughnutChart
                chartData={chartData}
                exportProductTotal={productTotalRef.current}
                triggerAnimation={triggerAnimation} // Pass the state
                setTriggerAnimation={setTriggerAnimation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
