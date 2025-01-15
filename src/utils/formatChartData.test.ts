import { describe, expect, it } from "vitest";
import { formatChartData } from "./formatChartData";
import { mockFormatChartData } from "../data/mockData";

describe("formatChartData", () => {
    it('should return an array of numbers when chartData is an array', () => {
        const result = formatChartData({ chartData: mockFormatChartData["ActualSavingsForCurrentYear"] });

        expect(result).toEqual([200.15, 89.34, 145.5, 320, 75]);
    });
});