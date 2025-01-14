import { renderHook } from "@testing-library/react";
import { mockData } from "../data/mockData";
import { describe, expect, it } from "vitest";
import { PrepareChartDataProps, usePrepareChartData } from "./usePrepareChartData";

describe("usePrepareChartData", () => {
    const defaultProps: PrepareChartDataProps = {
        data: mockData,
        chartType: "cost",
        showTopProducts: false
    }

    const expectedChartData: ReturnType<typeof usePrepareChartData>['chartData'] = {
        ActualSavingsForCurrentYear: [
            { key: "eng", value: 200.15 },
            { key: "ops", value: 89.34 },
            { key: "hr", value: 145.5 },
            { key: "marketing", value: 320 },
            { key: "finance", value: 75 },
        ],
        ActualSavingsForYear: [
            { key: "eng", value: 2401.8 },
            { key: "ops", value: 1072.08 },
            { key: "hr", value: 1746 },
            { key: "marketing", value: 3840 },
            { key: "finance", value: 900 },
        ],
        ActualSavingsPerMonth: [
            { key: "eng", value: 200.15 },
            { key: "ops", value: 89.34 },
            { key: "hr", value: 145.5 },
            { key: "marketing", value: 320 },
            { key: "finance", value: 75 },
        ],
    };

    const expectedSavingsTotals: ReturnType<typeof usePrepareChartData>['savingsTotals'] = {
        ActualSavingsForCurrentYear: 75,
        ActualSavingsForYear: 900,
        ActualSavingsPerMonth: 75,
    };

    it("should prepare the chart data correctly", () => {
        const { data, chartType, showTopProducts } = defaultProps;
        const { result } = renderHook(() => usePrepareChartData(data, chartType, showTopProducts));
        expect(result.current.chartData).toEqual(expectedChartData);
    });

    it("should calculate savings totals correctly", () => {
        const { data, chartType, showTopProducts } = defaultProps;
        const { result } = renderHook(() => usePrepareChartData(data, chartType, showTopProducts));
        expect(result.current.savingsTotals).toEqual(expectedSavingsTotals);
    });

});
