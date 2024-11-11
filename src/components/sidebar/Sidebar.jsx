import ataiLogo from "../../images/atai1.svg";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import LogoutIcon from "@mui/icons-material/Logout";
import "./sidebar.css";

const Sidebar = ({
  handleSavingsTotals,
  handleCostCentreSavings,
  handleEnvironmentData,
  handleProductSavingsData,
  handleLogout,
}) => {
  return (
    <div className="sidebar">
      <img alt="Atainr Logo" src={ataiLogo} />
      <div className="nav-container">
        <div className="nav-items">
          <button onClick={handleSavingsTotals}>
            <BarChartIcon className="sidebar__icon" />
            Savings Totals
          </button>
          <button onClick={handleCostCentreSavings}>
            <BarChartIcon className="sidebar__icon" />
            Cost Centre Savings
          </button>
          <button onClick={handleEnvironmentData}>
            <BarChartIcon className="sidebar__icon" />
            Environment Savings
          </button>
          <button onClick={handleProductSavingsData}>
            <DonutLargeIcon className="sidebar__icon" />
            Product Savings
          </button>
        </div>
        <div className="logout">
          <span className="separator"></span>
          <button onClick={handleLogout}>
            <LogoutIcon className="sidebar__icon" />
            Logout
          </button>
        </div>
      </div>
      <div className="logo__and__copyright">
        <span>Copyright © 2021. All Rights Reserved.</span> <br />
        <span>ATAINR™ are registered trademarks owned by ATAINR Ltd.</span>
      </div>
    </div>
  );
};

export default Sidebar;
