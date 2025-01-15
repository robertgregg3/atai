import { describe, expect, it } from "vitest";
import { formatChartLabels } from "./formatChartLabels";
import { mockFormatChartData } from "../data/mockData";

describe("formatChartLabels", () => {
    it("should return an array of strings when chartData is an array", () => {
        const result = formatChartLabels({ chartData: mockFormatChartData["ActualSavingsForCurrentYear"]});
        expect(result).toEqual(["eng", "ops", "hr", "marketing", "finance"]);
    });
});
