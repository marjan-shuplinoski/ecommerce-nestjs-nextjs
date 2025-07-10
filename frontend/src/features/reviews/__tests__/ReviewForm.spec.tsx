import { render, screen, fireEvent, act } from '@testing-library/react';
import { ReviewForm } from '../ReviewForm';

describe('ReviewForm', () => {
    it('renders and submits valid review', async () => {
        const handleSubmit = jest.fn();
        render(<ReviewForm onSubmit={handleSubmit} />);
        await act(async () => {
            fireEvent.click(screen.getByLabelText('Rate 5'));
            fireEvent.change(screen.getByPlaceholderText('Write your review...'), { target: { value: 'Great product, highly recommend!' } });
            fireEvent.click(screen.getByText('Submit Review'));
        });
        expect(handleSubmit).toHaveBeenCalled();
    });

    it('shows validation errors', async () => {
        render(<ReviewForm onSubmit={jest.fn()} />);
        await act(async () => {
            fireEvent.click(screen.getByText('Submit Review'));
        });
        expect(screen.getByText('Rating is required')).toBeInTheDocument();
        expect(screen.getByText('Comment is required (min 10 chars)')).toBeInTheDocument();
    });
});
