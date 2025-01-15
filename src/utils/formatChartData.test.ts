import { describe, expect, it } from "vitest";
import { formatChartData } from "./formatChartData";

describe("formatChartData", () => {
    const mockData = {
        "ActualSavingsForCurrentYear": [
            { "key": "eng", "value": 200.15 },
            { "key": "ops", "value": 89.34 },
            { "key": "hr", "value": 145.5 },
            { "key": "marketing", "value": 320 },
            { "key": "finance", "value": 75 }
        ],
    }
    it('should return an array of numbers when chartData is an array', () => {
        const result = formatChartData({ chartData: mockData["ActualSavingsForCurrentYear"] });

        expect(result).toEqual([200.15, 89.34, 145.5, 320, 75]);
    });
});