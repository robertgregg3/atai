import { describe, expect, it, vi } from "vitest";
import { User as FirebaseUser } from "firebase/auth";
import { updateUser } from "@utils";
import { stateEnums } from "@context/reducer";

describe('updateUser', () => {
    const mockDispatch = vi.fn();
    
    it('Should call the dispatch function with the passed in props with a successful auth user', async () => {
        const mockAuthUser = {
            displayName: 'Some name',
            emailVerified: false,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: '',
            tenantId: '',
            uid: '',
            email: '',
            phoneNumber: '',
            photoURL: '',
            providerId: '',
            delete: vi.fn(),
            getIdToken: vi.fn().mockResolvedValue(''),
            getIdTokenResult: vi.fn().mockResolvedValue({}),
            reload: vi.fn(),
            toJSON: vi.fn().mockReturnValue({}),
        } as FirebaseUser;

        await updateUser({dispatch: mockDispatch, authUser: mockAuthUser});

        expect(mockDispatch).toHaveBeenCalledWith({
            type: stateEnums.SET_USER,
            payload: {
                user: mockAuthUser,
                displayName: mockAuthUser.displayName
            }
        })
    });

    it('should call the dispatch function with a null user if the user is null', async () => {
        const mockUser = null;

        await updateUser({ dispatch: mockDispatch, authUser: mockUser});

        expect(mockDispatch).toHaveBeenCalledWith({
            type: stateEnums.SET_USER,
            payload: {
                user: mockUser,
                displayName: ''
            }
        })
    })
});