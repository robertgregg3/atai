import { describe, expect, it } from "vitest";
import { GetChartDataProps, getChartDatasets } from "./getChartDatasets";

describe("getChartDatasets", () => {
    const mockData = [200.15, 89.34, 145.5, 320, 75];
    const defaultProps: GetChartDataProps = {
        dataFormatted: mockData,
        isDoughnutChart: true
    }
    
    it("should return an array of objects with the correct properties if isDoughnut chart is trrue", async () => {
        const result = await getChartDatasets(defaultProps);
        await expect(result).toEqual([{   
            backgroundColor: ['#10a8a9', '#000038', '#cccccc', '#f9da7b', '#d1da8d', '#9dcece', '#8989a0', '#0b7083'],
            borderColor: ['#ffffff'],
            borderWidth: 0,
            data: mockData,
            label: "Product Savings"
        }
        ])
    })
});


