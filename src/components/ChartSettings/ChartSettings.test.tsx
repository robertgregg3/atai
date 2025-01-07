import { describe, expect, it, vi } from "vitest";
import { ChartSettings, ChartSettingsProps } from "@components";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StateContext } from "@context/StateProvider";
import { exportAsImage, getOthersPercentageMapping } from "@utils";
import { stateEnums } from "@context/reducer";

const handleChartSelectionClick = vi.fn();

vi.mock('@utils', () => ({
    exportAsImage: vi.fn(),
    getOthersPercentageMapping: vi.fn()
}));

describe('ChartSettings', () => {
    const defaultProps: ChartSettingsProps = {
        title: 'Product Savings',
        currentChart: 'currentYear',
        handleChartSelectionClick,
        chartExportRef: { current: document.createElement('div') },
        isDougnutChart: true
    };

    const defaultState = { 
        state: {
            topProductsPercentage: 1,
            showTopProducts: true,
            data: [],
            isLoading: false,
            sidebarOpen: false,
            user: null,
            displayName: 'Rob'
        },
        dispatch: vi.fn()
    }

    const renderComponent = (props: ChartSettingsProps) => {
        render(
            <StateContext.Provider value={defaultState}>
                <ChartSettings {...props} />
            </StateContext.Provider>
        );
    }

    it('renders the chart settings toggle button', () => {
        renderComponent(defaultProps);

        const settingsButton = screen.getByRole('button', { name: /open settings menu/i });
        expect(settingsButton).toBeInTheDocument();
        expect(getOthersPercentageMapping).toHaveBeenCalled();
    });

    it('renders the download options when the settings are visible', async () => {
        renderComponent(defaultProps);

        const openSettingsButton = screen.getByRole('button', { name: /open settings menu/i });
        expect(openSettingsButton).toBeInTheDocument();

        fireEvent.click(openSettingsButton);

        const jpegButton = await screen.findByRole('button', { name: /JPEG/i });
        const pngButton = await screen.findByRole('button', { name: /PNG/i});

        expect(jpegButton).toBeInTheDocument();
        expect(pngButton).toBeInTheDocument();
    });

    it('calls download function when a download option is clicked', async () => {
        renderComponent(defaultProps);
      
        const jpegButton = screen.getByText('JPEG');
        fireEvent.click(jpegButton);
        await waitFor(() => expect(exportAsImage).toHaveBeenCalledWith(expect.objectContaining({ type: 'jpeg' })));
      
        const pngButton = screen.getByText('PNG');
        fireEvent.click(pngButton);
        await waitFor(() => expect(exportAsImage).toHaveBeenCalledWith(expect.objectContaining({ type: 'png'})))
      });

      it('updates the top products percentage via the range slider', () => {
        renderComponent(defaultProps);

        const rangeSlider = screen.getByRole('slider');
        fireEvent.change(rangeSlider, { target: { value: 4 } });

        expect(defaultState.dispatch).toHaveBeenCalledWith({ type: stateEnums.OTHERS_PERCENTAGE, payload: 4})
      });

      it('calls handleChartSelectionClick with the correct time frame when a button is clicked', () => {
        renderComponent(defaultProps);

        const currentYearButton = screen.getByText('Year');
        fireEvent.click(currentYearButton);

        expect(handleChartSelectionClick).toHaveBeenCalledWith('year');
      })
});