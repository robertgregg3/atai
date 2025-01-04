import { describe, expect, it, vi } from "vitest";
import { fetchChartData } from "./mockApi";
import { parseCsvData } from '../data/dataService';


vi.mock('../data/dataService', () => ({
    parseCsvData: vi.fn()
}));

vi.mock('../data/static-data.csv?raw', () => ({ default: 'mocked csv data'}));

describe('mockApi', () => {
    
    it('should resolve with parsed CSV data after a delay', async () => {
        const mockParsedData = [{ colum1: 'someValue', column2: 'anotherValue' }];
        (parseCsvData as ReturnType<typeof vi.fn>).mockReturnValue(mockParsedData);

        const data = await fetchChartData();

        expect(data).toEqual(mockParsedData);
        expect(parseCsvData).toHaveBeenCalledWith('mocked csv data');
    });

    it("should handle unexpected errors gracefully", async () => {
        (parseCsvData as ReturnType<typeof vi.fn>).mockImplementation(() => {
          throw new Error("Parsing failed");
        });
      
        await expect(fetchChartData()).rejects.toThrow("Parsing failed");
      });
});