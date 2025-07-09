import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch() {
        // TODO: Add error tracking/reporting here
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <div role="alert">Something went wrong.</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
