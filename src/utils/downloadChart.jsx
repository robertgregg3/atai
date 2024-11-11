import exportAsImage from "./exportAsImage";
import { Form } from "react-bootstrap";

const DownloadChart = ({ reference, title }) => {
  const handleDownload = async (e, chartTitle) => {
    // debugger;
    const selectedType = e.target.value;
    if (selectedType) {
      // Call exportAsImage with the selected file type
      await exportAsImage(reference, chartTitle, selectedType);
      // Reset the dropdown to its initial state
      e.target.value = "";
    }
  };

  return (
    <div className="download-chart">
      <Form.Select
        aria-label="Download Chart"
        defaultValue=""
        onChange={(e) => handleDownload(e, title)}>
        <option className="select-option" value="">
          Download Chart
        </option>
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

export default DownloadChart;
