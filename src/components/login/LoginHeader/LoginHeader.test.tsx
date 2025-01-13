import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoginHeader } from "./LoginHeader";

const mockButtonClick = vi.fn();

describe("LoginHeader", () => {
    const renderLoginHeader = (selectedItem: string) => 
        render(
            <LoginHeader activeButton={selectedItem} buttonClick={mockButtonClick} />
        );

        it("should render the login header with login active", () => {
        renderLoginHeader('login');
        
        const wrapper = document.querySelector(".login__options");
        const loginButton = screen.getByRole("button", { name: /Login/i });
        const createAccountButton = screen.getByLabelText(/Create Account/i);
        
        expect(wrapper).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        expect(createAccountButton).toBeInTheDocument();

        expect(loginButton).toHaveClass("button__text-only active");
    });
    
    it('renders the login header with create account active', () => {
        renderLoginHeader('create-account');

        const loginButton = screen.getByRole("button", { name: /Login/i });
        const createAccountButton = screen.getByLabelText(/Create Account/i);
        
        expect(loginButton).toBeInTheDocument();
        expect(createAccountButton).toBeInTheDocument();

        expect(createAccountButton).toHaveClass("button__text-only active");
    });

    it('should call the handleClick button when clicked with the login page selected', async () => {
        renderLoginHeader('login');
        const loginButton = screen.getByRole("button", { name: /Login/i });

        fireEvent.click(loginButton);

        await expect(mockButtonClick).toHaveBeenCalledWith(true, "Login");
    });
    
    it('should call the handleClick button when clicked with the create account page selected', async () => {
        renderLoginHeader('login');
        const loginButton = screen.getByRole("button", { name: /Create Account/i });

        fireEvent.click(loginButton);

        await expect(mockButtonClick).toHaveBeenCalledWith(false, "Create Account");
    });
});