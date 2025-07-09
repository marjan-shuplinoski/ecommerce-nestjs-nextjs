import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
    it('renders input and calls onSearch', () => {
        jest.useFakeTimers();
        const onSearch = jest.fn();
        render(<SearchBar onSearch={onSearch} />);
        const input = screen.getByTestId('search-bar');
        fireEvent.change(input, { target: { value: 'abc' } });
        jest.advanceTimersByTime(400);
        expect(onSearch).toHaveBeenCalledWith('abc');
        jest.useRealTimers();
    });
});
