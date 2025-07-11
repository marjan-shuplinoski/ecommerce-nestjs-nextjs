import React from 'react';

export type SearchFiltersProps = {
    price: [number, number];
    brands: string[];
    ratings: number[];
    availability: boolean;
    onChange: (filters: any) => void;
};

export const SearchFilters: React.FC<SearchFiltersProps> = ({ price, brands, ratings, availability, onChange }) => (
    <div className="space-y-4">
        {/* Price Range */}
        <div>
            <label className="block font-semibold">Price Range</label>
            <span>${price[0]} - ${price[1]}</span>
        </div>
        {/* Brand Filter */}
        <div>
            <label className="block font-semibold">Brand</label>
            <div className="flex flex-wrap gap-2">
                {brands.map(b => (
                    <span key={b} className="px-2 py-1 border rounded">{b}</span>
                ))}
            </div>
        </div>
        {/* Rating Filter */}
        <div>
            <label className="block font-semibold">Rating</label>
            <div className="flex gap-2">
                {ratings.map(r => (
                    <span key={r} className="px-2 py-1 border rounded">{r}★</span>
                ))}
            </div>
        </div>
        {/* Availability */}
        <div>
            <label className="block font-semibold">Availability</label>
            <span>{availability ? 'In Stock' : 'Out of Stock'}</span>
        </div>
    </div>
);
