import { StateContext } from "@context/StateProvider";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { InitialStateProps, stateEnums } from "@context/reducer";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

vi.mock('react-router-dom', () => ({ useNavigate: vi.fn() }));

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(() => ({})),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    updateUserProfile: vi.fn(),
}));

describe("useAuth", () => {
    const mockDispatch = vi.fn();

    const initialState: InitialStateProps = {
        user: null,
        data: [],
        sidebarOpen: false,
        isLoading: false,
        displayName: '',
        email: '',
        toasts: [],
        showDialog: false,
        dialogContent: null,
    }

    const name: string = 'Rob';
    const email: string = 'test@test.com';
    const password: string = 'password';

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
            user: { displayName: 'Rob', email: 'test@test.com' }
        });
        
        // the second parameter is what wraps the hook
        const { result } = renderHook(() => useAuth({ email, password, name}), { wrapper });
        
        await act(async () => {
           await result.current.signIn();
        });

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), email, password) 

        expect(mockDispatch).toHaveBeenCalledWith({
            type: stateEnums.SET_USER,
            payload: {
                user: { 
                    displayName: name, 
                    email: email 
                },
                displayName: name,
                email: email,
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

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), email, password);

        expect(mockDispatch).not.toHaveBeenCalled();
    })

    it('should register a user', async () => {
        (createUserWithEmailAndPassword as any).mockResolvedValue({
            user: { displayName: 'Rob', email: 'test@test.com' }
        })

        const { result } = renderHook(() => useAuth({ email, password, name }), { wrapper });

        await act(async () => {
            await result.current.register();
        });

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), email, password);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: stateEnums.SET_USER,
            payload: {
                user: { 
                    displayName: name, 
                    email: email 
                },
                displayName: name,
                email: email,
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