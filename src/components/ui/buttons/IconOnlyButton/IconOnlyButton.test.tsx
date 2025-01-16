import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RiMenuFold3Fill } from "react-icons/ri";
import { IconOnlyButton, IconOnlyButtonProps } from "@components";

describe('IconOnlyButton', () => {
    it('renders the button', () => {

        const defaultProps: IconOnlyButtonProps = {
            ariaLabel: 'some-label',
            handleClick: vi.fn(),
            icon: <RiMenuFold3Fill />
        }

        render(
            <IconOnlyButton {...defaultProps} />
        );

        const button = screen.getByLabelText(defaultProps.ariaLabel);

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(defaultProps.handleClick).toHaveBeenCalled();
    })
})