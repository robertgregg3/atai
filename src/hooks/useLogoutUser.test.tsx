import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi, Mock } from "vitest";
import { act } from "react";
import { stateEnums } from "@context/reducer";
import { useLogoutUser } from "@hooks";
import { StateContext } from "@context/StateProvider";
import { mockInitialState } from "../data/mockData";
import { getAuth, signOut } from 'firebase/auth';

// Any request via firebase/auth will be intercepted and the values will be returned in the tests. 
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: { uid: "123" } })), 
  signOut: vi.fn(() => Promise.resolve()), // Simulate a successful logout
}));

describe('logoutUser', () => {
  const mockDispatch = vi.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <StateContext.Provider value={{ state: mockInitialState, dispatch: mockDispatch }}>
      {children}
    </StateContext.Provider>
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls the useNavigate function and dispatch function when logging out', async () => {
    const { result } = renderHook(() => useLogoutUser(), { wrapper });

    await act(async () => {
      await result.current.logoutUser(); // Call the returned logout function
    });

    expect(getAuth).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: stateEnums.SET_USER,
      payload: {
        user: null,
        displayName: "",
        email: ''
      },
    });  
  });

  it('logs an error if signOut fails', async () => {
    const error = new Error('Logout failed');
    (signOut as Mock).mockRejectedValueOnce(error);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useLogoutUser(), { wrapper });

    await act(async () => {
      await result.current.logoutUser();
    });

    expect(getAuth).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith("Logout failed:", error);

    consoleErrorSpy.mockRestore();
  });
})