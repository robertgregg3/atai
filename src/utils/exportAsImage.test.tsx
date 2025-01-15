import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { exportAsImage, ExportAsImageProps } from "./exportAsImage";
import { downloadBlob } from "./downloadBlob";
import html2canvas from "html2canvas";

vi.mock("./downloadBlob", () => ({
    downloadBlob: vi.fn(),
  }));

vi.mock('html2canvas', () => ({
    default: vi.fn()
}));

describe("exportAsImage", () => {
    let mockCanvas: HTMLCanvasElement;
    let mockElement: HTMLElement;

    beforeEach(() => {
        mockCanvas = {
            toDataURL: vi.fn(() => 'data:image/png;base64,mockData'),
            remove: vi.fn()
        } as unknown as HTMLCanvasElement;

        mockElement = document.createElement('div');
        Object.defineProperty(mockElement, 'clientWidth', { value: 50 });
        Object.defineProperty(mockElement, 'scrollWidth', { value: 100 });

        document.body.appendChild(mockElement);

        (html2canvas as unknown as any).mockResolvedValue(mockCanvas);
    });

    afterEach(() => {
        vi.resetAllMocks();
        document.body.innerHTML = '';
    });

    
    it('should call the downloadBlob function with the correct arguments', async () => {
        const defaultProps: ExportAsImageProps = {
            element: mockElement,
            imageFileName: 'test',
            type: 'png'
        };

        await exportAsImage(defaultProps);

        expect(html2canvas).toHaveBeenCalledWith(mockElement, { useCORS: true });
        expect(mockCanvas.toDataURL).toHaveBeenCalledWith("image/png", 1.0);
        expect(downloadBlob).toHaveBeenCalledWith({
            blob: 'data:image/png;base64,mockData',
            fileName: 'test.png'
        });

        expect(document.documentElement.style.width).toBe('');
        expect(document.body.style.width).toBe('');
        expect(mockCanvas.remove).toHaveBeenCalled();
    });
});
