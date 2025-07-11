import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryForm } from '../CategoryForm';
import type { Category } from '../CategoryList';

describe('CategoryForm', () => {
    const parentOptions: Category[] = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Books' },
    ];
    it('renders form fields', () => {
        render(<CategoryForm onSubmit={jest.fn()} parentOptions={parentOptions} />);
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Parent Category')).toBeInTheDocument();
    });
    it('submits form data', () => {
        const onSubmit = jest.fn();
        render(<CategoryForm onSubmit={onSubmit} parentOptions={parentOptions} />);
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Phones' } });
        fireEvent.change(screen.getByLabelText('Parent Category'), { target: { value: '1' } });
        fireEvent.click(screen.getByText('Save'));
        expect(onSubmit).toHaveBeenCalledWith({ name: 'Phones', parentId: '1' });
    });
});
