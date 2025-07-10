import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    it('renders copyright and links', () => {
        render(<Footer />);
        expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
        expect(screen.getByText('Privacy')).toBeInTheDocument();
        expect(screen.getByText('Terms')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });
});
