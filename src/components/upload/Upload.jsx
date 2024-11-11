import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ataiLogo from "../../images/atai2.svg";
import "./upload.css";

const Upload = () => {
  const [exclude1, setExclude1] = useState("");
  const [exclude2, setExclude2] = useState("");
  const [exclude3, setExclude3] = useState("");
  const [exclude4, setExclude4] = useState("");
  const [outputFileName, setOutputFileName] = useState("");
  const history = useHistory();

  const handleRegister = () => {
    history.push("/dashboard");
  };
  return (
    <div className="upload">
      <div className="upload__container">
        <div className="upload__container-header">
          <img alt="Atainr Logo" src={ataiLogo} />
          <h2 style={{ textAlign: "center" }}>Upload and Format CSV</h2>
        </div>
        <form>
          <input
            value={exclude1}
            placeholder="Exclude Phrase (i.e. SAP)"
            onChange={(e) => setExclude1(e.target.value)}
          />
          <input
            value={exclude2}
            placeholder="Exclude Phrase (i.e. Rabbit)"
            onChange={(e) => setExclude2(e.target.value)}
          />
          <input
            value={exclude3}
            placeholder="Exclude Phrase (i.e. Keep Online)"
            onChange={(e) => setExclude3(e.target.value)}
          />
          <input
            value={exclude4}
            placeholder="Fiscal Year End (eg. Mar 22)"
            onChange={(e) => setExclude4(e.target.value)}
          />
          <input
            className="file_upload"
            id="upload"
            type="file"
            value={outputFileName}
            placeholder="Output FileName"
            onChange={(e) => setOutputFileName(e.target.value)}
          />

          <button onClick={handleRegister}>Cancel</button>
          <button type="submit" onClick={handleRegister}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};
export default Upload;
