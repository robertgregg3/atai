import { chartFilters } from "@components/charts/DoughnutChart";
import { IoMdOptions } from "react-icons/io";
import DownloadChart from "@utils/DownloadChart";
import './ChartSettings.css'
import { useContext, useState } from "react";
import { StateContext } from "@context/StateProvider";
import { stateEnums } from "@context/reducer";


interface ChartSettingsProps {
    title: string;
    currentChart?: chartFilters;
    handleChartSelectionClick?: (timeFrame: chartFilters) => void;
    productTotalRef: React.RefObject<HTMLDivElement>;
    isDougnutChart?: boolean;
  }
  
  const ChartSettings = ({ currentChart, handleChartSelectionClick, productTotalRef, isDougnutChart = false, title }: ChartSettingsProps) => {
    const [ showSettings, setShowSettings ] = useState<boolean>(false);
    const { state, dispatch } = useContext(StateContext);

    const handleSettingsClick = () => {
      setShowSettings(!showSettings);
    };

    const handleClick = (timeFrame: chartFilters) => {
      handleChartSelectionClick && handleChartSelectionClick(timeFrame);
      setShowSettings(false);
    }

    const handleCheckboxClick = () => {
      dispatch({ type: stateEnums.TOGGLE_USE_OTHERS_PERCENTAGE, payload: !state.useOthersPercentage });
      setShowSettings(false);
    }

    return (
      <div className='chart-settings'>
        <IoMdOptions 
          onClick={() => 
          handleSettingsClick()} 
          className={`chart-settings__icon ${showSettings ? 'settings-visible' : ''}`} 
        />
        <div className={`chart-settings__options  ${showSettings ? 'options-visible' : ''}`}>
          <DownloadChart
            reference={productTotalRef}
            title={title}
          />
          {isDougnutChart && (
            <>
            <div className="chart-selection">
              <span className="chart-selection__btn-header">Choose time frame:</span>
              <div className="chart-selection__buttons">
                <button
                  className={currentChart === "currentYear" ? "chart-selected" : ""}
                  onClick={() => handleClick('currentYear')}>
                  Current Year
                </button>
                <button
                  className={currentChart === "year" ? "chart-selected" : ""}
                  onClick={() => handleClick('year')}>
                  Year
                </button>
                <button
                  className={currentChart === "month" ? "chart-selected" : ""}
                  onClick={() => handleClick('month')}>
                  Monthly
                </button>
              </div>
            </div>
            <div className="chart-selection">
              <span className="chart-selection__btn-header">Product filters</span>
              <div className="chart-selection__buttons">
                <div className="chart-settings__others-chk-bx">
                  <label htmlFor="showOthers">
                    Show top savings products only:
                  </label>
                  <input
                    id="showOthers"
                    type='checkbox'
                    checked={state.useOthersPercentage}
                    onChange={() => handleCheckboxClick()}
                  />
                </div>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    );
  };

  export default ChartSettings;
  