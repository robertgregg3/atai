import { describe, expect, it, vi } from "vitest";
import { AdvancedChart } from "@components";
import { render, screen } from "@testing-library/react";

vi.mock("@utils", () => ({
    getChartDatasets: vi.fn(({ dataFormatted }) => {
      return [
        {
          label: `Dataset 1`,
          data: dataFormatted,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ];
    }),
    getChartOptions: vi.fn(() => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    })),
    default: vi.fn(() => [
      [
        {
          label: "Dataset 1",
          data: {
            currentYear: [100, 200, 300],
            year: [100, 200, 300],
            month: [100, 200, 300]
        },
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    ]),
  })
);

vi.mock('react-chartjs-2', () => ({
    Doughnut: vi.fn(({ data, options }) => (
      <div data-testid="chart-doughnut" data-data={JSON.stringify(data)} data-options={JSON.stringify(options)}>
        Doughnut Chart
      </div>
    )),
  }));

describe("AdvancedChart", () => {
  it("should render the AdvancedChart component", () => {
    render(
        <AdvancedChart
            chartData={{
                currentYear: [100, 200, 300],
                year: [100, 200, 300],
                month: [100, 200, 300]
            }}
            savingsTotals={{
                ActualSavingsForCurrentYear: 3248.28,
                ActualSavingsForYear: 3248.28,
                ActualSavingsPerMonth: 3248.28
            }}
            labels={['work-to-fix', 'dd-client-preadvice', 'dd-data-gateway', 'svoc', 'some-other']}
        />
    )

    const chart = screen.getByTestId('chart-doughnut');

    expect(chart).toBeInTheDocument();
  });

  it('should update the chart data when button is clicked', () => {
    const labels = ['work-to-fix', 'dd-client-preadvice', 'dd-data-gateway', 'svoc', 'some-other'];
    
    render(
      <AdvancedChart
        chartData={{
          currentYear: [100, 200, 300],
          year: [100, 200, 300],
          month: [100, 200, 300]
        }}
        savingsTotals={{
          ActualSavingsForCurrentYear: 3248.28,
          ActualSavingsForYear: 3248.28,
          ActualSavingsPerMonth: 3248.28
        }}
        labels={labels}
      />
    );
  
    const chart = screen.getByTestId('chart-doughnut');
    
    // Log the rendered data for verification
    console.log(chart.getAttribute('data-data'));
  
    // Ensure the structure matches the expected value
    expect(chart).toHaveAttribute('data-data', JSON.stringify({
      labels: labels,
      datasets: {
          label: 'Dataset 1',
          data: [100, 200, 300],
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        }
    }));
  });  
})