import { RiMenuFold4Fill, RiMenuFold3Fill } from "react-icons/ri";
import { StateContext } from "../../context/StateProvider";
import { MdBarChart } from "react-icons/md";
import { BiSolidDoughnutChart } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { memo, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconOnlyButton, Button }  from "@components";
import { useToast } from "@components";
import { useToggleSidebar } from "./hooks/useToggleSidebar";
import { TOAST_DURATION } from "@utils";
import ataiLogo from "../../images/atai1.svg";
import "./DashboardSidebar.css";

interface DashboardSidebarProps {
  handleSavingsTotals: () => void;
  handleCostCentreSavings: () => void;
  handleEnvironmentData: () => void;
  handleProductSavingsData: () => void;
  logoutClick: () => Promise<void>;
}

export const DashboardSidebar = memo(({
  handleSavingsTotals,
  handleCostCentreSavings,
  handleEnvironmentData,
  handleProductSavingsData,
  logoutClick
}: DashboardSidebarProps) => {
  const { state } = useContext(StateContext);
  const { sidebarOpen } = state;
  const { addToast } = useToast();
  const { toggleSidebar } = useToggleSidebar()
  const navigate = useNavigate();

  const handleSideBarToggle = useCallback(() => {
    toggleSidebar(sidebarOpen);
  }, [sidebarOpen])

  const handleSavingsTotalClick = useCallback(() => {
    handleSavingsTotals();
    handleSideBarToggle();
    navigate('/charts/savings');
  }, [handleSavingsTotals, handleSideBarToggle]);
  
  const handleCostCentreSavingsClick = useCallback(() => {
    handleCostCentreSavings();
    handleSideBarToggle();
    navigate('/charts/cost');
  }, [handleCostCentreSavings, handleSideBarToggle]);
  
  const handleEnvironmentDataClick = useCallback(() => {
    handleEnvironmentData();
    handleSideBarToggle();
    navigate('/charts/environment');
  }, [handleEnvironmentData,handleSideBarToggle]);
  
  const handleProductSavingsDataClick = useCallback(() => {
    handleProductSavingsData();
    handleSideBarToggle();
    navigate('/charts/product?timeframe=current-year');
  }, [handleEnvironmentData, handleSideBarToggle]);

  const handleLogout = () => {
    logoutClick();
    addToast({
      id: 1,
      message: 'Logout successful',
      position: 'bottom-right',
      status: 'info',
      duration: TOAST_DURATION
    })
    navigate('/login');
  }

  return (
    <nav 
      className={`${sidebarOpen ? "sidebar--open" : "sidebar--closed"} sidebar`}
      aria-label='sidebar'
    >
      <IconOnlyButton 
        handleClick={handleSideBarToggle}
        icon={sidebarOpen ? <RiMenuFold3Fill /> : <RiMenuFold4Fill />}
        className="sidebar__menu-toggle"
        ariaLabel={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      />
      <img alt="Atainr Logo" src={ataiLogo} width='100px' height='100px' loading='lazy' />
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
            handleClick={handleLogout}
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
    </nav>
  );
});
