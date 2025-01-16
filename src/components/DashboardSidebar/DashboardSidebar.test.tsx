import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { DashboardSidebar } from '@components';
import { StateContext } from "../../context/StateProvider";
import { afterEach, describe, expect, it, vi } from 'vitest'; 
import { InitialStateProps, stateEnums } from '@context/reducer';
import userEvent from '@testing-library/user-event';
import logoutUser from '@utils/logoutUser';

afterEach(cleanup)

// Mocking the logoutUser function
vi.mock('@utils/logoutUser', () => ({ default: vi.fn(() => Promise.resolve())}));

// intercept the firebase/auth request
vi.mock('@firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: null  })),
  signOut: vi.fn(() => Promise.resolve()), // Simulate successful sign-out
}));

// Mock `useNavigate` to return a mock function
vi.mock('react-router-dom', () => ({  useNavigate: vi.fn(() => vi.fn())}));

const mockDispatch = vi.fn();

describe('DashboardSidebar', () => {
  const mockHandleSavingsTotals = vi.fn();
  const mockHandleCostCentreSavings = vi.fn();
  const mockHandleEnvironmentData = vi.fn();
  const mockHandleProductSavingsData = vi.fn();
  
  // Default state for the context provider
  const defaultState: InitialStateProps = { 
    sidebarOpen: true,
    user: null,
    data: [],
    displayName: '',
    isLoading: false
  };

  const renderWithState = (state: InitialStateProps) => {
    return render(
      <StateContext.Provider value={{ state, dispatch: mockDispatch }}>
        <DashboardSidebar
          handleSavingsTotals={mockHandleSavingsTotals}
          handleCostCentreSavings={mockHandleCostCentreSavings}
          handleEnvironmentData={mockHandleEnvironmentData}
          handleProductSavingsData={mockHandleProductSavingsData}
        />
      </StateContext.Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the sidebar and buttons', () => {
    renderWithState(defaultState);

    // Check if the sidebar is open and the toggle icon is rendered
    expect(screen.getByLabelText('Close Sidebar')).toBeInTheDocument();
    
    // Check if the navigation buttons are rendered
    expect(screen.getByText('Savings Totals')).toBeInTheDocument();
    expect(screen.getByText('Cost Centre Savings')).toBeInTheDocument();
    expect(screen.getByText('Environment Savings')).toBeInTheDocument();
    expect(screen.getByText('Product Savings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls handleSavingsTotals on click of Savings Totals button', async () => {
    renderWithState(defaultState);

    const button = screen.getByLabelText('Savings Totals');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleSavingsTotals).toHaveBeenCalled();
    });
  });

  it('calls handleCostCentreSavings on click of Cost Centre Savings button', async () => {
    renderWithState(defaultState);

    const button = screen.getByLabelText('Cost Centre Savings');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleCostCentreSavings).toHaveBeenCalled();
    });
  });

  it('calls handleEnvironmentData on click of Environment Savings button', async () => {
    renderWithState(defaultState);

    const button = screen.getByLabelText('Environment Savings');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleEnvironmentData).toHaveBeenCalled();
    });
  });

  it('calls handleProductSavingsData on click of Product Savings button', async () => {
    renderWithState(defaultState);

    const button = screen.getByLabelText('Product Savings');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleProductSavingsData).toHaveBeenCalled();
    });
  });

  it('calls logout on click of Logout button', async () => {
    renderWithState(defaultState);

    const button = screen.getByText('Logout');

    fireEvent.click(button);

    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalled();
    });
  });
  
  it('Opens the sidebar when its closed and the menu button is clicked', async () => {
    renderWithState({ ...defaultState, sidebarOpen: false });
  
    const button = screen.getByLabelText("Open Sidebar");
    expect(button).toBeInTheDocument();
  
    await userEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: stateEnums.TOGGLE_SIDEBAR,
      payload: true,
    });
  });

  it('Closes the sidebar when the side bar is open and the menu button is clicked', async () => {
    renderWithState(defaultState);

    const button = screen.getByLabelText("Close Sidebar");

    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: stateEnums.TOGGLE_SIDEBAR,
      payload: false
    })
  });
});