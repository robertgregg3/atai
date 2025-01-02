import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardHeader from "./DashboardHeader";

describe('Dashboard Header', () => {
    it('should display the title and update the title when the title prop changes', () => {
        render(<DashboardHeader title="Product Savings Doughnut Chart" displayName='some name' />);

        const h6 = screen.getByRole('heading', { name: /Product Savings Doughnut Chart/i });
        expect(h6).toBeInTheDocument();

        render(<DashboardHeader title="Cost Savings Bar Chart" displayName='some name' />);

        const newH6 = screen.getByRole('heading', { name: /Cost Savings Bar Chart/i });
        expect(newH6).toBeInTheDocument
    });

    it('should render the user message and display name', () => {
        render(<DashboardHeader title="Product Savings Doughnut Chart" displayName='some name' />);

        const userInfo = screen.getByTestId('user-info');
        const displayName = screen.getByText(/Hi, some name/i);

        expect(userInfo).toBeInTheDocument();
        expect(displayName).toBeInTheDocument();
    });
})