import { ChangeEvent } from "react";
import exportAsImage from "./exportAsImage";
import "../App.css";

interface DownloadChartProps {
  reference: HTMLDivElement | null;
  title: string;
}

const DownloadChart = ({ reference, title }: DownloadChartProps) => {
  const handleDownload = async (e: ChangeEvent<HTMLSelectElement>, title: string) => {
    const selectedType = e.target.value;
    if (selectedType) {
      // Call exportAsImage with the selected file type
      await exportAsImage({element: reference, imageFileName: title, type: selectedType});
      // Reset the dropdown to its initial state
      e.target.value = "";
    }
  };

  return (
    <select
      aria-label="Download Chart"
      defaultValue=""
      onChange={(e) => handleDownload(e, title)}
      className="download-select">
      <option className="select-option" value="">
        Download Chart
      </option>
      <option className="select-option" value="jpeg">
        JPEG
      </option>
      <option className="select-option" value="png">
        PNG
      </option>
    </select>
  );
};

export default DownloadChart;
