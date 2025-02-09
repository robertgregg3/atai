import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlyoutNav } from "@components";

describe("FlyoutNav", () => {
    const TestChildComponent = () => <p>Some text</p>;

    it('Should render the children', () => {
        render(
            <FlyoutNav showNav={true} flyoutFrom="right"><TestChildComponent /></FlyoutNav>
        );

        expect(screen.getByText('Some text')).toBeInTheDocument();
    })
})