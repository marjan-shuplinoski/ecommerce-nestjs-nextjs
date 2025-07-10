import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewList } from '../ReviewList';

describe('ReviewList', () => {
    const reviews = [
        { id: '1', user: 'Alice', rating: 5, comment: 'Excellent!', helpfulVotes: 2, createdAt: new Date().toISOString() },
        { id: '2', user: 'Bob', rating: 3, comment: 'Okay', helpfulVotes: 0, createdAt: new Date().toISOString() },
    ];

    it('renders reviews', () => {
        render(<ReviewList reviews={reviews} onVoteHelpful={jest.fn()} />);
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Excellent!')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('calls onVoteHelpful', () => {
        const onVoteHelpful = jest.fn();
        render(<ReviewList reviews={reviews} onVoteHelpful={onVoteHelpful} />);
        fireEvent.click(screen.getAllByText(/Helpful/)[0]);
        expect(onVoteHelpful).toHaveBeenCalledWith('1');
    });
});
