import React from 'react';
import { render } from '@testing-library/react';
import { LoadingWrapper } from './LoadingWrapper';

describe('LoadingWrapper', () => {
    it('shows loading fallback when loading', () => {
        const { getByRole } = render(
            <LoadingWrapper isLoading={true}>
                <div>Loaded</div>
            </LoadingWrapper>
        );
        expect(getByRole('status')).toHaveTextContent('Loading');
    });

    it('shows error when error is present', () => {
        const { getByRole } = render(
            <LoadingWrapper isLoading={false} error="Error!">
                <div>Loaded</div>
            </LoadingWrapper>
        );
        expect(getByRole('alert')).toHaveTextContent('Error!');
    });

    it('shows children when not loading and no error', () => {
        const { getByText } = render(
            <LoadingWrapper isLoading={false}>
                <div>Loaded</div>
            </LoadingWrapper>
        );
        expect(getByText('Loaded')).toBeInTheDocument();
    });
});
