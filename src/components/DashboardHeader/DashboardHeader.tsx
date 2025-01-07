import { RiAccountCircleFill } from "react-icons/ri";
import { StateContext } from "@context/StateProvider";
import { useContext, useEffect, useState } from "react";
import "./DashboardHeader.css";

interface DashboardHeaderProps {
  title: string;
  displayName?: string;
}

export const DashboardHeader = ({ title, displayName }: DashboardHeaderProps) => {
  const [ chartTitle, setChartTitle ] = useState<string>('Savings Chart');
  const { sidebarOpen } = useContext(StateContext).state;

  useEffect(() => {
    setChartTitle(title);
  }, [title]);

  return (
    <header>
      <h6 className={`${sidebarOpen ? 'dashboard-title--sidebar-open' : ''}`}>{chartTitle}</h6>
      <div className="user-info">
        {displayName && <span data-testid='user-info'>Hi, {displayName}</span>}
        <RiAccountCircleFill />
      </div>
    </header>
  );
};
