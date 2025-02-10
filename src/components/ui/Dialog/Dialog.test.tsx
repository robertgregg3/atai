import { StateContext } from "@context/StateProvider";
import { render, screen } from "@testing-library/react";
import { mockInitialState } from "../../../data/mockData";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./Dialog";
import { UserSettingsNav } from "@components/UserSettingsNav";
import { useNavigate } from "react-router-dom";
import { ProfileContent } from "@components/UserSettingsNav/UserSettingsContent/ProfileContent";

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn()
}));

const mockDispatch = vi.fn();

describe('Dialog', () => {
    const profileContent = <ProfileContent />;
        
    const renderComponentWithDialogProfileContent = () => render(
        <StateContext.Provider 
            value={{ state: {
                    ...mockInitialState, 
                    showDialog: true, 
                    dialogContent: profileContent
                }, 
                dispatch: mockDispatch}
            }
        >
            <UserSettingsNav 
                showUserNav={true}
                handleUserSettingsNavClick={vi.fn()}
                navigate={useNavigate()}
            />
            <Dialog>
                {profileContent}
            </Dialog>
        </StateContext.Provider>
    )

    it('should render the dialog component', async () => {
        renderComponentWithDialogProfileContent();

        const dialog = await screen.findByTestId('dialog-content');

       await expect(dialog).toBeInTheDocument();
    });
})