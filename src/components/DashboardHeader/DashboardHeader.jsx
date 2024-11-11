import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./DashboardHeader.css";

const DashboardHeader = ({ displayName, chartTitle }) => {
  return (
    <div className="header">
      <h6>{chartTitle}</h6>
      <div className="user-info">
        <span>
          Hi, {displayName} <AccountCircleIcon />
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;
