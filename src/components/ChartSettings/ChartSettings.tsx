import { chartFilters } from "@components/charts/DoughnutChart";
import { IoMdOptions } from "react-icons/io";
import { useContext, useState } from "react";
import { StateContext } from "@context/StateProvider";
import { stateEnums } from "@context/reducer";
import { FaGear } from "react-icons/fa6";
import DownloadChart from "@utils/DownloadChart";
import './ChartSettings.css'


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
    const { othersPercentage, useOthersPercentage } = state;

    const handleSettingsClick = () => {
      setShowSettings(!showSettings);
    };

    const handleClick = (timeFrame: chartFilters) => {
      handleChartSelectionClick && handleChartSelectionClick(timeFrame);
      setShowSettings(false);
    }

    const handleCheckboxClick = () => {
      dispatch({ type: stateEnums.TOGGLE_USE_OTHERS_PERCENTAGE, payload: !useOthersPercentage });
    }

    const handleOthersUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: stateEnums.OTHERS_PERCENTAGE, payload: parseInt(e.target.value)});
    }

    const getOthersPercentageMapping = () => {
      switch(othersPercentage) {
        case 1:
          return 'Top 5%';
        case 2:
          return 'Top 4%';
        case 3:
          return 'Top 3%';
        case 4:
          return 'Top 2%';
        case 5:
          return 'Top 1%';        
      }
    }

    return (
      <div className='chart-settings'>
        <FaGear 
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
            <div className="chart-selection" style={{ backgroundColor: '#f7f7f7'}}>
              <span className="chart-selection__btn-header">Product filters</span>
              <div className="chart-selection__buttons">
                <div className="chart-settings__section-container">
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
              <div className="chart-selection__buttons">
                <div className="chart-settings__section-container slider">
                  <label htmlFor="showOthers" style={{ color: `${useOthersPercentage ? '#000000' : '#aaaaaa'}` }}>
                    {getOthersPercentageMapping()} of products:
                  </label>
                  <input 
                    type='range' 
                    min='1'
                    max='5'

                    value={state.othersPercentage} 
                    onChange={(e) => handleOthersUpdate(e)} 
                    disabled={!state.useOthersPercentage}
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
  