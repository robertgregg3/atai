import { RiMenuFold4Fill, RiMenuFold3Fill } from "react-icons/ri";
import { StateContext } from "../../context/StateProvider";
import { MdBarChart } from "react-icons/md";
import { BiSolidDoughnutChart } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { useContext } from "react";
import { stateEnums } from "../../context/reducer";
import ataiLogo from "../../images/atai1.svg";
import useLogout from "@hooks/logout";
import Button from "@components/ui/buttons/Button/Button";
import IconOnlyButton from "@components/ui/buttons/IconOnlyButton/IconOnlyButton";
import "./DashboardSidebar.css";

interface DashboardSidebarProps {
  handleSavingsTotals: () => void;
  handleCostCentreSavings: () => void;
  handleEnvironmentData: () => void;
  handleProductSavingsData: () => void;
}

const DashboardSidebar = ({
  handleSavingsTotals,
  handleCostCentreSavings,
  handleEnvironmentData,
  handleProductSavingsData,
}: DashboardSidebarProps) => {
  const { state, dispatch } = useContext(StateContext);
  const { sidebarOpen } = state;
  const logout = useLogout();

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

  return (
    <div
      className={`${sidebarOpen ? "sidebar--open" : "sidebar--closed"} sidebar`}
      tabIndex={0}
    >
      <IconOnlyButton 
        handleClick={handleSideBarToggle}
        icon={sidebarOpen ? <RiMenuFold3Fill /> : <RiMenuFold4Fill />}
        className="sidebar__menu-toggle"
      />
      <img alt="Atainr Logo" src={ataiLogo} />
      <div className="nav-container">
        <div className="nav-items">
          <Button 
            handleClick={handleSavingsTotalClick}
            icon={<MdBarChart />}
            text="Savings Totals"
            tabIndex={sidebarOpen ? 0 : -1}
          />
          <Button
            handleClick={handleCostCentreSavingsClick}
            icon={<MdBarChart />}
            text="Cost Centre Savings"
            tabIndex={sidebarOpen ? 0 : -1}
          />
          <Button
            handleClick={handleEnvironmentDataClick}
            icon={<MdBarChart />}
            text="Environment Savings"
            tabIndex={sidebarOpen ? 0 : -1}
          />
          <Button
            handleClick={handleProductSavingsDataClick}
            icon={<BiSolidDoughnutChart />}
            text="Product Savings"
            tabIndex={sidebarOpen ? 0 : -1}
          />
          <span className="separator"></span>
          <Button
            handleClick={logout}
            icon={<SlLogout />}
            text="Logout"
            tabIndex={sidebarOpen ? 0 : -1}
          />
          </div>
      </div>
      <div className="logo__and__copyright">
        <span>Copyright © 2021. All Rights Reserved.</span> <br />
        <span>ATAINR™ are registered trademarks owned by ATAINR Ltd.</span>
      </div>
    </div>
  );
};

export default DashboardSidebar;
