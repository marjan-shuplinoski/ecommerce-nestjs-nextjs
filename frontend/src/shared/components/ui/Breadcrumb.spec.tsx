import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

describe('Breadcrumb', () => {
    it('renders breadcrumb items', () => {
        const items: BreadcrumbItem[] = [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
        ];
        render(<Breadcrumb items={items} />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
    });
});
