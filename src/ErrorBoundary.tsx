import { Component, ErrorInfo } from "react";

interface State {
    hasError: boolean;
}

interface ErrorBoundaryProps {
    children: React.ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log('There was an error running the application', error, errorInfo)
    }

    render() {
        if(this.state.hasError) {
            return <h1>Something has gone wrong loading the app. Please refresh of try again later</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
