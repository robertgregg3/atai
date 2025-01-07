import { describe, expect, it, vi } from "vitest";
import { LoginPage } from "@components";
import { render, screen } from "@testing-library/react";
import { InitialStateProps } from "@context/reducer";
import { StateContext } from "@context/StateProvider";

vi.mock('react-router-dom', () => ({ useNavigate: vi.fn()}))

describe('LoginPage', () => {
    const defaultState: InitialStateProps = { 
        topProductsPercentage: 1,
        showTopProducts: true,
        data: [],
        isLoading: false,
        sidebarOpen: false,
        user: null,
        displayName: 'Rob'
    }

    const mockDispatch = vi.fn();

    const renderComponent = () => {
        render(
            <StateContext.Provider value={{ state: defaultState, dispatch: mockDispatch }}>
                <LoginPage />
            </StateContext.Provider>
        );
    }

    it('should render the login page', () => {
        renderComponent();

        const containingDiv = screen.getByRole('main');
        expect(containingDiv).toBeInTheDocument();

        const logoImage = screen.getByAltText(/Atainr Logo/i);
        expect(logoImage).toBeInTheDocument();
    });
})