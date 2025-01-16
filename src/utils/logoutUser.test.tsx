import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { InitialStateProps, stateEnums } from "@context/reducer";
import logoutUser from "../utils/logoutUser";

// Any request via firebase/auth will be intercepted and the values will be returned in the tests. 
vi.mock('@firebase/auth', () => ({
  getAuth: vi.fn(() => ({ user: null })),
  signOut: vi.fn(() => Promise.resolve())
}))

const dispatch = vi.fn();

const initialState: InitialStateProps = {
  user: null,
  data: [],
  sidebarOpen: false,
  isLoading: false,
  displayName: ''
}

describe('logoutUser', () => {
  // after each test 
  afterEach(() => vi.clearAllMocks());

  it('calls the useNavigate function and dispatch function when logging out', async () => {
    const { result } = renderHook(() => logoutUser({dispatch}));

    // Invoke the hook's logout function
    await act(async () => {
      result.current;
    })

    // Assertions
    expect(dispatch).toHaveBeenCalledWith({
      type: stateEnums.SET_USER,
      payload: {
        user: null,
        displayName: '',
      },
    });
  })
})