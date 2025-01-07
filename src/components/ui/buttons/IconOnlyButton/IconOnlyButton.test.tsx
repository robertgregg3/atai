import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RiMenuFold3Fill } from "react-icons/ri";
import { IconOnlyButton } from "@components";

describe('IconOnlyButton', () => {
    it('renders the button', () => {
        const ariaLabel = 'some-label'
        const handleButtonClick = vi.fn();

        render(
            <IconOnlyButton
                ariaLabel={ariaLabel}
                handleClick={handleButtonClick}
                icon={<RiMenuFold3Fill />}
            />
        );

        const button = screen.getByLabelText(ariaLabel);

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(handleButtonClick).toHaveBeenCalled();
    })
})