import { Button } from "@components/ui";
import { FaUser } from "react-icons/fa6";
import { SlLogout } from "react-icons/sl";
import { UserDialogContent } from "@components/DashboardHeader";
import './UserSettingsNav.css';


interface UserSettingsNavProps {
    showUserNav: boolean;
    handleUserSettingsNavClick: (content: UserDialogContent) => void;
    navigate: (arg: string) => void; // passed as a prop as it is needed in a dialog
}

export const UserSettingsNav = ({ showUserNav, handleUserSettingsNavClick, navigate }: UserSettingsNavProps) => {
    return (
        <>
            <ul className="user-settings-nav">
                <li>
                    <Button
                        text="Profile Details"
                        handleClick={() => handleUserSettingsNavClick('profile')}
                        icon={<FaUser />}
                        tabIndex={showUserNav ? 0 : -1}
                    />
                </li>
                <li>
                    <Button
                        text="Logout"
                        handleClick={() => handleUserSettingsNavClick('logout')}
                        icon={<SlLogout />}
                        tabIndex={showUserNav ? 0 : -1}
                    />
                </li>
            </ul>
        </>
    )
}