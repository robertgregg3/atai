import { RiMenuFold4Fill, RiMenuFold3Fill } from "react-icons/ri";
import { useStateValue } from "../../Context/StateProvider";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
}) => {
  const [{ sidebarOpen }, dispatch] = useStateValue();
  const history = useHistory();

  const handleSideBarToggle = () => {
    dispatch({ type: "TOGGLE_SIDEBAR", sidebarOpen: !sidebarOpen });
  };

  const handleSavingsTotalClick = () => {
    handleSavingsTotals();
    handleSideBarToggle();
  };

  const handleCostCentreSavingsClick = () => {
    handleCostCentreSavings();
    handleSideBarToggle();
  };

  const handleEnvironmentDataClick = () => {
    handleEnvironmentData();
    handleSideBarToggle();
  };

  const handleProductSavingsDataClick = () => {
    handleProductSavingsData();
    handleSideBarToggle();
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
    <div
      className={`${
        sidebarOpen ? "sidebar--open" : "sidebar--closed"
      } sidebar`}>
      {sidebarOpen ? (
        <RiMenuFold3Fill onClick={handleSideBarToggle} />
      ) : (
        <RiMenuFold4Fill onClick={handleSideBarToggle} />
      )}
      <img alt="Atainr Logo" src={ataiLogo} />
      <div className="nav-container">
        <div className="nav-items">
          <button onClick={() => handleSavingsTotalClick()}>
            <BarChartIcon className="sidebar__icon" />
            Savings Totals
          </button>
          <button onClick={() => handleCostCentreSavingsClick()}>
            <BarChartIcon className="sidebar__icon" />
            Cost Centre Savings
          </button>
          <button onClick={() => handleEnvironmentDataClick()}>
            <BarChartIcon className="sidebar__icon" />
            Environment Savings
          </button>
          <button onClick={() => handleProductSavingsDataClick()}>
            <DonutLargeIcon className="sidebar__icon" />
            Product Savings
          </button>
        </div>
        <div className="logout">
          <span className="separator"></span>
          <button onClick={() => handleLogoutClick()}>
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
