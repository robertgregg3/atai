import { RiAccountCircleFill } from "react-icons/ri";
import { StateContext } from "@context/StateProvider";
import { memo, useContext, useEffect, useState } from "react";
import "./DashboardHeader.css";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  const [ chartTitle, setChartTitle ] = useState<string>('Savings Chart');
  const { displayName, sidebarOpen } = useContext(StateContext).state;

  useEffect(() => {
    setChartTitle(title);
  }, [title]);

  return (
    <header>
      <h6 className={`${sidebarOpen ? 'dashboard-title--sidebar-open' : ''}`}>{chartTitle}</h6>
      <div className="user-info">
        <span>Hi, {displayName}</span>
        <RiAccountCircleFill />
      </div>
    </header>
  );
};

export default memo(DashboardHeader);
