import { describe, expect, it } from "vitest";
import { prepareChartTotals } from "./prepareChartTotals";
import { mockData } from "../data/mockData";

describe("prepareChartTotals", () => {
    it("should return an array of numbers", async () => {
        const result = prepareChartTotals(mockData);
        expect(result).toEqual([75, 900, 75]);
    });
});