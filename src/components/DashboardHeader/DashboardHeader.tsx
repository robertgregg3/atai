import { RiAccountCircleFill } from "react-icons/ri";
import { StateContext } from "@context/StateProvider";
import { useContext, useEffect, useState } from "react";
import { FlyoutNav, IconOnlyButton } from "@components/ui";
import { UserSettingsNav } from "@components/UserSettingsNav";
import { stateEnums } from "@context/reducer";
import { useNavigate } from "react-router-dom";
import { useHandleDialog } from "@components/ui/Dialog/hooks/useDialog";
import { LogoutContent } from "@components/UserSettingsNav/UserSettingsContent/LogoutUserContent";
import "./DashboardHeader.css";

export interface DashboardHeaderProps {
  title: string;
  displayName?: string;
}

export type UserDialogContent = 'profile' | 'logout';

export const ProfilContent = () => <p data-testid='profile-content'>Profile</p>

export const DashboardHeader = ({ title, displayName }: DashboardHeaderProps) => {
  const [ chartTitle, setChartTitle ] = useState<string>('Savings Chart');
  const [ showUserNav, setShowUserNav ] = useState<boolean>(false);
  const { state, dispatch } = useContext(StateContext);
  const { sidebarOpen, showSettings } = state;
  const navigate = useNavigate();
  const { handleDialogClick } = useHandleDialog();   

  useEffect(() => {
    setChartTitle(title);
  }, [title]);

  const handleUserOptionsClick = () => {
    // If the chart settings is already open then close it
    if(showSettings) {
      dispatch({
        type: stateEnums.SHOW_SETTINGS,
        payload: false
      })
    }
    setShowUserNav(!showUserNav);
  }

  const handleUserSettingsNavClick = (content: UserDialogContent) => {
        setShowUserNav(false);
        handleDialogClick(
            content === 'profile' 
                ? <ProfilContent /> 
                : <LogoutContent navigate={navigate} />
        );
    }

  return (
    <header>
      <h6 className={`${sidebarOpen ? 'dashboard-title--sidebar-open' : ''}`}>{chartTitle}</h6>
      <div className="user-info">
        {displayName && <span data-testid='user-info'>Hi, {displayName}</span>}
        <IconOnlyButton 
          className="user-info__button"
          icon={<RiAccountCircleFill />}
          handleClick={() => handleUserOptionsClick()}
          ariaLabel="User Account"
        />
        <FlyoutNav showNav={showUserNav} flyoutFrom="top">
          <UserSettingsNav 
            showUserNav={showUserNav}
            handleUserSettingsNavClick={handleUserSettingsNavClick}
            navigate={navigate} />
        </FlyoutNav>
      </div>
    </header>
  );
};
