import { useContext, useState } from "react";
import { StateContext } from "@context/StateProvider";
import { stateEnums } from "@context/reducer";
import { FaGear } from "react-icons/fa6";
import { TbFileDownload } from "react-icons/tb";
import { chartFilters, IconOnlyButton, Button } from "@components";
import { exportAsImage } from "@utils";
import './ChartSettings.css'
import { getOthersPercentageMapping } from "@utils/getOthersPercentageMapping";


export interface ChartSettingsProps {
    title: string;
    currentChart?: chartFilters;
    handleChartSelectionClick?: (timeFrame: chartFilters) => void;
    chartExportRef: React.RefObject<HTMLDivElement>;
    isDougnutChart?: boolean;
  }
  
  export const ChartSettings = ({ currentChart, handleChartSelectionClick, chartExportRef, isDougnutChart = false, title }: ChartSettingsProps) => {
    const [ showSettings, setShowSettings ] = useState<boolean>(false);
    const { state, dispatch } = useContext(StateContext);
    const { topProductsPercentage, showTopProducts } = state;
    // open the settings menu
    const handleSettingsClick = () => {
      setShowSettings(!showSettings);
    };

    const handleUpdateChartTimeFrame = (timeFrame: chartFilters) => {
      handleChartSelectionClick && handleChartSelectionClick(timeFrame);
      setShowSettings(false);
    }

    const handleCheckboxClick = () => {
      dispatch({ type: stateEnums.TOGGLE_USE_OTHERS_PERCENTAGE, payload: !showTopProducts });
    }

    const handleRangeSliderUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: stateEnums.OTHERS_PERCENTAGE, payload: parseInt(e.target.value)});
    }

    const handleDownload = async (type: string) => {
      if (!chartExportRef.current) {
        console.error("Reference is null. Cannot download the chart.");
        return;
      }
  
      await exportAsImage({
        element: chartExportRef.current, 
        imageFileName: title, 
        type: type
      });
    };

    return (
      <div className='chart-settings'>
        <IconOnlyButton 
          handleClick={handleSettingsClick}
          icon={<FaGear />}
          className={`chart-settings__icon ${showSettings ? 'settings-visible' : ''}`}
          ariaLabel={showSettings ? "Close Settings menu" : "Open Settings menu"}
        />
        <div 
          className={`chart-settings__options  ${showSettings ? 'options-visible' : ''}`}
          tabIndex={-1}
        >
          <div className="chart-selection">
            <span className="chart-selection__btn-header">Download Chart:</span>
            <div className="download-options">
              <Button 
                handleClick={() => handleDownload('jpeg')}
                icon={<TbFileDownload />}
                text="JPEG"
                className="download-option"
                iconOnRight
                tabIndex={showSettings ? 0 : -1}
              />
              <Button 
                handleClick={() => handleDownload('png')}
                icon={<TbFileDownload />}
                text="PNG"
                className="download-option"
                iconOnRight
                tabIndex={showSettings ? 0 : -1}
              />
            </div>
          </div>
          {isDougnutChart && (
            <>
            <div className="chart-selection">
              <span className="chart-selection__btn-header">Choose time frame:</span>
              <div className="chart-selection__buttons">
                <Button 
                  handleClick={() => handleUpdateChartTimeFrame('currentYear') }
                  text="Current Year"
                  className={currentChart === "currentYear" ? "chart-selected" : ""}
                  textCenter
                  tabIndex={showSettings ? 0 : -1}
                />
                <Button 
                  handleClick={() => handleUpdateChartTimeFrame('year')}
                  text="Year"
                  className={currentChart === "year" ? "chart-selected" : ""}
                  textCenter
                  tabIndex={showSettings ? 0 : -1}
                />
                <Button 
                  handleClick={() => handleUpdateChartTimeFrame('month')}
                  text="Month"
                  className={currentChart === "month" ? "chart-selected" : ""}
                  textCenter
                  tabIndex={showSettings ? 0 : -1}
                />
              </div>
            </div>
            <div className="chart-selection" style={{ backgroundColor: '#f7f7f7'}}>
              <span className="chart-selection__btn-header">Product filters</span>
              <div className="chart-selection__buttons">
                <div className="chart-settings__section-container">
                  <label htmlFor="showOthers" className='check-container'>
                    <span className='checkbox-label'>Show top savings products only:</span>
                    <input
                      id="showOthers"
                      type='checkbox'
                      className='checkbox'
                      checked={state.showTopProducts}
                      onChange={() => handleCheckboxClick()}
                      tabIndex={showSettings ? 0 : -1}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="chart-selection__buttons slider-container">
                <div className="chart-settings__section-container slider">
                  <label htmlFor="range" style={{ color: `${showTopProducts ? '#000000' : '#aaaaaa'}` }}>
                    {getOthersPercentageMapping(topProductsPercentage)} of products:
                  </label>
                  <input 
                    type='range' 
                    min='1'
                    max='5'
                    id='range'
                    value={state.topProductsPercentage} 
                    onChange={(e) => handleRangeSliderUpdate(e)} 
                    disabled={!state.showTopProducts}
                    tabIndex={showSettings ? 0 : -1}
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
