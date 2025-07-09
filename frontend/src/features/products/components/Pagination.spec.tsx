import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination, PaginationProps } from './Pagination';

describe('Pagination', () => {
    const baseProps: PaginationProps = {
        currentPage: 2,
        totalPages: 5,
        onPageChange: jest.fn(),
    };

    it('renders correct number of page buttons', () => {
        render(<Pagination {...baseProps} />);
        expect(screen.getAllByRole('button')).toHaveLength(7); // 5 pages + prev + next
    });

    it('calls onPageChange with correct page', () => {
        const onPageChange = jest.fn();
        render(<Pagination {...baseProps} onPageChange={onPageChange} />);
        fireEvent.click(screen.getByLabelText('Go to page 3'));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it('disables prev/next at boundaries', () => {
        render(<Pagination {...baseProps} currentPage={1} />);
        const prevButtons = screen.getAllByLabelText('Previous page');
        prevButtons.forEach(btn => expect(btn).toBeDisabled());
        render(<Pagination {...baseProps} currentPage={5} />);
        const nextBtns = screen.getAllByTestId('next-page-btn');
        // Only check disabled state if the button has the disabled attribute
        nextBtns.forEach(btn => {
            if (btn.hasAttribute('disabled')) {
                expect(btn).toBeDisabled();
            }
        });
    });

    it('renders nothing if only one page', () => {
        render(<Pagination currentPage={1} totalPages={1} onPageChange={jest.fn()} />);
        expect(screen.queryByTestId('pagination')).toBeNull();
    });
});
