import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "@components";
import { StateContext } from "@context/StateProvider";
import { useNavigate } from "react-router-dom";

vi.mock('react-router-dom', () => ({ useNavigate: vi.fn() }));

// Define the mock functions at the top level
const mockedSignin = vi.fn();
const mockedRegister = vi.fn();

vi.mock("@hooks/useAuth", () => ({
    default: () => ({
        error: null,
        signIn: mockedSignin,
        register: mockedRegister,
    }),
}));

describe("LoginForm", () => {
    const defaultState = {
        showTopProducts: true,
        data: [],
        isLoading: false,
        sidebarOpen: false,
        user: null,
        displayName: "Rob",
    };

    const mockDispatch = vi.fn();

    const renderWithProps = (login: boolean) => {
        render(
            <StateContext.Provider value={{ state: defaultState, dispatch: mockDispatch }}>
                <LoginForm login={login} />
            </StateContext.Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as any).mockReturnValue(vi.fn());
        mockedSignin.mockImplementation(() => Promise.resolve());
    });

    it("should render the login form when login is true", () => {
        renderWithProps(true);

        const loginButton = screen.getByRole("button", { name: /login/i });
        expect(loginButton).toBeInTheDocument();
    });

    it("should render the create account form when login is false", () => {
        renderWithProps(false);

        const createAccount = screen.getByRole("button", { name: /Create ATAINR Account/i });
        expect(createAccount).toBeInTheDocument();
    });

    it("Calls signin when login is true", async () => {
        renderWithProps(true);

        fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
        fireEvent.submit(screen.getByRole("form"));

        await waitFor(() => expect(mockedSignin).toHaveBeenCalled());
    });

    it("navigates to /dashboard after login", async () => {
        const mockNavigate = vi.fn();
        (useNavigate as any).mockReturnValue(mockNavigate);

        renderWithProps(true);

        fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
        fireEvent.submit(screen.getByRole("form"));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/dashboard"));
    });
});