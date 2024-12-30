import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { act } from "react";
import DashboardSidebar from './DashboardSidebar';
import { StateContext } from "../../context/StateProvider";
import { afterEach, describe, expect, it, vi } from 'vitest'; 
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

describe('DashboardSidebar', () => {
  const mockHandleSavingsTotals = vi.fn();
  const mockHandleCostCentreSavings = vi.fn();
  const mockHandleEnvironmentData = vi.fn();
  const mockHandleProductSavingsData = vi.fn();
  
  // Default state for the context provider
  const defaultState = {
    sidebarOpen: true,
  };

  const renderWithState = (state: any) => {
    return render(
      <StateContext.Provider value={{ state, dispatch: vi.fn() }}>
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
  
  it('Toggles the sidebar when the menu button is clicked', async () => {
    const mockDispatch = vi.fn();
    const state = { 
      sidebarOpen: false,
      user: null,
      data: [],
      displayName: '',
      isLoading: false
    };
    
    render(
      <StateContext.Provider value={{ state: state, dispatch: mockDispatch }}>
        <DashboardSidebar
          handleSavingsTotals={vi.fn()}
          handleCostCentreSavings={vi.fn()}
          handleEnvironmentData={vi.fn()}
          handleProductSavingsData={vi.fn()}
        />
      </StateContext.Provider>
    );
  
    const button = screen.getByLabelText("Open Sidebar");
    expect(button).toBeInTheDocument();
  
    button.click();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_SIDEBAR",
      payload: true,
    });
  });
});