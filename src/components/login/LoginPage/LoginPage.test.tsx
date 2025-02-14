import { describe, expect, it, vi } from "vitest";
import { LoginPage } from "@components";
import { render, screen } from "@testing-library/react";
import { StateContext } from "@context/StateProvider";
import { mockInitialState } from "../../../data/mockData";

vi.mock('react-router-dom', () => ({ useNavigate: vi.fn()}))

describe('LoginPage', () => {
    const mockDispatch = vi.fn();

    const renderComponent = () => {
        render(
            <StateContext.Provider value={{ state: mockInitialState, dispatch: mockDispatch }}>
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