import { describe, expect, it } from "vitest";
import { getFormattedChartData, GetFormattedChartDataProps } from "./getFormattedChartData";
import { mockData } from "../data/mockData";

describe("getFormattedChartData", () => {
    const defaultProps: GetFormattedChartDataProps = {
        chartType: "product",
        data: mockData,
        savingsTotalLabels: ['ActualSavingsForCurrentYear', 'ActualSavingsForYear', 'ActualSavingsPerMonth']
    }
 
    it('format CSV data into a shape sutable to be used in the charts', () => {
        const result = getFormattedChartData(defaultProps);
        expect(result).toEqual({
            ActualSavingsForCurrentYear: [
                { key: 'webapp', value: 200.15 },
                { key: 'load-balancer', value: 89.34 },
                { key: 'analytics', value: 145.5 },
                { key: 'ad-server', value: 320 },
                { key: 'accounting', value: 75 },
              ],
              ActualSavingsForYear: [
                { key: 'webapp', value: 2401.8 },
                { key: 'load-balancer', value: 1072.08 },
                { key: 'analytics', value: 1746 },
                { key: 'ad-server', value: 3840 },
                { key: 'accounting', value: 900 },
              ],
              ActualSavingsPerMonth: [
                { key: 'webapp', value: 200.15 },
                { key: 'load-balancer', value: 89.34 },
                { key: 'analytics', value: 145.5 },
                { key: 'ad-server', value: 320 },
                { key: 'accounting', value: 75 },
              ],
        });
    });
});