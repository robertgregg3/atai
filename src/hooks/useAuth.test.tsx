import { StateContext } from "@context/StateProvider";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { stateEnums } from "@context/reducer";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

vi.mock('react-router-dom', () => ({ useNavigate: vi.fn() }));

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(() => {}),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    updateUserProfile: vi.fn(),
}));

vi.mock('../firebaseConfig', () => ({
    auth: {},
}));


describe("useAuth", () => {
    const mockDispatch = vi.fn();

    const initialState = {
        user: null,
        data: [],
        sidebarOpen: false,
        isLoading: false,
        displayName: '',
    }

    const name = 'Rob';
    const email = 'test@test.com';
    const password = 'password';

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as any).mockReturnValue(vi.fn());
    });

    const wrapper = ({ children }: { children: React.ReactNode}) => (
        <StateContext.Provider value={{state: initialState, dispatch: mockDispatch}}>
            {children}
        </StateContext.Provider>
    );

    it("should sign in a user", async () => {
        (signInWithEmailAndPassword as any).mockResolvedValue({
            user: { displayName: 'Rob' },
        });
        
        // the second parameter is what wraps the hook
        const { result } = renderHook(() => useAuth({ email, password, name}), { wrapper });
        
        // Test the signIn function. The first await is for the re-rendering of the component, the second is for the signIn function
        await act(async () => {
           await result.current.signIn();
        });

        // Empty object represents the auth object which is mocked at the top of the test, 
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, email, password) 

        expect(mockDispatch).toHaveBeenCalledWith({
            type: stateEnums.SET_USER,
            payload: {
                user: { displayName: name },
                displayName: name,
            },
        });
    });

    it('Should handle sign in error', async () => {
        (signInWithEmailAndPassword as any).mockResolvedValue({
            user: null,
        });

        const { result } = renderHook(() => useAuth({ email, password, name }), { wrapper });

        await act(async () => {
            await result.current.signIn();
        });

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, email, password);

        expect(mockDispatch).not.toHaveBeenCalled();
    })

    it('should register a user', async () => {
        (createUserWithEmailAndPassword as any).mockResolvedValue({
            user: { displayName: 'Rob'}
        })

        const { result } = renderHook(() => useAuth({ email, password, name }), { wrapper });

        await act(async () => {
            await result.current.register();
        });

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, email, password);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: stateEnums.SET_USER,
            payload: {
                displayName: name,
                user: {
                    displayName: name,
                },
            },
        });
    });

    it('should handle register error', async () => {
        (createUserWithEmailAndPassword as any).mockResolvedValue({
            user: null,
        });

        const { result } = renderHook(() => useAuth({email, password, name}), { wrapper});

        await act(async () => {
            await result.current.register();
        })

        expect(mockDispatch).not.toHaveBeenCalled();
    });
});