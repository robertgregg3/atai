import { RiAccountCircleFill } from "react-icons/ri";
import { StateContext } from "@context/StateProvider";
import { useContext } from "react";
import "./DashboardHeader.css";

interface DashboardHeaderProps {
  chartTitle: string;
}

const DashboardHeader = ({ chartTitle }: DashboardHeaderProps) => {
  const { state } = useContext(StateContext);
  const { displayName, sidebarOpen } = state;

  return (
    <header>
      <h6 className={`${sidebarOpen ? 'dashboard-title--sidebar-open' : ''}`}>{chartTitle}</h6>
      <div className="user-info">
        <span>
          Hi, {displayName} <RiAccountCircleFill />
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;
