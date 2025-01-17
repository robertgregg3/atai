import { fetchChartData } from "../api/mockApi";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchData } from "@utils";
import { stateEnums } from "@context/reducer";

vi.mock('../api/mockApi', () => ({
    fetchChartData: vi.fn()
})); 

describe('fetchData', () => {
    const mockDispatch = vi.fn();
    const mockSetInitialisedData = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call the dispatch function with appropriate data', async () => {
        const mockData = { key: 'value'};
        (fetchChartData as any).mockResolvedValue(mockData);

        await fetchData({ dispatch: mockDispatch, setIsDataInitialised: mockSetInitialisedData});
        
        expect(mockDispatch).toHaveBeenCalledWith({ 
            type: stateEnums.SET_DATA,
            payload: mockData,
        });

        expect(fetchChartData).toHaveBeenCalledOnce();
        expect(mockSetInitialisedData).toHaveBeenLastCalledWith(true);
    });
    
    it('should log an error if fetchChartData fails', async () => {
        const mockError = new Error('Some Error');
        (fetchChartData as any).mockRejectedValue(mockError);
        
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        await fetchData({ dispatch: mockDispatch, setIsDataInitialised: mockSetInitialisedData});


        expect(fetchChartData).toHaveBeenCalledOnce();
        expect(mockDispatch).not.toHaveBeenCalled();
        expect(mockSetInitialisedData).not.toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching mocked data:', mockError);
        consoleSpy.mockRestore();
    })
})