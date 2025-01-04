import { describe, expect, it, vi } from "vitest";
import { ChartProps } from "./chart.types";
import { render, screen } from "@testing-library/react";
import Chart from "./Chart";

vi.mock('@utils/getChartOptions', () => ({
    default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    })
}));

vi.mock("@utils/getChartDatasets", () => ({
    default: vi.fn(() => [
      [
        {
          label: "Dataset 1",
          data: [10, 20, 30],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    ]),
  })
);

// Mock Chart.js components
vi.mock("react-chartjs-2", () => ({
    Line: vi.fn(() => <div data-testid="chart-line">Line Chart</div>),
    Bar: vi.fn(() => <div data-testid="chart-bar">Bar Chart</div>),
  }));

describe("Chart Component", () => {
    it("renders a bar chart when type is 'bar'", () => {
        render(
            <Chart
                data={[100, 200, 300]}
                type="bar"
                labels={["January", "February", "March"]}
                isComplex={false}
                sidebarOpen={false}
            />
        );

        expect(screen.getByTestId("chart-bar")).toBeInTheDocument();
    });

    it("renders a bar chart when type is 'line'", () => {
        render(
            <Chart
                data={[100, 200, 300]}
                type="line"
                labels={["January", "February", "March"]}
                isComplex={false}
                sidebarOpen={false}
            />
        );

        expect(screen.getByTestId("chart-line")).toBeInTheDocument();
    });

    it("renders a bar chart when type is not provided", () => {
        render(
            <Chart
                data={[100, 200, 300]}
                labels={["January", "February", "March"]}
                isComplex={false}
                sidebarOpen={false}
            />
        );

        expect(screen.getByTestId('chart-bar')).toBeInTheDocument();
    });

    it('applies the correct class when sidebarOpen is false', () => {
        render(
            <Chart 
                data={[100, 200, 300]}
                type="bar"
                labels={["January", "February", "March"]}
                isComplex={false}
                sidebarOpen={false}
            />
        );

        const correctClassContainer = screen.getByTestId('chart-bar').parentElement;
        expect(correctClassContainer).toHaveClass('chart--sidebar-closed');
    });

    it("does not render if data is missing", () => {
        const { container } = render(
          <Chart
            data={null}
            type="bar"
            labels={["January", "February", "March"]}
            isComplex={true}
            sidebarOpen={true}
          />
        );
    
        expect(container).toBeEmptyDOMElement();
      });
});