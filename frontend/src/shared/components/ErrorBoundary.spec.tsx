import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
    it('renders children when no error', () => {
        const { getByText } = render(
            <ErrorBoundary>
                <div>Child</div>
            </ErrorBoundary>
        );
        expect(getByText('Child')).toBeInTheDocument();
    });

    it('renders fallback on error', () => {
        // Error throwing component
        const Problem = () => {
            throw new Error('Test error');
        };
        const { getByRole } = render(
            <ErrorBoundary>
                <Problem />
            </ErrorBoundary>
        );
        expect(getByRole('alert')).toBeInTheDocument();
    });
});
