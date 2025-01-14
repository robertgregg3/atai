import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Spinner from "./Spinner";

describe('Spinner', () => {
    it('should render the spinner', () => {
        render(<Spinner />);
        const spinnerLabel = screen.getByLabelText(/audio-loading/i);
        expect(spinnerLabel).toBeInTheDocument();
    });
});