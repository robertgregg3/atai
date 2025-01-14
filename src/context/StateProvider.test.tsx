import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StateContext, StateProvider } from "./StateProvider";
import { initialState } from "./reducer";

describe('StateProvider', () => {
    it('Should render children', () => {
        const child = <div data-testid="test-child"></div>;
        
        render(<StateProvider>{child}</StateProvider>);

        const childElement = screen.getByTestId('test-child');
        expect(childElement).toBeInTheDocument();
    });

    it('should provide the initial state and dispatch function', () => {
        render(
          <StateProvider>
            <StateContext.Consumer>
              {({ state, dispatch }) => (
                <>
                  <div data-testid="state">{JSON.stringify(state)}</div>
                  <div data-testid="dispatch">{typeof dispatch}</div>
                </>
              )}
            </StateContext.Consumer>
          </StateProvider>
        );
    
        expect(screen.getByTestId('state')).toHaveTextContent(JSON.stringify(initialState));
        expect(screen.getByTestId('dispatch')).toHaveTextContent('function');
      });
});