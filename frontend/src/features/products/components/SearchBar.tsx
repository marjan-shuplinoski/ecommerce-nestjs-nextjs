import React, { useState, useCallback } from 'react';

export interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

/**
 * SearchBar with debounced input for product search.
 */
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search products...' }) => {
    const [value, setValue] = useState('');
    const debounce = useCallback(
        (() => {
            let timeout: NodeJS.Timeout;
            return (fn: () => void, delay: number) => {
                clearTimeout(timeout);
                timeout = setTimeout(fn, delay);
            };
        })(),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        debounce(() => onSearch(val), 400);
    };

    return (
        <input
            type="search"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            aria-label="Search products"
            data-testid="search-bar"
        />
    );
};

export default SearchBar;
