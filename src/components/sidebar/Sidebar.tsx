import { RiMenuFold4Fill, RiMenuFold3Fill } from "react-icons/ri";
import { StateContext } from "../../context/StateProvider";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { MdBarChart } from "react-icons/md";
import { BiSolidDoughnutChart } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { useContext } from "react";
import { stateEnums } from "../../context/reducer";
import ataiLogo from "../../images/atai1.svg";
import "./sidebar.css";

interface SidebarProps {
  handleSavingsTotals: () => void;
  handleCostCentreSavings: () => void;
  handleEnvironmentData: () => void;
  handleProductSavingsData: () => void;
}

const Sidebar = ({
  handleSavingsTotals,
  handleCostCentreSavings,
  handleEnvironmentData,
  handleProductSavingsData,
}: SidebarProps) => {
  const { state, dispatch } = useContext(StateContext);
  const { sidebarOpen } = state;
  const navigate = useNavigate();

  const handleSideBarToggle = () => {
    dispatch({ type: stateEnums.TOGGLE_SIDEBAR, payload: !sidebarOpen });
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

  const handleLogoutClick = (e: { preventDefault: () => void; } | undefined) => {
    e?.preventDefault();
    console.log(e);
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch({
        type: stateEnums.SET_USER,
        payload: {
          user: null,
          displayName: "",
        },
      });
    });
    navigate("/");
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
            <MdBarChart className="sidebar__icon" />
            Savings Totals
          </button>
          <button onClick={() => handleCostCentreSavingsClick()}>
            <MdBarChart className="sidebar__icon" />
            Cost Centre Savings
          </button>
          <button onClick={() => handleEnvironmentDataClick()}>
            <MdBarChart className="sidebar__icon" />
            Environment Savings
          </button>
          <button onClick={() => handleProductSavingsDataClick()}>
            <BiSolidDoughnutChart className="sidebar__icon" />
            Product Savings
          </button>
        </div>
        <div className="logout">
          <span className="separator"></span>
          <button onClick={(e) => handleLogoutClick(e)}>
            <SlLogout className="sidebar__icon" />
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
