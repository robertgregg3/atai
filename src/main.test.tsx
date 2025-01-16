import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

describe('main', () => {
    const ProblematicComponent = () => {
        throw new Error('Test Error'); // This will simulate an error
      };

    it('should render the fallback UI when an error occurs', () => {
        render(
          <ErrorBoundary>
            <ProblematicComponent />
          </ErrorBoundary>
        );
    
        // Check if the fallback UI is rendered
        expect(screen.getByText(/Something has gone wrong loading the app. Please refresh of try again later/)).toBeInTheDocument();
      });

      it('should render fine if there are no errors', () => {
        render(
            <ErrorBoundary>
                <div>Everything is fine</div>
            </ErrorBoundary>
        );

        expect(screen.getByText('Everything is fine')).toBeInTheDocument();
      })
});