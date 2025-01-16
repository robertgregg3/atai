import { describe, expect, it } from "vitest";
import { getChartOptions, GetChartOptionsProps } from "./getChartOptions";

describe("getChartOptions", () => {
    const defaultProps: GetChartOptionsProps = {
        chartType: "bar",
    }

    it("should return default options when no additional properties are provided", () => {
        const options = getChartOptions(defaultProps);
    
        expect(options).toMatchObject({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: false, text: undefined },
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                padding: 20,
              },
            },
            tooltip: {
              callbacks: {
                label: expect.any(Function),
              },
            },
          },
          scales: {
            x: {
              grid: { display: true },
              ticks: { padding: 20 },
            },
            y: {
              grid: { display: false },
              ticks: {
                padding: 20,
                callback: expect.any(Function),
              },
            },
          },
        });
    });

    it("should include a title when `showChartTitle` is true and `chartTitle` is provided", () => {
        const options = getChartOptions({
          ...defaultProps,
          showChartTitle: true,
          chartTitle: "Sample Chart",
        });
    
        expect(options.plugins.title).toEqual({
          display: true,
          text: "Sample Chart",
        });
    });

    it("should set `legendPosition` correctly", () => {
        const options = getChartOptions({
          ...defaultProps,
          legendPosition: "top",
        });
    
        expect(options.plugins.legend.position).toBe("top");
    });

    it("should apply `labelPadding` correctly", () => {
        const options = getChartOptions({
          ...defaultProps,
          labelPadding: 30,
        });
    
        expect(options.plugins.legend.labels.padding).toBe(30);
    });

    it("should use default scales for non-doughnut chart types", () => {
        const options = getChartOptions({
          ...defaultProps,
          chartType: "line",
        });
    
        expect(options.scales).toMatchObject({
          x: {
            grid: { display: true },
            ticks: { padding: 20 },
          },
          y: {
            grid: { display: false },
            ticks: {
              padding: 20,
              callback: expect.any(Function),
            },
          },
        });
    });

    it("should not include scales for doughnut chart type", () => {
        const options = getChartOptions({
          ...defaultProps,
          chartType: "doughnut",
        });
    
        expect(options.scales).toBeUndefined();
    });
    
    it("should apply `scalePadding` to scales correctly", () => {
        const options = getChartOptions({
          ...defaultProps,
          scalePadding: { x: 10, y: 15 },
        });
    
        expect(options.scales).toMatchObject({
          x: {
            ticks: { padding: 10 },
          },
          y: {
            ticks: { padding: 15 },
          },
        });
    });
});