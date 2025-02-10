import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { StateContext } from "@context/StateProvider";
import { mockInitialState } from "../../data/mockData";
import { Dialog, UserSettingsNav } from "@components";
import { LogoutContent } from "./UserSettingsContent/LogoutUserContent";
import { ProfileContent } from "./UserSettingsContent/ProfileContent";

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn()
}))

describe('UserSettingsNav', () => {
    const mockHandleUserSettingsNavClick = vi.fn();
    const mockDispatch = vi.fn();
    
    const renderComponent = () => render(
        <StateContext.Provider value={{ state: mockInitialState, dispatch: mockDispatch}}>
            <UserSettingsNav 
                showUserNav={true}
                handleUserSettingsNavClick={mockHandleUserSettingsNavClick}
                navigate={useNavigate()}
            />
        </StateContext.Provider>
    )
    const profileContent = <ProfileContent />;
    
    const renderComponentWithDialogProfileContent = () => render(
        <StateContext.Provider value={{ state: {...mockInitialState, showDialog: true, dialogContent: profileContent}, dispatch: mockDispatch}}>
            <UserSettingsNav 
                showUserNav={true}
                handleUserSettingsNavClick={mockHandleUserSettingsNavClick}
                navigate={useNavigate()}
            />
            <Dialog>
                {profileContent}
            </Dialog>
        </StateContext.Provider>
    )
    
    const logoutContent = <LogoutContent navigate={useNavigate} />;

    const renderComponentWithDialogLogoutContent = () => render(
        <StateContext.Provider value={{ state: {...mockInitialState, showDialog: true, dialogContent: logoutContent}, dispatch: mockDispatch}}>
            <UserSettingsNav 
                showUserNav={true}
                handleUserSettingsNavClick={mockHandleUserSettingsNavClick}
                navigate={useNavigate()}
            />
            <Dialog>
                {logoutContent}
            </Dialog>
        </StateContext.Provider>
    )

    it('should render the UserSettingsNav component', () => {
        renderComponent();

        const profileButton = screen.getByRole('button', { name: /profile details/i });
        const logoutButton = screen.getByRole('button', { name: /Logout/i });

        expect(profileButton).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
    });

    it('should call open the dialog with the profile info', async () => {
        renderComponentWithDialogProfileContent();

        const profileButton = screen.getByRole('button', { name: /profile details/i });

        fireEvent.click(profileButton);

        expect(mockHandleUserSettingsNavClick).toHaveBeenCalledWith('profile');
        
        const dialog = await screen.findByTestId('dialog-content');

        await waitFor(() => expect(dialog).toBeInTheDocument());

        const profileContainer = await screen.findByTestId('profile-content');
        expect(profileContainer).toBeInTheDocument();
    });
  
    it('should call open the dialog with the logout info', async () => {
        renderComponentWithDialogLogoutContent();

        const dialog = await screen.findByTestId('dialog-content');
        await waitFor(() => expect(dialog).toBeInTheDocument());

        const logoutContainer = await screen.findByTestId('logout-content');
        expect(logoutContainer).toBeInTheDocument();
    });
});