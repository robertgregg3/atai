import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToastMessage, ToastMessageprops } from "@components";

describe('Topast Message', () => {
    it("renders toast messages correctly", () => {
        const toasts: ToastMessageprops[] = [
          { id: 1, status: "success", message: "Success!", position: "top-right", duration: 3000 },
          { id: 2, status: "info", message: "Info!", position: "bottom-right", duration: 3000 },
          { id: 3, status: "error", message: "Error!", position: "top",  duration: 3000 },
        ];
    
        render(<ToastMessage toasts={toasts} />);
    
        // Check that all messages are rendered
        expect(screen.getByText("Success!")).toBeInTheDocument();
        expect(screen.getByText("Info!")).toBeInTheDocument();
        expect(screen.getByText("Error!")).toBeInTheDocument();
      });
})