import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Button from './Button';

const buttonDefaultProps = {
    handleClick: () => {},
    text: 'Click Me',
    className: 'custom-class',
    textCenter: false,
    icon: null,
};

describe('Button', () => {
    it('renders the button with default props', () => {
        render(<Button {...buttonDefaultProps} />);
        
        const button = screen.getByRole('button', { name: buttonDefaultProps.text });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(buttonDefaultProps.className);
    });
   
    it('renders the button with centred text', () => {
        render(<Button {...buttonDefaultProps} textCenter />);
        
        const button = screen.getByRole('button', { name: buttonDefaultProps.text });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('button--text-center');
    });

    it('Triggers the handle click when called', () => {
        const buttonClick = vi.fn();
        render(<Button {...buttonDefaultProps} handleClick={buttonClick} />);

        const button = screen.getByRole('button', { name: buttonDefaultProps.text });

        button.click();

        expect(buttonClick).toHaveBeenCalledOnce();
    });

    it('renders the button with an icon', () => {
        const icon = <svg data-testid="icon" />;
        render(<Button {...buttonDefaultProps} icon={icon} />);

        const button = screen.getByRole('button', { name: buttonDefaultProps.text });
        const iconElement = screen.getByTestId('icon');

        expect(button).toContainElement(iconElement);
    });

    it('renders the button with an icon and text', () => {
        const mockIcon = <span data-testid="mock-icon">🌟</span>;
        render(<Button {...buttonDefaultProps} icon={mockIcon} />);
        
        // Check if the icon and text are rendered
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toBeInTheDocument();
        
        const button = screen.getByRole('button', { name: buttonDefaultProps.text });
        expect(button).toBeInTheDocument();
    });

    it('places the icon on the right if iconOnRight is true', () => {
        const mockIcon = <span data-testid="mock-icon">🌟</span>;
        render(<Button {...buttonDefaultProps} icon={mockIcon} iconOnRight />);
        
        const button = screen.getByRole('button', { name: buttonDefaultProps.text });
        expect(button).toHaveClass('icon-on-right');
    });
})