import { describe, expect, it } from "vitest";
import stateReducer, { initialState, stateEnums } from "./reducer";

describe("reducer", () => {
    it('should set the user and displayname correctly', () => {
        const action = { 
            type: stateEnums.SET_USER as const,
            payload: { 
                user: { name: "John Doe" }, 
                displayName: "John Doe" 
            }
        }

        const result = stateReducer(initialState, action);
        expect(result.user).toEqual({ name: "John Doe" });
        expect(result.displayName).toEqual("John Doe");

    });

    it('should keep the state unchanged for unknown action types.', () => {  
        const action = { 
            type: 'UNKNOWN_ACTION' as const,
            payload: { user: null, displayName: "" },
        }

        // @ts-ignore
        const result = stateReducer(initialState, action);
        expect(result).toEqual(initialState);
    });

    it('should toggle the sidebar correctly', () => {
        const action = {
            type: stateEnums.TOGGLE_SIDEBAR as const,
            payload: true
        }

        const result = stateReducer(initialState, action);
        expect(result).toEqual({ ...initialState, sidebarOpen: true });
    });
});