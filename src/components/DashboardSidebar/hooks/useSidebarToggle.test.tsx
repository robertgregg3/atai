import { StateContext } from "@context/StateProvider";
import { renderHook } from "@testing-library/react";
import { mockInitialState } from "../../../data/mockData";
import { describe, expect, it, vi } from "vitest";
import { useToggleSidebar } from "./useToggleSidebar";
import { stateEnums } from "@context/reducer";

describe("useSidebarToggle", () => {
    const mockDispatch = vi.fn();

    const wrapper = ({ children }: { children: React.ReactNode}) => (
        <StateContext.Provider value={{state: mockInitialState, dispatch: mockDispatch}}>
            {children}
        </StateContext.Provider>
    );

    it("should toggle the sidebar", () => {
        const { result } = renderHook(() => useToggleSidebar(), { wrapper });

        result.current.toggleSidebar(true);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: stateEnums.TOGGLE_SIDEBAR,
            payload: false,
        });
    });
});